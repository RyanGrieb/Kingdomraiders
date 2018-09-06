import UIObject from "./object/uiobject";
import game from "index";
import CustomSprite from "./customsprite";

export default class TextBox extends UIObject {

    constructor(name, x, y, w, h) {
        super(name, x, y, w, h);

        //Textbox Element
        this.customSprite = new CustomSprite("CHATBOX", x, y, this.w, this.h);

        //Text
        this.customText = new PIXI.Text("", {
            fontFamily: 'Georgia',
            fontSize: 16,
            wordWrap: true,
            wordWrapWidth: 440
        });
        this.customText.x = x;
        this.customText.y = y + 8;
        game.stage.addChild(this.customText);
        //this.customText.setOrigin(0, -0.5);
    }

    select() {
        if (this.selected)
            return;

        this.selected = true;
        this.highlight();
        this.cursorInterval();
    }

    unselect() {
        this.selected = false;
        this.unhighlight();
    }

    highlight() {
        if (this.selected && this.selectGraphic != null)
            return;

        this.selectGraphic = new CustomSprite("TEXTBOXHIGHLIGHT", (this.x + this.customText.width) + 2, this.y + (10 / 2), 0.7, this.h - 10);
        //this.selectGraphic.fillStyle(0x000000, 1);
        //this.selectGraphic.fillRect((this.x + this.customText.width) + 4, this.y + (10 / 2), 0.7, this.h - 10);
    }

    unhighlight() {

        clearTimeout(this.timer);
        //Nested if.. If null, do nothing, if not, destroy.
        (this.selectGraphic == null) ? null : this.selectGraphic.kill();
        this.selectGraphic = null;
    }


    cycleHighlighter() {
        (this.selectGraphic == null) ? null : this.selectGraphic.kill();
        this.selectGraphic = null;
        this.highlight();
    }

    cursorInterval() {
        this.timer = setInterval(() => {
            if (this.selectGraphic != null) {
                //Unhighlight
                this.selectGraphic.kill();
                this.selectGraphic = null;
                return;
            } else if (this.selectGraphic == null) {
                this.highlight();
            }
        }, 500);
    }

    handleKeyinput(e) {

        //Check for speical keys
        //console.log(e.keyCode);
        switch (e.keyCode) {
            //Backspace
            case 8:
                this.customText.text = this.customText.text.substring(0, this.customText.text.length - 1);
                this.cycleHighlighter();
                return;

            //Tab
            case 9:
                //Select the next existing textbox
                var existingTextboxes = [];
                for (let i = 0; i < game.getUI.uiObjects.length; i++) {
                    if (game.getUI.uiObjects[i] instanceof TextBox) {
                        var textboxObj = game.getUI.uiObjects[i];
                        existingTextboxes.push(textboxObj);
                    }
                }

                for (let i = 0; i < existingTextboxes.length; i++) {
                    if (existingTextboxes[i] === this) {

                        if (i >= existingTextboxes.length - 1) {
                            this.unselect();
                            //We wait 10ms so the selected textbox doesn't detect our input
                            setTimeout(() => existingTextboxes[0].select(), 10);
                            break;
                        }

                        this.unselect();
                        //We wait 10ms so the selected textbox doesn't detect our input
                        setTimeout(() => existingTextboxes[i + 1].select(), 10);
                    }
                }


                e.preventDefault();
                return;

            //Enter
            case 13:
                return;

            //Misc. keys, such as CAPSLOCK,ect.
            case 16: case 17: case 20: case 27: case 37: case 38: case 39: case 40:

            //F# keys
            case 112: case 113: case 114: case 115: case 116:
            case 117: case 118: case 119: case 120: case 121:
            case 122: case 123:
                return;
        }

        //Modify text
        this.customText.text = this.customText.text + e.key;

        //Cycle through highlight interval
        this.cycleHighlighter();
    }


    kill() {
        this.unhighlight();
        this.customSprite.kill();
        this.customText.destroy();
    }


    get getText() {
        return this.customText.text;
    }

}