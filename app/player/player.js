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
        game.getNetwork.sendMessage(JSON.stringify({ type: "JoinGame" }));
    }

    spawnToGame() {
        //Should be changed when we go into character select
        this.className = "DEFAULT_PLAYER";
        //this.x = 128;
        //this.y = 32;
        this.w = 42;
        this.h = 42;

        this.sprite = new CustomSprite(this.className, (game.WIDTH / 2) - (21), (game.HEIGHT / 2) - (21), this.w, this.h);
        //Updates the camera offset..
        this.sprite.setPosition(this.spawnX, this.spawnY);

        //Sprite layer
        var group = new PIXI.display.Group(2, false);
        game.stage.addChild(new PIXI.display.Layer(group));
        this.sprite.customSprite.parentGroup = group;


        this.inGame = true;
    }

    kill() {
        this.inGame = false;

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
}