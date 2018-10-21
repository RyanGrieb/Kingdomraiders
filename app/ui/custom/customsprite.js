import game from "index";
import UIObject from "./object/uiobject";
import AssetEnum from "../../world/assets/assetsenum";

export default class CustomSprite extends UIObject {

    //There are there (x,y) points in this class

    //this.customSprite.x: the real location of the sprite
    //this.x: the location of the sprite based off the camera
    //this.fakeX: the location the the sprite based off camera + rotation

    constructor(spriteName, x, y, w, h) {
        super(spriteName, x, y, w, h);

        //Sprite
        this.customSprite = new PIXI.Sprite(AssetEnum.getObjectFromName(spriteName).texture);
        this.customSprite.x = x;
        this.customSprite.y = y;
        this.customSprite.width = w;
        this.customSprite.height = h;


        game.stage.addChild(this.customSprite);

    }

    addCollision(xOffset, yOffset, width, height) {
        this.collider = {
            x: this.fakeX + xOffset,
            y: this.fakeY + yOffset,
            w: width,
            h: height,
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

        this.fakeX = x;
        this.fakeY = y;
    }

    setVelocity(x, y) {

        //Fake x,y for camera rotation offset.
        var rotation = game.getUI.getCurrentScreen.camera.rotation;
        var radians = (Math.PI / 180) * rotation;

        //Sprite rotatation offset
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Ofset the cos & sin
        var testX = ((y * sin) + (x * cos));
        var testY = ((y * cos) - (x * sin));

        //Collision

        var tilesUpDown = [];
        var tilesLeftRight = [];

        for (var i = 0; i < 4; i++) {
            //Add all four corners of the collider.
            var colliderXOffset = (i == 0 || i == 2) ? (this.collider.x) : (this.collider.x + this.collider.w);
            var colliderYOffset = (i == 0 || i == 1) ? (this.collider.y) : (this.collider.y + this.collider.h);

            if (game.getTileGrid.getChunkFromLocation(this.fakeX, this.fakeY) !== undefined) {
                
                tilesUpDown.push(game.getTileGrid.getTileFromLocation(colliderXOffset, (colliderYOffset + testY)));
                tilesLeftRight.push(game.getTileGrid.getTileFromLocation((colliderXOffset + testX), colliderYOffset));
            }
        }

        //var tileUpDown = game.getTileGrid.getTileFromLocation((this.collider.x), (this.collider.y + (testY)));
        // var tileLeftRight = game.getTileGrid.getTileFromLocation((this.collider.x + (testX)), (this.collider.y));
        //console.log((game.getPlayer.getX));
        for (var i = 0; i < tilesUpDown.length; i++)
            if (tilesUpDown[i].tileType.collision) {
                var tileY = tilesUpDown[i].y + 32;

                testY = 0;
                y = 0;
            }


        for (var i = 0; i < tilesLeftRight.length; i++)
            if (tilesLeftRight[i].tileType.collision) {
                //Find better way to tell which side of the tile we want
                //!!!!!!! maybe a method tile.getXFromSide(colliderX,colliderY)??????!!!!!!!!!!!!!!!!!
                var tileX = tilesLeftRight[i].x + 32

                testX = 0;
                x = 0;

                //TODO: find a way to seamlessly fix the collision gap with whats provided below.
                /*                
                testX = tileX - this.collider.x;
                x = tileX - this.x;
                */
            }


        this.collider.x += testX;
        this.collider.y += testY;
        this.fakeX += testX;
        this.fakeY += testY;

        //This is just without rotation offsets.
        this.x += x;
        this.y += y;
    }

    setInteractive() {
        return this.customSprite.setInteractive();
    }

    kill() {
        this.customSprite.destroy();
    }

    get getFakeX() {
        return this.fakeX;
    }

    get getFakeY() {
        return this.fakeY;
    }

    get baseSprite() {
        return this.customSprite;
    }

}