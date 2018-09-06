import Tile from "./tile";
import TileType from "./tiletype";

export default class TileChunk {
    constructor(chunk, x, y) {
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
                this.tiles[i] = new Tile(TileType.list.GRASS, this.x + (x * 32), this.y + (y * 32) + 32);
            else
                this.tiles[i] = new Tile(TileType.list.FLOOR, this.x + (x * 32), this.y + (y * 32) + 32);

            x++;
        }
    }
}