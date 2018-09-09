import game from "index";
import TileChunk from "./tilechunk";

//const CHUNKSIZE = 30 * 32;// 16
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

export default class TileGrid {
    constructor() {
        //Tilegrid container for PIXIJS performance optimization
        this.container = new PIXI.Container();
        game.stage.addChild(this.container);

        this.tileMap = [];

        this.minBorder = {};
        this.maxBorder = {};
        for (var i = 0; i < 8; i++)
            this.requestMapFromLocation((game.getPlayer.getX / 32) + (i * (30)), game.getPlayer.getY / 32);
        //this.initMap(game.getPlayer.x + game.getPlayer.w / 2, game.getPlayer.y + game.getPlayer.h / 2);
    }

    initMap(x, y) {
        for (var targetX = (x - WIDTH / 2) - this.getChunkSize; targetX < x + (WIDTH / 2)
            + this.getChunkSize; targetX += this.getChunkSize)
            for (var targetY = ((y - HEIGHT / 2) - this.getChunkSize); targetY < y + (HEIGHT / 2)
                + this.getChunkSize; targetY += this.getChunkSize)
                this.requestMapFromLocation(targetX, targetY);

        // Sets our min/max chunk borders when we load in...
        this.minBorder.x = x - (WIDTH / 2) - this.getChunkSize;
        this.minBorder.y = y - (HEIGHT / 2) - this.getChunkSize;

        this.maxBorder.x = x + (WIDTH / 2) + this.getChunkSize;
        this.maxBorder.y = y + (HEIGHT / 2) + this.getChunkSize;
    }

    requestMapFromLocation(x, y) {

        var msg = {
            type: "ChunkRequest",
            x: x,
            y: y,
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
        console.log("requested chunk at: " + x + "," + y);
    }

    receiveChunk(json) {
        var chunk = [];

        chunk = String(json.chunk).split(",");
        var tileChunk = new TileChunk(chunk, json.x * 32, json.y * 32);
        //TODO: do something with the toplayer..

        this.tileMap.push(tileChunk);
    }

    update() {
        //Offset map w/ camera..
        for (var i = 0; i < this.tileMap.length; i++)
            this.tileMap[i].update();
    }

    get getScaledChunkSize() {
        return 30;
    }

    get getChunkSize() {
        return this.getScaledChunkSize * 32;
    }
}