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

    setPosition(x, y) {
        this.x = x;
        this.y = y;

        this.fakeX = x;
        this.fakeY = y;
    }

    setVelocity(x, y) {
        this.x += x;
        this.y += y;

        //Fake x,y for camera rotation offset.
        var rotation = game.getUI.getCurrentScreen.camera.rotation;
        var radians = (Math.PI / 180) * rotation;
        
        //Sprite rotatation offset
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Ofset the cos & sin
        var testX = (y * sin) + (x * cos);
        var testY = (y * cos) - (x * sin);

        this.fakeX += testX;
        this.fakeY += testY;
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