import PlayerInput from "./input/playerinput";
import PlayerMovement from "./input/movement/playermovement";
import PlayerProfile from "./profile/playerprofile";
import CustomSprite from "../ui/custom/customsprite";
import BuildMode from "./item/buildmode";

import game from "index";


export default class Player {
    constructor() {
        //Movement
        this.input = new PlayerInput();
        this.movement = new PlayerMovement();

        //Status Information
        this.playerProfile = new PlayerProfile();

        //Other player constructors
        this.buildMode = new BuildMode();

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
        this.sprite.addCollision(5, 5, 32, 32);

        //Sprite layer
        this.sprite.customSprite.parentGroup = game.getUI.parentGroup.positive3;


        this.inGame = true;
    }

    kill() {
        this.inGame = false;

        this.sprite.customSprite.destroy();
        this.movement.clearKeys();
        this.buildMode.buildEnabled = false;
    }

    update() {
        this.input.update();

        if (game.getUI.getCurrentScreen.name === "GameScreen") {
            this.movement.update();
            this.buildMode.update();
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