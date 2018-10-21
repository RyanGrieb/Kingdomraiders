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
            game.getPlayer.getInput.getButtonInput.checkButton(this.name);
        });


        //BUTTON TEXT
        this.buttonText = new CustomText("txtBtn" + name, text, x + w / 2, y + h / 2, txtW, txtH);
    }

    get getTexture() {
        return this.texture;
    }

    setTexture(name) {
        this.texture = name;
        this.customSprite.texture = AssetEnum.getObjectFromName(name).texture;
        // this.customSprite.setTexture(name, 0, false);
    }

    kill() {
        this.customSprite.destroy();
        this.buttonText.kill();
    }

}