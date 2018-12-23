import Tile from "../../world/tile/tile";
import TileType from "../../world/tile/tiletype";

import game from "index";

export default class BuildMode {

    constructor() {
        this.buildEnabled = false;
    }

    build() {
        if (game.getUI.isAnyWindowOpenExcept("BuildWindow") || !game.getUI.isWindowOpen("BuildWindow"))
            return;

        var camera = game.getUI.getCurrentScreen.getCamera;
        var radians = (Math.PI / 180) * (camera.rotation);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        var mX = game.renderer.plugins.interaction.mouse.global.x;
        var mY = game.renderer.plugins.interaction.mouse.global.y;

        var mouseX = camera.position.x + (cos * (mX - camera.position.x) + sin * (mY - camera.position.y))
        var mouseY = camera.position.y + (-sin * (mX - camera.position.x) + cos * (mY - camera.position.y))


        var x = (mouseX + (game.getPlayer.getX - camera.position.x)) + 21;
        var y = (mouseY + (game.getPlayer.getY - camera.position.y)) + 21;
        var id = game.getUI.getWindowByName("BuildWindow").selectedTileID;
        var tileType = TileType.getTileFromID(id);
        this.sendBuildRequest(x, y, id);
    }

    sendBuildRequest(x, y, id) {
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