import game from "index";
import TileChunk from "../../world/tile/tilechunk";
import Tile from "../../world/tile/tile";
import TileType from "../../world/tile/tiletype";

export default class MenuOverlay {

    constructor() {
        this.tileMap = [];
        this.container = new PIXI.Container();

        this.lastTreeLocation = { x: 0, y: 0 };

        this.initChunks();
    }

    initChunks() {
        var chunk = [1, 1, 1, 0];


        for (var y = 0; y < game.HEIGHT; y += 32)
            for (var x = 0; x <= game.WIDTH + 32; x += 32) {
                let tile = new Tile(this.container, TileType.getTileFromID(0), x, y);
                tile.sprite.parentGroup = game.getUI.parentGroup.negative3;
                this.tileMap.push(tile);
                //Then push a toplayer tile ontop randomly.. //6-7

                if (Math.floor((Math.random() * 100)) < 15) {
                    this.tileMap.push(this.getRandomTopTile(x, y));
                }


            }

        game.stage.addChild(this.container);
    }

    clearObjects() {
        for (var i = 0; i < this.tileMap.length; i++) {
            this.tileMap[i].kill();
        }

        this.tileMap[i] = [];
        this.container.destroy();
    }

    update() {
        for (var i = 0; i < this.tileMap.length; i++) {
            this.tileMap[i].sprite.x -= 1;

            //Remove out of bounds tiles
            if (this.tileMap[i].sprite.x < -128) {
                this.tileMap[i].kill();
                this.tileMap.splice(i, 1);
            }
        }

        //Add additional rows if missing
        if (this.isNextRowEmpty) {
            for (var y = 0; y < game.HEIGHT; y += 32) {
                let tile = new Tile(this.container, TileType.getTileFromID(0), game.WIDTH + 32, y);
                tile.sprite.parentGroup = game.getUI.parentGroup.negative3;
                this.tileMap.push(tile);
                //Then push a toplayer tile ontop randomly.. //6-7

                if (Math.floor((Math.random() * 100)) < 15) {
                    this.tileMap.push(this.getRandomTopTile(game.WIDTH + 32, y));
                }

            }
            this.lastTreeLocation.x -= 32;
        }

    }

    getRandomTopTile(x, y) {
        var randomNum = Math.floor((Math.random() * 10));
        let tileType = TileType.list.GRASS;
        let parentGroup = game.getUI.parentGroup.negative1;


        if (randomNum < 2 && ((x - this.lastTreeLocation.x) > 162) || (y - this.lastTreeLocation.y) > 96) {
            tileType = TileType.list.BIGTREE;
            this.lastTreeLocation.x = x;
            this.lastTreeLocation.y = y;
        } else

            if (randomNum >= 2 && randomNum < 5 && ((x - this.lastTreeLocation.x) > 162) || (y - this.lastTreeLocation.y) > 96) {
                tileType = TileType.list.BIGTREE2;
                this.lastTreeLocation.x = x;
                this.lastTreeLocation.y = y;
            } else

                if (randomNum >= 5 && randomNum < 6) {
                    tileType = TileType.list.YELLOWFLOWER;
                    parentGroup = game.getUI.parentGroup.negative2;
                }

                else {
                    tileType = TileType.list.BRUSH;
                    parentGroup = game.getUI.parentGroup.negative2;
                }

        let tile = new Tile(this.container, tileType, x, y);
        tile.sprite.parentGroup = parentGroup;

        this.oneTreePerLine = true;
        return tile;
    }

    get isNextRowEmpty() {
        for (var i = 0; i < this.tileMap.length; i++) {
            if (this.tileMap[i].sprite.x > game.WIDTH)
                return false;
        }

        return true;
    }
}