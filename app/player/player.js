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
        //Updates the camera offset..
        this.entity.addCollision(8, 5, 27, 30);

        //Sprite layer
        this.entity.sprite.customSprite.parentGroup = game.getUI.parentGroup.positive3;


        this.joinRequested = false;
        this.inGame = true;
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