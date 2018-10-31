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
            x: this.fakeX + xOffset,
            y: this.fakeY + yOffset,
            w: width,
            h: height,
        }
    }

    setPosition(x, y) {
        //this.x = x;
        //this.y = y;

        this.fakeX = x;
        this.fakeY = y;
    }

    setVelocity(x, y) {
        this.collider.x += x;
        this.collider.y += y;
        this.fakeX += x;
        this.fakeY += y;

        //This is just without rotation offsets.
        //this.x += x;
        //this.y += y;
    }

    setInteractive() {
        return this.customSprite.setInteractive();
    }

    kill() {
        this.customSprite.destroy();
    }

    get getFakeX() {
        return this.fakeX;
    }

    get getFakeY() {
        return this.fakeY;
    }

    get baseSprite() {
        return this.customSprite;
    }

}