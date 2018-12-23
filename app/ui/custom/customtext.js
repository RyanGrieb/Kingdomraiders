import UIObject from "./object/uiobject";
import game from "index";

export default class CustomText extends UIObject {

    constructor(name, text, color, x, y, w, h) {
        super(name, x, y, w, h);
        this.text = text;
        this.color = color;

        //Text
        this.generateText();

    }

    setColor(color) {
        //Hacked method since shitty javascript soyboys don't know how to support multiple constructors
        this.kill();
        this.color = color;

        this.generateText();
    }

    setText(text) {
        var parentGroup = this.customText.parentGroup;
        this.text = text;
        this.customText.text = text;
        this.customText.x = this.x - (this.customText.width / 2);
        this.customText.y = this.y - (this.customText.height / 2);

        this.customText.parentGroup = parentGroup;
    }

    setParentGroup(parentGroup) {
        this.customText.parentGroup = parentGroup;
    }

    generateText() {
        this.customText = new PIXI.Text(this.text, {
            fontFamily: 'Trebuchet MS',
            fontSize: this.w / 7,
            fill: [this.color], // gradient
            wordWrap: true,
            wordWrapWidth: 440
        });
        this.customText.x = this.x - (this.customText.width / 2);
        this.customText.y = this.y - (this.customText.height / 2);

        game.stage.addChild(this.customText);
        // this.customText.setOrigin(0.5, 0.5);
    }

    setPosition(x, y) {
        super.setPosition(x, y);

        this.customText.x = x;
        this.customText.y = y;
    }

    setVelocity(x, y) {
        super.setPosition(this.x + x, this.y + y);
        this.customText.x += x;
        this.customText.y += y;
    }

    kill() {
        this.customText.destroy({ texture: true, baseTexture: true });
    }

}