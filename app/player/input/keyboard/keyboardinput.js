import TextBox from "ui/custom/textbox";

import game from "index";
import LoginWindow from "../../../ui/window/types/loginwindow";
import EscapeWindow from "../../../ui/window/types/escapewindow";

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
            //Player input keys
            game.getPlayer.movement.handleInput(e);

            //Other game keys
            if (e.key === "Escape") {
                game.getUI.toggleWindow(new EscapeWindow());
            }

            //Build mode
            if (e.key === "ArrowRight")
                if (game.getUI.getWindowByName("BuildWindow") !== undefined)
                    game.getUI.getWindowByName("BuildWindow").nextTile();

            if (e.key === "ArrowLeft")
                if (game.getUI.getWindowByName("BuildWindow") !== undefined)
                    game.getUI.getWindowByName("BuildWindow").previousTile();
            //..
        }

        //Debug
        if (e.key == "Enter") {
            game.getTileGrid.requestMapFromLocation(game.getPlayer.getX, game.getPlayer.getY);
        }

        if (e.key == "r") {
            for (var i = 0; i < game.getTileGrid.tileMap.length; i++) {
                console.log(game.getTileGrid.tileMap[i].x + "," + game.getTileGrid.tileMap[i].y);
            }
        }

        if (e.key == "f") {
            game.getTileGrid.stopChunkRenderer = true;
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