import Button from "ui/custom/button";
import TextBox from "ui/custom/textbox";

import $ from "jquery";
import game from "index";
import Projectile from "../../../world/entity/projectile/projectile";


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

    fireProjectile() {
            game.getEntityMap.projectileManager.setCaster();
    }

    stopProjectile() {
        game.getEntityMap.projectileManager.removeCaster();
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

}