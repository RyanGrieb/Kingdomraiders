import CustomText from "../custom/customtext";
import game from "index";

export default class FPSOverlay {

    constructor() {
        this.group = new PIXI.display.Group(3, false);
        game.stage.addChild(new PIXI.display.Layer(this.group));

        this.delay = 0;


        this.fpsDisplay = (new CustomText("txtFPSInfo", "FPS: 0", 35, 25, 100, 100));
        this.fpsDisplay.customText.parentGroup = this.group;

        this.positionDisplay = (new CustomText("txtFPSInfo", "X: " + parseInt(game.getPlayer.getX) + ", Y: " +
            parseInt(game.getPlayer.getY), 200, 25, 100, 100));
        this.positionDisplay.customText.parentGroup = this.group;

        this.loadedChunks = (new CustomText("loadedChunkInfo", "Loaded Chunks: 0", 70, 55, 100, 100));
        this.loadedChunks.customText.parentGroup = this.group;

        this.rotationInfo = (new CustomText("rotationInfo", "Rotation: 0", 55, 80, 100, 100));
        this.rotationInfo.customText.parentGroup = this.group;
    }

    clearObjects() {
        this.fpsDisplay.kill();
        this.positionDisplay.kill();
        this.loadedChunks.kill();
        this.rotationInfo.kill();
    }

    update() {

        if (this.delay % 10 == 0) {
            this.fpsDisplay.setText("FPS: " + parseInt(game.ticker.FPS));
            this.delay = 0;
        }
        this.delay++;

        this.positionDisplay.setText("X: " + parseInt(game.getPlayer.getX) + ", Y: " + parseInt(game.getPlayer.getY));
        this.loadedChunks.setText("Loaded Chunks: " + game.getTileGrid.tileMap.length);
        this.rotationInfo.setText("Rotation: " + game.getUI.getCurrentScreen.getCamera.rotation);

    }

}