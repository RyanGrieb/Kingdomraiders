import game from "index";
import UIObject from "./object/uiobject";
import AssetEnum from "../../world/assets/assetsenum";
import { setInterval, clearInterval } from "timers";

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

        //Animation
        this.animation = {
            isEnabled: false,
            animationNumber: 1,
            currentAnimationNumber: 1,
        }
        //.
    }

    //Set screen & game position values (x,y values are screen values though.)
    setPosition(x, y) {
        super.setPosition(x, y);
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

    setTexture(name) {
        var texture = AssetEnum.getObjectFromName(name).texture;
        this.customSprite.texture = texture;
        this.name = name;
    }

    setAnimation(tick, animationNumber) {
        if (!this.animation.isEnabled) {
            this.animation.isEnabled = true;
            this.animation.animationNumber = animationNumber;
            this.animation.currentAnimationNumber = animationNumber;

            this.intervalID = setInterval(() => this.cycleAnimation(), tick);
        }
    }

    removeAnimation() {
        if (this.intervalID !== undefined)
            clearInterval(this.intervalID);

        this.animation.isEnabled = false;

        //Reset back to default sprite image if this is a numbered texture
        var textureName = String(this.name);
        if (/\d/.test(textureName) && this.customSprite.transform !== null) {
            textureName = textureName.substring(0, textureName.length - 1);
            this.setTexture(textureName + "1");
        }
    }

    cycleAnimation() {

        //If we go over our max animation number, set it back to 1.

        var textureName = String(this.name);
        textureName = textureName.substring(0, textureName.length - 1);
        this.setTexture(textureName + "" + this.animation.currentAnimationNumber);

        this.animation.currentAnimationNumber++;

        if (this.animation.currentAnimationNumber > this.animation.animationNumber)
            this.animation.currentAnimationNumber = 1;
    }

    kill() {
        this.customSprite.destroy();
        this.removeAnimation();
    }

}