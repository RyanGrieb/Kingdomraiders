import game from "index";
import AssetsEnum from "../assets/assetsenum";
import CustomSprite from "../../ui/custom/customsprite";
import Tile from "../tile/tile";
import CustomText from "../../ui/custom/customtext";

export default class Entity {

    constructor(type, x, y, w, h) {
        //Misc helper variables
        this.camera = game.getUI.getCurrentScreen.getCamera;

        //this.entityClass = entityClass;
        this.type = type;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        var screenPosition = this.getScreenPosition(this.x, this.y);
        this.sprite = new CustomSprite(this.type.name, screenPosition.x, screenPosition.y, this.w, this.h);
        this.sprite.setAnchor(type.anchorX, type.anchorY);
        this.label = undefined;

        this.allowRotate = true;
        this.rotation = 0;
    }


    addCollision(xOffset, yOffset, width, height) {
        this.collider = {
            xOffset: xOffset,
            yOffset: yOffset,
            x: this.x + xOffset,
            y: this.y + yOffset,
            w: width,
            h: height,
            collided: false,
        }
    }

    addLabel(text) {
        if (this.label === undefined) { //subtract it by the height /
            this.label = new CustomText(this.type.name + "Label", text, "#ffffff", this.sprite.customSprite.x, this.sprite.customSprite.y - (this.h - 7), 100, 100);
            this.label.setParentGroup(game.getUI.parentGroup.positive3);
        }
    }

    removeLabel() {
        if (this.label !== undefined) {
            this.label.kill();
            this.label = undefined;
        }
    }

    setPosition(x, y) {
        //Set the custom sprite position /w screenX&Y..
        var screenPosition = this.getScreenPosition(x, y);
        this.sprite.setPosition(screenPosition.x, screenPosition.y);

        //Set our gameX&Y values.
        this.setClientsidePosition(x, y);
    }

    //Doesnt change the actual sprite position
    setClientsidePosition(x, y) {
        //Set our gameX&Y values.
        this.x = x;
        this.y = y;

        if (this.collider !== undefined) {
            this.collider.x = x + this.collider.xOffset;
            this.collider.y = y + this.collider.yOffset;
        }

        if (this.label !== undefined) {
            this.label.setPosition(x, y);
        }
    }

    //Kindof a static method, not sure what to do with it.
    getScreenPosition(x, y) {
        var screenX = (x + (this.camera.position.x - game.getPlayer.getX) - 21) + (this.w / 2);
        var screenY = (y + (this.camera.position.y - game.getPlayer.getY) - 21) + (this.h / 2);

        return { x: screenX, y: screenY };
    }

    setGameVelocity(x, y) {
        this.x += x;
        this.y += y;

        if (this.collider !== undefined) {
            this.collider.x += x;
            this.collider.y += y;
        }

        if (this.label !== undefined) {
            this.label.setPosition(this.label.x + x, this.label.y + y);
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
        this.sprite.setVelocity(-camPosOffsetX, -camPosOffsetY);

        // if (this.label !== undefined)
        //     this.label.setVelocity(-camPosOffsetX, -camPosOffsetY);



        //Camera rotation (Moves the sprite's around the player)

        if (this.rotation != rotation) {
            var radians = (Math.PI / 180) * (this.rotation - rotation);

            //Sprite rotatation offset
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            let newX = (cos * (this.sprite.customSprite.x - this.camera.position.x)) + (sin * (this.sprite.customSprite.y - this.camera.position.y)) + this.camera.position.x;
            let newY = (cos * (this.sprite.customSprite.y - this.camera.position.y)) - (sin * (this.sprite.customSprite.x - this.camera.position.x)) + this.camera.position.y;

            this.sprite.setPosition(newX, newY);

            //Label pivot
            if (this.label !== undefined) {
                // this.label.setPosition(newX - this.label.customText.width / 2, newY - this.h);
            }


            if (!this.allowRotate)
                this.sprite.customSprite.rotation -= (radians);

        }

        //Reset the label position to mirror the entity
        if (this.label !== undefined) {
            this.label.setPosition(this.sprite.customSprite.x - (this.label.customText.width / 2), this.sprite.customSprite.y - (this.h - 7));
        }

        this.rotation = rotation;
    }

    checkCollision(velX, velY) {
        this.collider.collided = false;
        var velocity = { x: velX, y: velY };

        //Problem: get tile from locations incorretly returns the entity ontop of others tiles
        //Solution: Have the get tile from location return an array of tiles & entities.

        //Scans surrounding tiles based on width&height.
        for (var cX = -this.w * 2; cX < this.w * 2; cX += 32)
            for (var cY = -this.h * 2; cY < this.h * 2; cY += 32) {

                var tiles = game.getTileGrid.getTileFromLocation((this.x + cX), (this.y + cY));
                if (tiles === undefined)
                    continue;

                for (var i = 0; i < tiles.length; i++) {
                    var tile = tiles[i];
                    //Determine if we use a collider or not. (Kindaof a shitty way to check but more organized).
                    var tileX = (tile.collider === undefined) ? tile.x : tile.collider.x;
                    var tileY = (tile.collider === undefined) ? tile.y : tile.collider.y;
                    var tileW = (tile.collider === undefined) ? tile.w : tile.collider.w;
                    var tileH = (tile.collider === undefined) ? tile.h : tile.collider.h;

                    var isProjectile = this.type.name.includes("PROJECTILE");

                    //If we collided to the left/right.
                    if (this.collider.x + velX < (tileX + tileW) && (this.collider.x + this.collider.w + velX) > tileX)
                        if (this.collider.y < (tileY + tileH) && (this.collider.y + this.collider.h) > tileY) {

                            if (tile instanceof Entity) {
                                velocity.entity = tile;
                                velocity.x = 0;
                                this.collider.collided = true;
                                break;
                            } else
                                if (tile.tileType.collision || (!isProjectile && tile.tileType.collision === undefined)) { //If it's a normal tile, make sure to check if we allow collision on it?
                                    velocity.x = 0;
                                    this.collider.collided = true;
                                    break;
                                }
                        }
                        else //If we collided top & bottom
                            if (this.collider.x < (tileX + tileW) && (this.collider.x + this.collider.w) > tileX)
                                if (this.collider.y + velY < (tileY + tileH) && (this.collider.y + this.collider.h + velY) > tileY) {

                                    if (tile instanceof Entity) {
                                        velocity.entity = tile;
                                        velocity.y = 0;
                                        this.collider.collided = true;
                                        break;
                                    } else
                                        if (tile.tileType.collision || (!isProjectile && tile.tileType.collision === undefined)) { //If it's a normal tile, make sure to check if we allow collision on it?
                                            velocity.y = 0;
                                            this.collider.collided = true;
                                            break;
                                        }
                                }

                }
            }

        return velocity;
    }

    removeOutsideofScreen() {
        //Should probally remove sprite... & from list..
        if (Math.abs(game.getPlayer.getX - this.x) >= game.WIDTH
            || Math.abs(game.getPlayer.getY - this.y) >= game.WIDTH)
            this.sprite.visible = false;
        else if (this.sprite.visible === false)
            this.sprite.visible = true;
    }

    get getWidth() {
        return this.w;
    }

    get getHeight() {
        return this.h;
    }

    kill() {
        this.sprite.kill();
        this.removeLabel();
        this.collider = undefined;
    }

    update() {
        this.setCameraPivot(this.camera.rotation, this.camera.pivot.x, this.camera.pivot.y);
        this.removeOutsideofScreen();
    }
}