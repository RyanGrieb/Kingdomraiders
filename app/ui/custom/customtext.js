import UIObject from "./object/uiobject";
import game from "index";

export default class CustomText extends UIObject {

    constructor(name, text, x, y, w, h) {
        super(name, x, y, w, h);
        this.text = text;
        this.color = "#ffffff";

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
        this.text = text;
        this.customText.text = text;
        this.customText.x = this.x - (this.customText.width / 2);
        this.customText.y = this.y - (this.customText.height / 2);
    }

    generateText() {
        this.customText = new PIXI.Text(this.text, {
            fontFamily: 'Georgia',
            fontSize: this.w / 7,
            fill: ['#ffffff'], // gradient
            wordWrap: true,
            wordWrapWidth: 440
        });
        this.customText.x = this.x - (this.customText.width / 2);
        this.customText.y = this.y - (this.customText.height / 2);

        game.stage.addChild(this.customText);
        // this.customText.setOrigin(0.5, 0.5);
    }

    kill() {
        this.customText.destroy();
    }

}