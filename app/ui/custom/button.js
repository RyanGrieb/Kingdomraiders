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
        this.buttonSprite = new PIXI.Sprite(AssetEnum.getObjectFromName("BUTTON").texture);
        this.buttonSprite.x = x;
        this.buttonSprite.y = y;
        this.buttonSprite.width = w;
        this.buttonSprite.height = h;
        game.stage.addChild(this.buttonSprite);
        //this.buttonSprite = game.createInstance.add.sprite(x, y, 'BUTTON');
        //this.buttonSprite.setOrigin(0, 0);
        //this.buttonSprite.setDisplaySize(w, h);

        this.buttonSprite.interactive = true;
        this.buttonSprite.on("click", (event) => {
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
        this.buttonSprite.texture = AssetEnum.getObjectFromName(name).texture;
        // this.buttonSprite.setTexture(name, 0, false);
    }

    kill() {
        this.buttonSprite.destroy();
        this.buttonText.kill();
    }

}