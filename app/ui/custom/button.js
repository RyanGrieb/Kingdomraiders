import UIObject from "./object/uiobject";
import CustomText from "./customtext";

import game from "index";
import AssetEnum from "../../world/assets/assetsenum";

export default class Button extends UIObject {

    constructor(name, text, x, y, w, h, txtW, txtH) {
        super(name, x, y, w, h);
        this.text = text;
        //BUTTON IMAGE (not custom, you know why)
        this.texture = "BUTTON";
        this.customSprite = new PIXI.Sprite(AssetEnum.getObjectFromName("BUTTON").texture);
        this.customSprite.x = x;
        this.customSprite.y = y;
        this.customSprite.width = w;
        this.customSprite.height = h;
        game.stage.addChild(this.customSprite);
        //this.customSprite = game.createInstance.add.sprite(x, y, 'BUTTON');
        //this.customSprite.setOrigin(0, 0);
        //this.customSprite.setDisplaySize(w, h);

        this.customSprite.interactive = true;
        this.customSprite.on("click", (event) => {
            var clicked = game.getPlayer.getInput.getButtonInput.checkButton(this.name);
            if (clicked)
                this.playSound();
        });


        //BUTTON TEXT
        this.buttonText = new CustomText("txtBtn" + name, text, "#ffffff", x + w / 2, y + h / 2, txtW, txtH);
    }

    playSound() {
        const sound = PIXI.sound.Sound.from(AssetEnum.list.SOUND_BUTTONCLICK.sound);
        sound.volume = 0.3;
        sound.play();
    }

    setTexture(name) {
        this.texture = name;
        this.customSprite.texture = AssetEnum.getObjectFromName(name).texture;
        // this.customSprite.setTexture(name, 0, false);
    }

    setParentGroup(parentGroup) {
        this.customSprite.parentGroup = parentGroup;
        this.buttonText.customText.parentGroup = parentGroup;
    }

    setPosition(x, y) {
        super.setPosition(x, y);

        this.customSprite.x = x;
        this.customSprite.y = y;
        this.buttonText.setPosition(x, y);
    }

    get getTexture() {
        return this.texture;
    }

    kill() {
        this.customSprite.destroy();
        this.buttonText.kill();
    }




    //Not part of this who class, just here to organize properly.
    static onHover() {
        for (var i = 0; i < game.getUI.uiObjects.length; i++) {

            if (game.getUI.uiObjects[i] instanceof Button) {
                var buttonObj = game.getUI.uiObjects[i];

                if (buttonObj.mouseInside() && buttonObj.getTexture !== "BUTTON2") {

                    buttonObj.setTexture("BUTTON2");

                } else if (!buttonObj.mouseInside() && buttonObj.getTexture === "BUTTON2") {

                    buttonObj.setTexture("BUTTON");
                }

            }
        }
    }
}