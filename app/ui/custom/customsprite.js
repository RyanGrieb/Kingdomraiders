import game from "index";
import UIObject from "./object/uiobject";
import AssetEnum from "../../world/assets/assetsenum";

export default class CustomSprite extends UIObject {

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

    //Set screen & game position values (x,y values are screen values though.)
    setPosition(x, y) {
       // this.x = x;
       // this.y = y;

        this.customSprite.x = x;
        this.customSprite.y = y;
    }

    setVelocity(x, y) {
       // this.x = x;
        //this.y = y;

        this.customSprite.x += x;
        this.customSprite.y += y;
    }

    setAnchor(x, y) {
        this.customSprite.anchor.x = (x === undefined) ? 0.5 : x;
        this.customSprite.anchor.y = (y === undefined) ? 0.5 : y;
    }

    setParentGroup(parentGroup) {
        this.customSprite.parentGroup = parentGroup;
    }

    setInteractive() {
        return this.customSprite.setInteractive();
    }

    kill() {
        this.customSprite.destroy();
    }

}