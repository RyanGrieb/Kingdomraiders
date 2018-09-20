import game from "index";
import TileChunk from "./tilechunk";

export default class TileGrid {
    constructor() {
        //Tilegrid container for PIXIJS performance optimization
        this.container = new PIXI.Container();
        game.stage.addChild(this.container);

        this.tileMap = [];

        //Handling chunkpasses
        this.previousChunk = null;
        //debug
        this.stopChunkRenderer = false;
        //..

        this.initMap(game.getPlayer.getX + game.getPlayer.w / 2, game.getPlayer.getY + game.getPlayer.h / 2);
    }


    initMap(x, y) {

        for (var targetX = (x - game.WIDTH / 2) - this.getChunkSize; targetX < x + (game.WIDTH / 2)
            + this.getChunkSize; targetX += this.getChunkSize)
            for (var targetY = ((y - game.HEIGHT / 2) - this.getChunkSize); targetY <= y + (game.HEIGHT / 2)
                + this.getChunkSize; targetY += this.getChunkSize)
                this.requestMapFromLocation(targetX, targetY);
    }


    renderChunksPass() {
        var x = game.getPlayer.getX;
        var y = game.getPlayer.getY;

        //If chunks aren't loaded in yet.
        if (this.getChunkFromLocation(x, y) == null)
            return;

        //Debug
        if (this.stopChunkRenderer == true)
            return;

        // If the map just loaded in..
        if (this.previousChunk == null)
            this.previousChunk = this.getChunkFromLocation(x, y);

        // The chunk were standing on
        var currentChunk = this.getChunkFromLocation(x, y);

        if (currentChunk != this.previousChunk) {

            // Right
            if (this.previousChunk.x - currentChunk.x < 0) {
                for (var targetY = this.previousChunk.y - (this.getChunkSize * 2);
                    targetY <= this.previousChunk.y + (this.getChunkSize * 2);
                    targetY += this.getChunkSize) {
                    if (this.getChunkFromLocation(currentChunk.x + (this.getChunkSize * 2), targetY) == null)
                        this.requestMapFromLocation(currentChunk.x + (this.getChunkSize * 2), targetY);

                    if (this.getChunkFromLocation(currentChunk.x + this.getChunkSize, targetY) == null)
                        this.requestMapFromLocation(currentChunk.x + this.getChunkSize, targetY);
                }
            }

            // Left
            if (this.previousChunk.x - currentChunk.x > 0) {
                for (var targetY = this.previousChunk.y - (this.getChunkSize * 2);
                    targetY <= this.previousChunk.y + (this.getChunkSize * 2);
                    targetY += this.getChunkSize) {
                    if (this.getChunkFromLocation(currentChunk.x - (this.getChunkSize * 2), targetY) == null)
                        this.requestMapFromLocation(currentChunk.x - (this.getChunkSize * 2), targetY);

                    if (this.getChunkFromLocation(currentChunk.x - this.getChunkSize, targetY) == null)
                        this.requestMapFromLocation(currentChunk.x - this.getChunkSize, targetY);
                }

            }

            // Top
            if (this.previousChunk.y - currentChunk.y > 0) {
                for (var targetX = currentChunk.x - (this.getChunkSize * 2);
                    targetX <= currentChunk.x + (this.getChunkSize * 2);
                    targetX += this.getChunkSize) {
                    //Renders 2 chunks ahead (since we reduced chunksizes from 30 to 15.)
                    if (this.getChunkFromLocation(targetX, currentChunk.y - (this.getChunkSize * 2)) == null)
                        this.requestMapFromLocation(targetX, currentChunk.y - (this.getChunkSize * 2));

                    if (this.getChunkFromLocation(targetX, currentChunk.y - this.getChunkSize) == null)
                        this.requestMapFromLocation(targetX, currentChunk.y - this.getChunkSize);
                }
            }

            // Down
            if (this.previousChunk.y - currentChunk.y < 0) {
                for (var targetX = currentChunk.x - (this.getChunkSize * 2);
                    targetX <= currentChunk.x + (this.getChunkSize * 2);
                    targetX += this.getChunkSize) {
                    if (this.getChunkFromLocation(targetX, currentChunk.y + (this.getChunkSize * 2)) == null)
                        this.requestMapFromLocation(targetX, currentChunk.y + (this.getChunkSize * 2));

                    if (this.getChunkFromLocation(targetX, currentChunk.y + this.getChunkSize) == null)
                        this.requestMapFromLocation(targetX, currentChunk.y + this.getChunkSize);
                }
            }

            this.previousChunk = currentChunk;

        }
    }

    requestMapFromLocation(x, y) {

        var msg = {
            type: "ChunkRequest",
            x: x / 32,
            y: y / 32,
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
        //console.log("requested chunk at: " + x + "," + y);
    }

    async receiveChunk(json) {
        setTimeout(() => {


            var chunk = [];

            chunk = String(json.chunk).split(",");
            var tileChunk = new TileChunk(chunk, json.x * 32, json.y * 32);
            //TODO: do something with the toplayer..

            //Do this w/ asynchronus delay.
            this.tileMap.push(tileChunk)

            //was 75 20
        }, Math.floor(Math.random() * 210) + 15);
    }

    getChunkFromLocation(x, y) {
        for (var i = 0; i < this.tileMap.length; i++) {
            if (x >= this.tileMap[i].x && x < this.tileMap[i].x + (this.getChunkSize))
                if (y >= this.tileMap[i].y && y < this.tileMap[i].y + (this.getChunkSize))
                    return this.tileMap[i];
        }
    }

    clearObjects() {
        for (var i = 0; i < this.tileMap.length; i++)
            this.tileMap[i].kill();

        this.tileMap = [];
    }

    update() {
        //Handle chunk passes
        this.renderChunksPass();

        //Handle removing chunks
        for (var i = 0; i < this.tileMap.length; i++)
            if (this.tileMap[i].outsideScreen) {
                this.tileMap[i].kill();
                this.tileMap.splice(i, 1);
            }

        //For offseting the map w/ camera
        for (var i = 0; i < this.tileMap.length; i++)
            this.tileMap[i].update();
    }

    get getScaledChunkSize() {
        return 15;
    }

    get getChunkSize() {
        return this.getScaledChunkSize * 32;
    }
}