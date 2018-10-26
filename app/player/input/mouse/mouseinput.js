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

    //TODO: move these somewhere else.
    enableBuild() {
        if (game.getUI.isWindowOpen("BuildWindow"))
            game.getPlayer.getBuildMode.buildEnabled = true;
    }

    disableBuild() {
        if (game.getUI.isWindowOpen("BuildWindow"))
            game.getPlayer.getBuildMode.buildEnabled = false;
    }

    update() {
        Button.onHover();
        TextBox.onHover();
    }

    onMouseClick(e) {
        TextBox.onClick();

        if (game.getPlayer.inGame) {
            game.getPlayer.inventory.onMouseClick();

            this.enableBuild();
        }
    }

    onMouseRelease(e) {
        if (game.getPlayer.inGame) {
            game.getPlayer.inventory.onMouseRelease();

            this.disableBuild();
        }
    }

}