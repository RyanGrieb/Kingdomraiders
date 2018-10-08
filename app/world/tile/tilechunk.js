import game from "index";

import Tile from "./tile";
import TileType from "./tiletype";

export default class TileChunk {
    constructor(chunk, x, y) {

        //Misc helper variables
        this.camera = game.getUI.getCurrentScreen.getCamera;

        //Start of the main body
        this.container = new PIXI.Container();

        this.tiles = [];
        this.x = x;
        this.y = y;
        this.rotation = 0;

        this.initTiles(chunk);


        //Now merge everything into an individual sprite
        var renderer = game.renderer;
        var texture = renderer.generateTexture(this.container);

        this.combinedSprite = new PIXI.Sprite(texture);

        //21 is playerspite size, remember.. (+21 or - idk.. probally -)
        this.combinedSprite.x = this.x + (this.camera.position.x - game.getPlayer.getX) - 21;
        this.combinedSprite.y = this.y + (this.camera.position.y - game.getPlayer.getY) - 21;

        //For debugging purposes
        this.combinedSprite.interactive = true;

        this.combinedSprite.on('pointerover', () => {
           // this.combinedSprite.tint = Math.random() * 0xFFFFFF;
        });
        //..

        game.stage.addChild(this.combinedSprite);

        //..
    }

    onMouseOut() {
        this.combinedSprite.tint = 0xFFFFFF;
    }

    initTiles(chunk) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < chunk.length; i++) {
            if (i % 15 == 0) {
                x = 0;
                y--;
            }

            //Don't create a tile that is not there
            // if (chunk[i] == -1) {
            //     x++;
            //      continue;
            // }

            //TODO: make the tile use this.container instead.
            this.tiles[i] = new Tile(this.container, TileType.getTileFromID(chunk[i]), this.x + (x * 32), this.y + (y * 32) + 32);

            x++;
        }
    }

    setCameraPivot(rotation, x, y) {

        //Move the sprite based on camera location
        var differenceInDistanceX = game.getPlayer.getX - x;
        var differenceInDistanceY = game.getPlayer.getY - y;

        var radians = (Math.PI / 180) * (this.rotation);

        //Sprite rotatation offset
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);


        var camPosOffsetX = (cos * differenceInDistanceX) - (sin * differenceInDistanceY);
        var camPosOffsetY = (cos * differenceInDistanceY) + (sin * differenceInDistanceX);

        //For some reason, the x axis is moving 

        this.combinedSprite.x -= camPosOffsetX;
        this.combinedSprite.y -= camPosOffsetY;
        //..



        //Sprite Rotation (Rotate the sprite around the player)
        this.combinedSprite.rotation = (Math.PI / 180) * (rotation);

        //Sprite rotation offset
        if (this.rotation != rotation) {
            var radians = (Math.PI / 180) * (this.rotation - rotation);

            //Sprite rotatation offset
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var newX = (cos * (this.combinedSprite.x - this.camera.position.x)) + (sin * (this.combinedSprite.y - this.camera.position.y)) + this.camera.position.x;
            var newY = (cos * (this.combinedSprite.y - this.camera.position.y)) - (sin * (this.combinedSprite.x - this.camera.position.x)) + this.camera.position.y;

            this.combinedSprite.x = newX;
            this.combinedSprite.y = newY;


            this.rotation = rotation;
        }

        //..
    }

    get outsideScreen() {
        //Moving right
        if (game.getPlayer.getX > this.x + (game.getTileGrid.getChunkSize * 3))
            return true;

        //Moving left
        if ((game.getTileGrid.getChunkSize) < (this.x - game.getPlayer.getX) / 2)
            return true;

        //Moving up
        if ((game.getTileGrid.getChunkSize) < (this.y - game.getPlayer.getY) / 2)
            return true;

        //Moving down
        if (game.getPlayer.getY > this.y + (game.getTileGrid.getChunkSize * 3))
            return true;

        return false;
    }

    kill() {
        this.combinedSprite.destroy();
    }

    update() {
        //Updates the tiles to be offset from the camera.
        this.setCameraPivot(this.camera.rotation, this.camera.pivot.x, this.camera.pivot.y);
    }
}