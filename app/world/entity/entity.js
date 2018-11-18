import game from "index";
import AssetsEnum from "../assets/assetsenum";
import CustomSprite from "../../ui/custom/customsprite";

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

    setPosition(x, y) {
        //Set the custom sprite position /w screenX&Y..
        var screenPosition = this.getScreenPosition(x, y);
        this.sprite.setPosition(screenPosition.x, screenPosition.y);

        //Set our gameX&Y values.
        this.x = x;
        this.y = y;

        if (this.collider !== undefined) {
            this.collider.x = x + this.collider.xOffset;
            this.collider.y = y + this.collider.yOffset;
        }
    }

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



        //Camera rotation (Moves the sprite's around the player)

        if (this.rotation != rotation) {
            var radians = (Math.PI / 180) * (this.rotation - rotation);

            //Sprite rotatation offset
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var newX = (cos * (this.sprite.customSprite.x - this.camera.position.x)) + (sin * (this.sprite.customSprite.y - this.camera.position.y)) + this.camera.position.x;
            var newY = (cos * (this.sprite.customSprite.y - this.camera.position.y)) - (sin * (this.sprite.customSprite.x - this.camera.position.x)) + this.camera.position.y;

            this.sprite.setPosition(newX, newY);

            if (!this.allowRotate)
                this.sprite.customSprite.rotation -= (radians);

        }

        //..

        this.rotation = rotation;
    }


    checkCollision(x, y) {
        this.collider.collided = false;
        var velocity = { x: x, y: y };
        //Collision (TODO: SEPERATE METHOD)

        var tilesUpDown = [];
        var tilesLeftRight = [];

        for (var i = 0; i < 4; i++) {
            //Add all four corners of the collider.
            var colliderXOffset = (i == 0 || i == 2) ? (this.collider.x) : (this.collider.x + this.collider.w);
            var colliderYOffset = (i == 0 || i == 1) ? (this.collider.y) : (this.collider.y + this.collider.h);

            if (game.getTileGrid.getChunkFromLocation(this.x, this.y) !== undefined) {

                tilesUpDown.push(game.getTileGrid.getTileFromLocation(colliderXOffset, (colliderYOffset + velocity.y)));
                tilesLeftRight.push(game.getTileGrid.getTileFromLocation((colliderXOffset + velocity.x), colliderYOffset));
            }
        }
        //Todo: remove the repating things.
        for (var i = 0; i < tilesUpDown.length; i++)
            if (tilesUpDown[i] instanceof Entity) {
                velocity.y = 0;
                this.collider.collided = true;
            }
            else
                if (tilesUpDown[i] !== undefined)
                    if (tilesUpDown[i].tileType.collision) {

                        velocity.y = 0;
                        this.collider.collided = true;

                    }

        for (var i = 0; i < tilesLeftRight.length; i++)
            if (tilesLeftRight[i] instanceof Entity) {
                velocity.x = 0;
                this.collider.collided = true;
            }
            else
                if (tilesLeftRight[i] !== undefined)
                    if (tilesLeftRight[i].tileType.collision) {

                        velocity.x = 0;
                        this.collider.collided = true;

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

    kill() {
        this.sprite.kill();
    }

    update() {
        this.setCameraPivot(this.camera.rotation, this.camera.pivot.x, this.camera.pivot.y);
        this.removeOutsideofScreen();
    }
}