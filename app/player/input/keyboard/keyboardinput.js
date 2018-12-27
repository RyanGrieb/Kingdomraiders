import TextBox from "ui/custom/textbox";

import game from "index";
import LoginWindow from "../../../ui/window/types/loginwindow";
import EscapeWindow from "../../../ui/window/types/escapewindow";
import MenuScreen from "../../../ui/scene/menuscreen";
import GameScreen from "../../../ui/scene/gamescreen";

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
                game.getPlayer.playerProfile.requestToLogin();

            if (game.getUI.isWindowOpen("RegisterWindow"))
                game.getPlayer.playerProfile.requestToRegister();

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

        //All screens
        this.onTextboxType(e);

        if (game.getUI.getCurrentScreen.name === "MenuScreen") {
            this.onEnter(e);
        }

        if (game.getUI.getCurrentScreen.name === "GameScreen") {
            //Stop all input if chat is selected

            //Player input keys            
            if (!game.getPlayer.playerChat.isSelected)
                game.getPlayer.movement.handleInput(e);

            //Inventory
            if (!game.getPlayer.playerChat.isSelected)
                if (e.key === "c")
                    game.getPlayer.inventory.toggle();

            //Other game keys
            if (e.key === "Escape") {
                game.getUI.toggleWindow(new EscapeWindow());
            }

            //Interact Key
            if (e.key === " ") {
                game.getPlayer.movement.interact();
            }

            //Build mode
            if (e.key === "ArrowRight")
                if (game.getUI.getWindowByName("BuildWindow") !== undefined)
                    game.getUI.getWindowByName("BuildWindow").nextTile();

            if (e.key === "ArrowLeft")
                if (game.getUI.getWindowByName("BuildWindow") !== undefined)
                    game.getUI.getWindowByName("BuildWindow").previousTile();
            //..

            //Chat
            if (e.key == "Enter") {
                game.getPlayer.playerChat.sendMessage();
            }
        }

        //debug
        //  if(e.key == "y")
        //  game.getUI.setScreen(new MenuScreen());
        //
        //  if(e.key == "u")
        //  game.getUI.setScreen(new GameScreen());

    }

    onKeyJustReleased(e) {
        if (game.getUI.getCurrentScreen.name === "GameScreen") {
            game.getPlayer.movement.handleInputRelease(e);
        }
    }


    update() {

    }

}