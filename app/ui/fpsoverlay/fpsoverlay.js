import CustomText from "../custom/customtext";
import game from "index";

export default class FPSOverlay {

    constructor() {
        this.delay = 0;
        this.lastLoop = new Date();
        this.fps = 0;

        this.fpsDisplay = (new CustomText("txtFPSInfo", "FPS: 0", 35, 25, 100, 100));
    }


    update() {

        var thisLoop = new Date();
        this.fps = 1000 / (thisLoop - this.lastLoop);
        this.lastLoop = thisLoop;

        if (this.delay % 10 == 0) {
            this.fpsDisplay.setText("FPS: " + parseInt(this.fps));
            this.delay = 0;
        }
        this.delay++;
    }

}