import game from "index";
import TileChunk from "../../world/tile/tilechunk";
import Tile from "../../world/tile/tile";
import TileType from "../../world/tile/tiletype";

export default class MenuOverlay {

    constructor() {
        this.tileMap = [];

        this.initChunks();
    }

    initChunks() {

        var x = game.WIDTH / 2;
        var y = game.HEIGHT / 2;

        for (var y = -this.getChunkSize / 2; y < game.HEIGHT + this.getChunkSize * 2; y += 15 * 32)
            for (var x = 0; x < game.WIDTH + this.getChunkSize * 2; x += 15 * 32) {
                this.tileMap.push(new TileContainer(x, y));
            }
    }

    clearObjects() {
        for (var i = 0; i < this.tileMap.length; i++) {
            this.tileMap[i].combinedSprite.destroy();
            this.tileMap[i].container.destroy();
            this.tileMap[i].topContainer.destroy();
        }
        this.tileMap = [];
    }

    update() {
        //Move the chunks to the left
        for (var i = 0; i < this.tileMap.length; i++) {
            this.tileMap[i].combinedSprite.x--;
            this.tileMap[i].topContainer.x--;
            this.tileMap[i].x--;
        }

        //Add sliding chunks at the far right
        if (this.getTileContainerFromLocation(game.WIDTH + this.getChunkSize * 2, 0) === undefined)
            for (var y = 0; y < game.HEIGHT + this.getChunkSize * 2; y += 15 * 32)
                this.tileMap.push(new TileContainer(game.WIDTH + this.getChunkSize * 2, y));

        //Remove the chunks at the far left
        if (this.getTileContainerFromLocation(-this.getChunkSize * 2, 0) !== undefined) {

            for (var y = 0; y < game.HEIGHT + this.getChunkSize * 2; y += 15 * 32) {
                var tileContainer = this.getTileContainerFromLocation(-this.getChunkSize * 2, y);
                tileContainer.combinedSprite.destroy();
                tileContainer.container.destroy();
                tileContainer.topContainer.destroy();
                for (var i = 0; i < this.tileMap.length; i++)
                    if (this.tileMap[i] === tileContainer)
                        this.tileMap.splice(i, 1);

            }
        }
    }

    getTileContainerFromLocation(x, y) {
        for (var i = 0; i < this.tileMap.length; i++) {
            var tileContainer = this.tileMap[i];
            if (x < (tileContainer.x + tileContainer.w) && (x + 32) > tileContainer.x)
                if (y < (tileContainer.y + tileContainer.h) && (y + 32) > tileContainer.y)
                    return tileContainer;
        }

        return undefined;
    }

    get getScaledChunkSize() {
        return 15;
    }

    get getChunkSize() {
        return this.getScaledChunkSize * 32;
    }
}

//Dumbed down Tilechunk class
class TileContainer {
    constructor(x, y) {
        this.tiles = [];
        this.topTiles = [];
        this.container = new PIXI.Container();
        this.topContainer = new PIXI.Container();

        //Basic information variables
        this.x = x;
        this.y = y;
        this.w = 15 * 32;
        this.h = 15 * 32;
        const treeAmount = 4;

        //Tile initalization
        this.initTiles();

        //Add random brush
        this.addBrush();

        //Add trees
        this.addTrees(treeAmount);

        //Now merge everything into an individual sprite
        var renderer = game.renderer;
        var texture = renderer.generateTexture(this.container);

        this.combinedSprite = new PIXI.Sprite(texture);
        this.combinedSprite.parentGroup = game.getUI.parentGroup.negative3;
        this.combinedSprite.x = x;
        this.combinedSprite.y = y;
        //this.combinedSprite.tint = Math.random() * 0xFFFFFF;
        //this.combinedSprite.tint = 0xD9FFFFFF;

        game.stage.addChild(this.combinedSprite);
        game.stage.addChild(this.topContainer);
    }

    initTiles() {
        for (var yOffset = 0; yOffset < 15; yOffset++)
            for (var xOffset = 0; xOffset < 15; xOffset++) {
                let tile = new Tile(this.container, TileType.list.GRASS, this.x + (xOffset * 32), this.y + (yOffset * 32));
                tile.sprite.parentGroup = game.getUI.parentGroup.negative3;
                this.tiles.push(tile);
            }
    }

    addBrush() {
        for (var yOffset = 0; yOffset < 15; yOffset++)
            for (var xOffset = 0; xOffset < 15; xOffset++) {

                var randomTileType = this.getRandomTileType;
                if (randomTileType === undefined)
                    continue;

                let tile = new Tile(this.container, randomTileType, this.x + (xOffset * 32), this.y + (yOffset * 32));
                tile.sprite.parentGroup = game.getUI.parentGroup.negative2;
                this.tiles.push(tile);
            }
    }

    addTrees(treeAmount) {
        for (var i = 0; i < treeAmount; i++) {
            this.recursiveAddTree();
        }
    }

    //Attemts to seperate the trees recursivly.
    recursiveAddTree() {
        var randNum = Math.floor((Math.random() * 2));
        var tileType = randNum === 0 ? TileType.list.BIGTREE : TileType.list.BIGTREEOTHER;

        var randomX = Math.floor(Math.random() * ((this.x + this.w - tileType.width) - this.x + 1) + this.x);
        var randomY = Math.floor(Math.random() * ((this.y + this.h - tileType.height) - this.y + 1) + this.y);

        //Checks if our random locations collides /w an existing tree, if it does, recursivley try again
        for (var i = 0; i < this.topTiles.length; i++) {
            var topTile = this.topTiles[i];
            if (randomX < (topTile.x + topTile.tileType.width) && (randomX + tileType.width) > topTile.x)
                if (randomY < (topTile.y + topTile.tileType.height) && (randomY + tileType.height) > topTile.y) {
                    this.recursiveAddTree();
                    return;
                }
        }

        let tile = new Tile(this.topContainer, tileType, randomX, randomY);
        tile.sprite.parentGroup = game.getUI.parentGroup.negative2;
        this.topTiles.push(tile);
    }

    get getRandomTileType() {
        var randomNum = Math.floor((Math.random() * 100));
        switch (true) {
            case randomNum <= 2:
                return TileType.list.YELLOWFLOWER;

            case randomNum > 2 && randomNum <= 5:
                return TileType.list.BLUEFLOWER;

            case randomNum > 5 && randomNum <= 20:
                return TileType.list.BRUSH;
        }

        return undefined;
    }

}