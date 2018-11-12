import Button from "ui/custom/button";
import TextBox from "ui/custom/textbox";

import $ from "jquery";
import game from "index";


export default class MouseInput {
    constructor() {

        //On mouse clck, call..
        $("body").mousedown(() => this.onMouseClick());
        $("body").mouseup(() => this.onMouseRelease());
        // $("body").mousemove(() => this.onMouseMove());
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

    fireProjectile() {
        if (game.getUI.isAllWindowsClosed && !game.getPlayer.inventory.windowOpen)
            game.getEntityMap.projectileManager.setClientsideShooter();
    }

    stopProjectile() {
        game.getEntityMap.projectileManager.removeClientsideShooter();
    }

    update() {
        //UI
        Button.onHover();
        TextBox.onHover();
    }

    onMouseClick() {
        TextBox.onClick();

        if (game.getPlayer.inGame) {
            game.getPlayer.inventory.onMouseClick();

            this.enableBuild();
            this.fireProjectile();
        }
    }

    onMouseRelease() {
        if (game.getPlayer.inGame) {
            game.getPlayer.inventory.onMouseRelease();

            this.disableBuild();
            this.stopProjectile();
        }
    }

    onMouseMove() {

    }

}