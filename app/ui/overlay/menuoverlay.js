import game from "index";
import TileChunk from "../../world/tile/tilechunk";
import Tile from "../../world/tile/tile";
import TileType from "../../world/tile/tiletype";

export default class MenuOverlay {

    constructor() {
        this.tileMap = [];
        this.container = new PIXI.Container();
        this.initChunks();
    }

    initChunks() {
        var chunk = [1, 1, 1, 0];

        for (var y = 0; y < game.HEIGHT; y += 32)
            for (var x = 0; x <= game.WIDTH + 32; x += 32)
                this.tileMap.push(new Tile(this.container, TileType.getTileFromID(Math.floor(Math.random() * 2)), x, y));

        game.stage.addChild(this.container);
    }

    clearObjects() {
        for (var i = 0; i < this.tileMap.length; i++) {
            this.tileMap[i].kill();
        }

        this.tileMap[i] = [];
    }

    update() {
        for (var i = 0; i < this.tileMap.length; i++) {
            this.tileMap[i].sprite.x -= 1;

            //Remove out of bounds tiles
            if (this.tileMap[i].sprite.x < -64) {
                this.tileMap[i].kill();
                this.tileMap.splice(i, 1);
            }
        }

        //Add additional rows if missing
        if (this.isNextRowEmpty)
            for (var y = 0; y < game.HEIGHT; y += 32)
                this.tileMap.push(new Tile(this.container, TileType.getTileFromID(Math.floor(Math.random() * 2)), game.WIDTH + 32, y));

    }


    get isNextRowEmpty() {
        for (var i = 0; i < this.tileMap.length; i++) {
            if (this.tileMap[i].sprite.x > game.WIDTH)
                return false;
        }

        return true;
    }
}