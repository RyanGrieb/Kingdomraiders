import game from "index";

import MouseInput from "./mouse/mouseinput";
import KeyboardInput from "./keyboard/keyboardinput";
import ButtonInput from "./button/buttoninput";

export default class PlayerInput {
    constructor() {
        this.mouseInput = new MouseInput();
        this.keyboardInput = new KeyboardInput();
        this.buttonInput = new ButtonInput();
        //Add the rest
    }

    handleInteraction(collidedObject) {
        if (collidedObject.type.name.includes("DUNGEON")) {
            var msg = {
                type: "EnterDungeon",
                x: collidedObject.x,
                y: collidedObject.y,
            };
            game.getNetwork.sendMessage(JSON.stringify(msg));
        }
    }

    update() {
        this.mouseInput.update();
        this.keyboardInput.update();
    }

    get getMouseInput() {
        return this.mouseInput;
    }

    get getButtonInput() {
        return this.buttonInput;
    }

}