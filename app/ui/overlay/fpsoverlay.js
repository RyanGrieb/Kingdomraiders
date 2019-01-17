import CustomText from "../custom/customtext";
import game from "index";

export default class FPSOverlay {

    constructor() {

        this.delay = 0;


        this.fpsDisplay = (new CustomText("txtFPSInfo", "FPS: 0", "#ffffff", 35, 25, 100, 100));
        this.fpsDisplay.customText.parentGroup = game.getUI.parentGroup.positive5;

        this.positionDisplay = (new CustomText("txtFPSInfo", "X: " + parseInt(game.getPlayer.getX) + ", Y: " +
            parseInt(game.getPlayer.getY), "#ffffff", 200, 25, 100, 100));
        this.positionDisplay.customText.parentGroup = game.getUI.parentGroup.positive5;

        this.loadedChunks = (new CustomText("loadedChunkInfo", "Loaded Chunks: 0", "#ffffff", 70, 55, 100, 100));
        this.loadedChunks.customText.parentGroup = game.getUI.parentGroup.positive5;

        this.loadedEntities = (new CustomText("loadedEntityInfo", "Loaded Entities: 0", "#ffffff", 200, 55, 100, 100));
        this.loadedEntities.customText.parentGroup = game.getUI.parentGroup.positive5;

        this.rotationInfo = (new CustomText("rotationInfo", "Rotation: 0", "#ffffff", 55, 80, 100, 100));
        this.rotationInfo.customText.parentGroup = game.getUI.parentGroup.positive5;


        this.pingInfo = (new CustomText("pingInfo", "Ping: 0ms", "#ffffff", 200, 80, 100, 100));
        this.pingInfo.customText.parentGroup = game.getUI.parentGroup.positive5;
    }

    recieveMessage(length) {
        this.currentBytes += length;
    }

    clearObjects() {
        this.fpsDisplay.kill();
        this.positionDisplay.kill();
        this.loadedChunks.kill();
        this.loadedEntities.kill();
        this.rotationInfo.kill();
        this.pingInfo.kill();
    }

    update() {

        if (this.delay % 10 == 0) {
            this.fpsDisplay.setText("FPS: " + parseInt(game.ticker.FPS));
            this.delay = 0;
        }
        this.delay++;

        this.positionDisplay.setText("X: " + parseInt(game.getPlayer.getX) + ", Y: " + parseInt(game.getPlayer.getY));
        this.loadedChunks.setText("Loaded Chunks: " + game.getTileGrid.tileMap.length);
        //this.loadedEntities.setText("Loaded Entities: " + game.getEntityMap.entityMap.length);
        this.rotationInfo.setText("Rotation: " + Math.round(game.getUI.getCurrentScreen.getCamera.rotation));
        this.pingInfo.setText("Ping: " + game.getNetwork.latencey.ping + "ms");
    }

}