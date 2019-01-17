import Tile from "../../world/tile/tile";
import TileType from "../../world/tile/tiletype";

import game from "index";

export default class BuildMode {

    constructor() {
        this.buildEnabled = false;

        this.previousID = undefined;
        //previous
    }

    build() {
        if (game.getUI.isAnyWindowOpenExcept("BuildWindow") || !game.getUI.isWindowOpen("BuildWindow"))
            return;

        var mX = game.renderer.plugins.interaction.mouse.global.x;
        var mY = game.renderer.plugins.interaction.mouse.global.y;

        //If mouse is inside the buildwindow
        var buildWindow = game.getUI.getWindowByName("BuildWindow");
        if (mX >= buildWindow.x && mX <= (buildWindow.x + buildWindow.w))
            if (mY >= buildWindow.y && mY <= (buildWindow.y + buildWindow.h))
                return;

        var camera = game.getUI.getCurrentScreen.getCamera;
        var radians = (Math.PI / 180) * (camera.rotation);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        var mouseX = camera.position.x + (cos * (mX - camera.position.x) + sin * (mY - camera.position.y))
        var mouseY = camera.position.y + (-sin * (mX - camera.position.x) + cos * (mY - camera.position.y))


        var x = (mouseX + (game.getPlayer.getX - camera.position.x)) + 21;
        var y = (mouseY + (game.getPlayer.getY - camera.position.y)) + 21;
        var id = game.getUI.getWindowByName("BuildWindow").selectedTileID;
        var tileType = TileType.getTileFromID(id);
        this.sendBuildRequest(x, y, id);
    }

    sendBuildRequest(x, y, id) {
        if (TileType.getTileFromID(id) === undefined)
            return;

        if (this.previousX === Math.floor(x / 32) && this.previousY === Math.floor(y / 32))
            if (this.previousID === id)
                return;
                
        this.previousID = id;
        this.previousX = Math.floor(x / 32);
        this.previousY = Math.floor(y / 32);

        //Send build packet.
        var msg = {
            type: "BuildRequest",
            x: x,
            y: y,
            id: id,
            replace: !Boolean(TileType.getTileFromID(id).replace),
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    update() {
        if (this.buildEnabled)
            this.build();
    }
}