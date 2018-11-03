import game from "index";
import UIObject from "./object/uiobject";
import AssetEnum from "../../world/assets/assetsenum";

export default class CustomSprite extends UIObject {

    //There are there (x,y) points in this class

    //this.customSprite.x: the real location of the sprite
    //this.x: the location of the sprite based off the camera
    //this.fakeX: the location the the sprite based off camera + rotation

    constructor(spriteName, x, y, w, h) {
        super(spriteName, x, y, w, h);

        //Misc helpers
        if (game.getUI.getCurrentScreen.name === "GameScreen") {
            this.camera = game.getUI.getCurrentScreen.getCamera;
            this.gamePosition = {
                x: (x + (game.getPlayer.getX - this.camera.position.x)) + 21,
                y: (y + (game.getPlayer.getY - this.camera.position.y)) + 21,
            };
        }

        //Sprite
        this.customSprite = new PIXI.Sprite(AssetEnum.getObjectFromName(spriteName).texture);
        this.customSprite.x = x;
        this.customSprite.y = y;
        this.customSprite.width = w;
        this.customSprite.height = h;


        game.stage.addChild(this.customSprite);

    }

    addCollision(xOffset, yOffset, width, height) {
        this.collider = {
            x: this.getGamePositionX + xOffset,
            y: this.getGamePositionY + yOffset,
            w: width,
            h: height,
            collided: false,
        }
    }

    //Set screen & game position values (x,y values are screen values though.)
    setWholePosition(x, y) {
        this.x = x;
        this.y = y;
        this.customSprite.x = x;
        this.customSprite.y = y;

        //Needs to be offset.
        //this.gamePosition.x = ???
        this.gamePosition.x = (x + (game.getPlayer.getX - this.camera.position.x));
        this.gamePosition.y = (y + (game.getPlayer.getY - this.camera.position.y));
    }

    setGamePosition(x, y) {
        this.gamePosition.x = x;
        this.gamePosition.y = y;
    }

    setVelocity(x, y) {

        this.x += x;
        this.y += y;

        this.customSprite.x += x;
        this.customSprite.y += y;

        //We need to sin&cos our gamePosition unlike our screenX&Y's
        var radians = (Math.PI / 180) * this.camera.rotation;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var gameXVel = (x * sin) + (y * cos);
        var gameYVel = (x * cos) + (y * sin);

       // this.gamePosition.x += gameXVel;
       // this.gamePosition.y += gameYVel;
        //console.log(x+","+y);

        if (this.collider !== undefined) {
            // this.collider.x += x;
            // this.collider.y += y;
        }
    }

    //Depreciated soon. (only used by player.)
    setGameVelocity(x, y) {
        this.gamePosition.x += x;
        this.gamePosition.y += y;

        if (this.collider !== undefined) {
            this.collider.x += x;
            this.collider.y += y;
        }
    }

    setInteractive() {
        return this.customSprite.setInteractive();
    }

    kill() {
        this.customSprite.destroy();
    }

    get getGamePositionX() {
        return this.gamePosition.x;
    }

    get getGamePositionY() {
        return this.gamePosition.y;
    }

    get baseSprite() {
        return this.customSprite;
    }

}