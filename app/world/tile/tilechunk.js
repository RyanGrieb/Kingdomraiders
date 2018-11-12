import game from "index";

import Tile from "./tile";
import TileType from "./tiletype";
import EntityType from "../entity/entitytype";
import Entity from "../entity/entity";

export default class TileChunk {
    constructor(chunk, topChunk, x, y) {
        //console.log(topChunk);
        //Misc helper variables
        this.camera = game.getUI.getCurrentScreen.getCamera;

        //Start of the main body
        this.container = new PIXI.Container();

        this.tiles = [];
        this.topEntities = [];


        this.x = x;
        this.y = y;
        this.rotation = 0;

        this.initTiles(chunk, topChunk);



        //Now merge everything into an individual sprite
        var renderer = game.renderer;
        var texture = renderer.generateTexture(this.container);

        this.combinedSprite = new PIXI.Sprite(texture);

        //21 is playerspite size, remember.. (+21 or - idk.. probally -)
        //!!!!!!!!!!BUG HERE THIS.CAMERA IS UNDEFINED SOMETIMES DURING LAG
        this.combinedSprite.x = this.x + (this.camera.position.x - game.getPlayer.getX) - 21;
        this.combinedSprite.y = this.y + (this.camera.position.y - game.getPlayer.getY) - 21;

        //For debugging purposes
        this.combinedSprite.interactive = true;

        this.combinedSprite.on('pointerover', () => {
            if (game.getPlayer.playerSettings.getSetting("chunkDebug"))
                this.combinedSprite.tint = Math.random() * 0xFFFFFF;
        });
        //..

        game.stage.addChild(this.combinedSprite);

        //..
    }

    onMouseOut() {
        this.combinedSprite.tint = 0xFFFFFF;
    }

    mergeChunkSprites() {

    }

    initTiles(chunk, topChunk) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < chunk.length; i++) {
            if (i % 15 == 0) {
                x = 0;
                y--;
            }

            this.tiles[i] = new Tile(this.container, TileType.getTileFromID(chunk[i]), this.x + (x * 32), this.y - (y * 32) - 32);


            //Adding top tile..
            if (topChunk[i] != -1) {
                var tileType = TileType.getTileFromID(topChunk[i]);

                //If we add a new id & the updated id isn't a entity object...
                if (tileType.replace === undefined) {
                    game.getPlayer.buildMode.sendBuildRequest(this.x + (x * 32), this.y - (y * 32) - 32, TileType.list.ERROR);
                    continue;
                }

                //Make a better way to do this...
                var entityType = {
                    name: "TILE_" + tileType.name,
                    anchorX: (tileType.anchorX === undefined) ? 0.5 : tileType.anchorX,
                    anchorY: (tileType.anchorY === undefined) ? 0.5 : tileType.anchorY,
                }

                var entity = new Entity(entityType, this.x + (x * 32), this.y - (y * 32) - 32, tileType.width, tileType.height);
                entity.allowRotate = tileType.rotate;
                entity.sprite.customSprite.parentGroup = game.getUI.getParentGroupFromNumber(tileType.group);

                if (tileType.collider !== undefined) {
                    entity.addCollision(tileType.collider.x, tileType.collider.y, tileType.collider.w, tileType.collider.h);
                    entity.setPosition(entity.x - tileType.collider.x, entity.y - tileType.collider.y);
                }


                this.topEntities.push(entity);
            }


            x++;
        }
    }

    replaceTiles(chunk) {
        for (var i = 0; i < this.tiles.length; i++)
            this.tiles[i].kill();
        this.tiles = [];
        game.stage.removeChild(this.combinedSprite);

        this.initTiles(chunk);

        var texture = game.renderer.generateTexture(this.container);
        var x = this.combinedSprite.x;
        var y = this.combinedSprite.y;
        this.combinedSprite = new PIXI.Sprite(texture);

        //Now merge everything into an individual sprite
        var renderer = game.renderer;
        var texture = renderer.generateTexture(this.container);

        this.combinedSprite = new PIXI.Sprite(texture);

        //21 is playerspite size, remember.. (+21 or - idk.. probally -)
        this.combinedSprite.x = this.x + (this.camera.position.x - game.getPlayer.getX) - 21;
        this.combinedSprite.y = this.y + (this.camera.position.y - game.getPlayer.getY) - 21;
        game.stage.addChild(this.combinedSprite);
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


    //Figure out why I need to subtract 64 to get the correct position
    getTileFromLocation(x, y) {
        //Top Tiles
        for (var i = 0; i < this.topEntities.length; i++)
            if (this.topEntities[i].collider !== undefined) {
                if (x > this.topEntities[i].collider.x && x < this.topEntities[i].collider.x + this.topEntities[i].collider.w &&
                    y > this.topEntities[i].collider.y && y < this.topEntities[i].collider.y + this.topEntities[i].collider.h)
                    return this.topEntities[i];
            }

        //Bottom Tiles
        for (var i = 0; i < this.tiles.length; i++) {
            if (Math.abs(x - this.tiles[i].x) < 32 && Math.abs(y - this.tiles[i].y) < 32)
                return this.tiles[i];
        }


        return undefined;
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
        for (var i = 0; i < this.topEntities.length; i++)
            this.topEntities[i].kill();

        this.topEntities = [];
        this.tiles = [];

        this.combinedSprite.destroy({ texture: true, baseTexture: true });
        this.container.destroy({ texture: true, baseTexture: true });
    }

    update() {
        //Updates the tiles to be offset from the camera.
        this.setCameraPivot(this.camera.rotation, this.camera.pivot.x, this.camera.pivot.y);

        for (var i = 0; i < this.topEntities.length; i++)
            this.topEntities[i].update();
    }
}