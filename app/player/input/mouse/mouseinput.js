import Button from "ui/custom/button";
import TextBox from "ui/custom/textbox";

import $ from "jquery";
import game from "index";


export default class MouseInput {
    constructor() {

        //On mouse clck, call..
        $("body").mousedown((e) => this.onMouseClick(e));
        $("body").mouseup(() => this.onMouseRelease());
        $("body").mouseleave(() => this.onMouseLeave());
        $("body").bind("mousewheel", (e) => this.onMouseScroll(e));
        window.onresize = () => this.onWindowResize();
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

    onMouseClick(event) {
        TextBox.onClick();

        if (game.getPlayer.inGame) {
            game.getPlayer.inventory.onMouseClick();

            //Our build inputs
            if (game.getUI.getWindowByName("BuildWindow") !== undefined)
                game.getUI.getWindowByName("BuildWindow").onClick();

            this.enableBuild();

            //Specficily a left click
            if (event.which === 1)
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

    onMouseLeave() {
        if (game.getPlayer.inGame) {

            this.stopProjectile();
        }
    }
    onMouseScroll(e) {
        if (e.originalEvent.wheelDelta / 120 > 0) {
            //Up
            if (game.getUI.getWindowByName("BuildWindow") !== undefined)
                game.getUI.getWindowByName("BuildWindow").previousTile();
        } else {
            //Down
            if (game.getUI.getWindowByName("BuildWindow") !== undefined)
                game.getUI.getWindowByName("BuildWindow").nextTile();
        }
    }

    onWindowResize() {
        // game.WIDTH = $("body").innerWidth();
        // game.HEIGHT = $("body").innerHeight();

    }

    onMouseMove() {

    }

}