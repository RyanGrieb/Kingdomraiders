import game from "index";

import Tile from "./tile";
import TileType from "./tiletype";

export default class TileChunk {
    constructor(chunk, x, y) {
        //TODO: USE RENDER TEXTURE
        this.renderer = PIXI.autoDetectRenderer(30 * 32, 30 * 32, { view: canvas, ratio: 1 });
        this.renderTexture = PIXI.RenderTexture.create(30 * 32, 30 * 32);

        this.container = new PIXI.Container();
        game.getTileGrid.container.addChild(this.container);

        this.tiles = [];
        this.x = x;
        this.y = y;

        this.initTiles(chunk);
    }

    initTiles(chunk) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < chunk.length; i++) {
            if (i % 30 == 0) {
                x = 0;
                y--;
            }

            if (i % 2 == 0)
                this.tiles[i] = new Tile(this, TileType.list.GRASS, this.x + (x * 32), this.y + (y * 32) + 32);
            else
                this.tiles[i] = new Tile(this, TileType.list.FLOOR, this.x + (x * 32), this.y + (y * 32) + 32);

            x++;
        }
    }

    update() {

        //Updates the tiles to be offset from the camera.
        var camera = game.getUI.getCurrentScreen.getCamera;
        for (var i = 0; i < this.tiles.length; i++)
            this.tiles[i].setCameraPivot(camera.pivot.x, camera.pivot.y);

        //Determines which portions of the chunk should be rendered.
    }
}