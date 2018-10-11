import Button from "ui/custom/button";
import TextBox from "ui/custom/textbox";

import $ from "jquery";
import game from "index";


export default class MouseInput {
    constructor() {

        //On mouse clck, call..
        $("body").mousedown(() => this.onMouseClick());
        $("body").mouseup(() => this.onMouseRelease());
    }

    onButtonHover() {
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

    onTextboxHover() {
        for (var i = 0; i < game.getUI.uiObjects.length; i++) {
            if (game.getUI.uiObjects[i] instanceof TextBox) {
                var textboxObj = game.getUI.uiObjects[i];

                if (textboxObj.mouseInside()) {
                    document.querySelector('body').style.cursor = 'text';
                    //Returns, fixes only 1 textbox being able to be selected
                    return;
                } else if (!textboxObj.mouseInside()) {
                    document.querySelector('body').style.cursor = 'auto';
                }
            }
        }
    }

    onTextboxClick() {
        for (var i = 0; i < game.getUI.uiObjects.length; i++) {
            if (game.getUI.uiObjects[i] instanceof TextBox) {
                var textboxObj = game.getUI.uiObjects[i];

                if (textboxObj.mouseInside()) {
                    textboxObj.select();
                } else if (!textboxObj.mouseInside()) {
                    textboxObj.unselect();
                }
            }
        }
    }

    enableBuild() {
        if (game.getUI.isWindowOpen("BuildWindow"))
            game.getPlayer.getBuildMode.buildEnabled = true;
    }

    disableBuild() {
        if (game.getUI.isWindowOpen("BuildWindow"))
            game.getPlayer.getBuildMode.buildEnabled = false;
    }

    update() {
        this.onButtonHover();
        this.onTextboxHover();
    }


    onMouseClick(e) {
        //Menu
        this.onTextboxClick();

        //In-Game
        this.enableBuild();
    }

    onMouseRelease(e) {
        this.disableBuild();
    }

}