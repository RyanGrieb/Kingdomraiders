import CustomText from "../custom/customtext";
import game from "index";

export default class FPSOverlay {

    constructor() {
        this.delay = 0;
        this.lastLoop = new Date();
        this.fps = 0;

        this.fpsDisplay = (new CustomText("txtFPSInfo", "FPS: 0", 35, 25, 100, 100));
        this.positionDisplay = (new CustomText("txtFPSInfo", "X: " + parseInt(game.getPlayer.getX) + ", Y: " +
            parseInt(game.getPlayer.getY), 200, 25, 100, 100));
    }


    update() {

        if (this.delay % 10 == 0) {
            this.fpsDisplay.setText("FPS: " + parseInt(game.ticker.FPS));
            this.delay = 0;
        }
        this.delay++;

        this.positionDisplay.setText("X: " + parseInt(game.getPlayer.getX) + ", Y: " + parseInt(game.getPlayer.getY));
    }

}