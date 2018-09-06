import game from "index";
import UIObject from "./object/uiobject";
import UIObjectEnum from "./object/uiobjectenum";

export default class CustomSprite extends UIObject {

    constructor(spriteName, x, y, w, h) {
        super(null, x, y, w, h);

        //Sprite
        this.customSprite = new PIXI.Sprite(UIObjectEnum.getUIObjectFromName(spriteName).texture);
        this.customSprite.x = x;
        this.customSprite.y = y;
        this.customSprite.width = w;
        this.customSprite.height = h;
        game.stage.addChild(this.customSprite);

    }

    setPosition(x, y) {
        this.customSprite.x = x;
        this.customSprite.y = y;
    }

    setVelocity(x, y) {
        this.customSprite.x += x;
        this.customSprite.y += y;
    }

    setInteractive() {
        return this.customSprite.setInteractive();
    }

    kill() {
        this.customSprite.destroy();
    }

    get baseSprite() {
        return this.customSprite;
    }

}