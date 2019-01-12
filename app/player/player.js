import PlayerInput from "./input/playerinput";
import PlayerMovement from "./input/movement/playermovement";
import PlayerProfile from "./profile/playerprofile";
import CustomSprite from "../ui/custom/customsprite";
import BuildMode from "./item/buildmode";

import game from "index";
import Inventory from "./item/inventory/inventory";
import Entity from "../world/entity/entity";
import PlayerSettings from "./profile/playersettings";
import PlayerChat from "./chat/playerchat";
import MPPlayer from "./mpplayer/mpplayer";


export default class Player {
    constructor() {
        //Movement
        this.input = new PlayerInput();
        this.movement = new PlayerMovement();

        //Status Information
        this.playerProfile = new PlayerProfile();
        this.playerSettings = new PlayerSettings();

        //Other player constructors
        this.buildMode = new BuildMode();

        this.loggedIn = false;
        this.inGame = false;
        this.id = -1;
    }

    joinGame() {
        //Send packet requesting to join game
        if (!this.joinRequested)
            game.getNetwork.sendMessage(JSON.stringify({ type: "JoinGame" }));

        this.joinRequested = true;
    }

    spawnToGame() {
        this.playerProfile.requestStats();
        this.inventory = new Inventory();
        this.playerChat = new PlayerChat();

        //Should be changed when we go into character select
        this.className = "PLAYER_WARRIOR_DOWN1";
        //this.x = 128;
        //this.y = 32;
        this.w = 42;
        this.h = 42;

        this.entity = new Entity({ name: this.className }, this.spawnX, this.spawnY, this.w, this.h);
        this.entity.addEntityShoot("Player", this.entity);
        //Updates the camera offset..
        this.entity.addCollision(8, 5, 27, 30);

        //Sprite layer
        this.entity.sprite.customSprite.parentGroup = game.getUI.parentGroup.positive3;


        this.joinRequested = false;
        this.inGame = true;
    }


    showDeath() {
        console.log("You died!")
    }

    //Maybe should be in mouse Input?
    updateShootTarget() {
        if (this.inventory.getWeapon !== undefined)    //If were holding a valid wepaon, lets start shooting!.
            if (this.inventory.getWeapon.itemType.projectile !== undefined) {
                //Basic mouse pos.
                var mX = (game.renderer.plugins.interaction.mouse.global.x + 8);
                var mY = (game.renderer.plugins.interaction.mouse.global.y + 8);

                var camera = game.getUI.getCurrentScreen.getCamera;
                var radians = (Math.PI / 180) * (camera.rotation);
                var cos = Math.cos(radians);
                var sin = Math.sin(radians);

                //Mouse /w rotation offset.
                var mouseX = camera.position.x + (cos * (mX - camera.position.x) + sin * (mY - camera.position.y));
                var mouseY = camera.position.y + (-sin * (mX - camera.position.x) + cos * (mY - camera.position.y));

                var projectile = game.getPlayer.inventory.getWeapon.itemType.projectile;
                var attackDelay = game.getPlayer.playerProfile.stats.attackDelay;
                this.entity.entityShoot.setTarget(projectile, attackDelay, mX, mY);

                //Manually update the entityShoot class since we don't update entity
                this.entity.entityShoot.update();

                if (this.entity.entityShoot.shooting)
                    this.entity.entityShoot.setClientsideDirection();
            }
    }

    kill() {
        this.inGame = false;
        this.buildMode.buildEnabled = false;

        this.inventory.close();
        this.inventory = undefined;

        this.playerChat.close();
        this.playerChat = undefined;

        this.entity.kill();
        this.entity = undefined;

        this.movement.clearKeys();
    }

    update() {
        this.input.update();
        if (game.getUI.getCurrentScreen.name === "GameScreen") {
            this.movement.update();
            this.buildMode.update();
            this.inventory.update();

            this.updateShootTarget();
        }
    }

    get isLoggedIn() {
        return this.loggedIn;
    }

    get getInput() {
        return this.input;
    }

    get getBuildMode() {
        return this.buildMode;
    }

    get getSprite() {
        return this.sprite;
    }

    get getX() {
        if (this.entity == null)
            return this.spawnX;

        return this.entity.x;
    }

    get getY() {
        if (this.entity == null)
            return this.spawnY;

        return this.entity.y;
    }

    get getWidth() {
        return this.w;
    }

    get getHeight() {
        return this.h;
    }
}