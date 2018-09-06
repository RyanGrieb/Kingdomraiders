import TextBox from "ui/custom/textbox";

import game from "index";
import LoginWindow from "../../../ui/window/types/loginwindow";

export default class KeyboardInput {
    constructor() {
        //Constant-like input
        //onGameStart()..

        //Textbox-like input..
        window.onkeydown = (e) => this.onKeyJustPressed(e);
        window.onkeyup = (e) => this.onKeyJustReleased(e);
    }

    onEnter(e) {
        if (e.key === "Enter") {
            if (game.getUI.isWindowOpen("LoginWindow"))
                game.getUI.getWindowByName("LoginWindow").requestToLogin();

            if (game.getUI.isWindowOpen("RegisterWindow"))
                game.getUI.getWindowByName("RegisterWindow").requestToRegister();

        }
    }


    onTextboxType(e) {
        for (var i = 0; i < game.getUI.uiObjects.length; i++) {
            if (game.getUI.uiObjects[i] instanceof TextBox) {
                var textboxObj = game.getUI.uiObjects[i];
                if (textboxObj.selected)
                    textboxObj.handleKeyinput(e);

            }
        }
    }

    onKeyJustPressed(e) {
        if (game.getUI.getCurrentScreen.name === "MenuScreen") {
            this.onTextboxType(e);
            this.onEnter(e);
        }

        if (game.getUI.getCurrentScreen.name === "GameScreen") {
            game.getPlayer.movement.handleInput(e);
        }
    }

    onKeyJustReleased(e) {
        if (game.getUI.getCurrentScreen.name === "GameScreen") {
            game.getPlayer.movement.handleInputRelease(e);
        }
    }


    update() {

    }

}