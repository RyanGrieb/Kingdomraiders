import PlayerInput from "./input/playerinput";
import PlayerMovement from "./input/playermovement";
import PlayerProfile from "./profile/playerprofile";
import CustomSprite from "../ui/custom/customsprite";

import game from "index";

export default class Player {
    constructor() {
        //Movement
        this.input = new PlayerInput();
        this.movement = new PlayerMovement();

        //Status Informatiion
        this.playerProfile = new PlayerProfile();

        this.loggedIn = false;
        this.inGame = false;
    }

    joinGame() {
        //Send packet requesting to join game
        var msg = {
            type: "JoinGame",
        };
        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    spawnToGame() {
        //Should be changed when we go into character select
        this.className = "DEFAULT_PLAYER";
        //this.x = 128;
        //this.y = 32;
        this.w = 42;
        this.h = 42;

        this.sprite = new CustomSprite(this.className, (window.innerWidth / 2) - (21), (window.innerHeight / 2) - (21), this.w, this.h);
        //Updates the camera offset..
        this.sprite.setPosition(this.spawnX, this.spawnY);

        //Sprite layer
        var group = new PIXI.display.Group(1, false);
        game.stage.addChild(new PIXI.display.Layer(group));
        this.sprite.customSprite.parentGroup = group;


        this.inGame = true;
    }

    kill() {
        this.sprite.customSprite.destroy();
        this.movement.clearKeys();
    }

    update() {
        this.input.update();

        if (game.getUI.getCurrentScreen.name === "GameScreen")
            this.movement.update();
    }

    get isLoggedIn() {
        return this.loggedIn;
    }

    get getInput() {
        return this.input;
    }

    get getSprite() {
        return this.sprite;
    }

    get getX() {
        if (this.sprite == null)
            return this.spawnX;

        return this.sprite.getFakeX;
    }

    get getY() {
        if (this.sprite == null)
            return this.spawnY;

        return this.sprite.getFakeY;
    }

    get getFakeX() {
        return this.sprite.getFakeX;
    }

    get getFakeY() {
        return this.sprite.getFakeY;
    }
}