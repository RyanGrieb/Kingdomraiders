import game from "index";
import AssetsEnum from "../assets/assetsenum";
import CustomSprite from "../../ui/custom/customsprite";

export default class Entity {

    constructor(type, x, y, w, h) {
        //Misc helper variables
        this.camera = game.getUI.getCurrentScreen.getCamera;

        //this.entityClass = entityClass;
        this.type = type;

        //Note: these this.x & y values are meant to display the true position of the entity /w out rotation offsets.
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        var screenX = (this.x + (this.camera.position.x - game.getPlayer.getX) - 21) + (w / 2);
        var screenY = (this.y + (this.camera.position.y - game.getPlayer.getY) - 21) + (h / 2);
        this.sprite = new CustomSprite(this.type.name, screenX, screenY, w, h);
        this.sprite.setGamePosition(x, y);

        this.sprite.customSprite.anchor.x = (type.anchorX === undefined) ? 0.5 : type.anchorX;
        this.sprite.customSprite.anchor.y = (type.anchorY === undefined) ? 0.5 : type.anchorY;

        this.allowRotate = true;
        this.rotation = 0;
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
        this.sprite.setWholePosition(this.sprite.x - camPosOffsetX, this.sprite.y - camPosOffsetY);
        //this.sprite.x -= camPosOffsetX;
        //this.sprite.y -= camPosOffsetY;
        //..



        //Camera rotation (Moves the sprite's around the player)

        if (this.rotation != rotation) {
            var radians = (Math.PI / 180) * (this.rotation - rotation);

            //Sprite rotatation offset
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var newX = (cos * (this.sprite.x - this.camera.position.x)) + (sin * (this.sprite.y - this.camera.position.y)) + this.camera.position.x;
            var newY = (cos * (this.sprite.y - this.camera.position.y)) - (sin * (this.sprite.x - this.camera.position.x)) + this.camera.position.y;

            this.sprite.setWholePosition(newX, newY);

            if (!this.allowRotate)
                this.sprite.customSprite.rotation -= (radians);

        }

        //..

        this.rotation = rotation;
    }

    setVelocity(x, y) {
        //Put somewhere else maybe?
        if (this.sprite.collider !== undefined) {
            this.sprite.collider.x += x;
            this.sprite.collider.y += y;
        }

        //Fake x,y for camera rotation offset.
        var rotation = game.getUI.getCurrentScreen.camera.rotation;
        var radians = (Math.PI / 180) * rotation;

        //Sprite rotatation offset
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Ofset the cos & sin
        var velX = (y * sin) + (-(x * cos));
        var velY = (y * cos) + (x * sin);

        var velocity = { x: x, y: y };

        if (this.sprite.collider !== undefined)
            velocity = this.checkCollision(velX, velY);

        this.sprite.setVelocity(-velocity.x, velocity.y);
    }


    checkCollision(x, y) {
        this.sprite.collider.collided = false;
        var velocity = { x: x, y: y };
        //Collision (TODO: SEPERATE METHOD)

        var tilesUpDown = [];
        var tilesLeftRight = [];

        for (var i = 0; i < 4; i++) {
            //Add all four corners of the collider.
            var colliderXOffset = (i == 0 || i == 2) ? (this.sprite.collider.x) : (this.sprite.collider.x + this.sprite.collider.w);
            var colliderYOffset = (i == 0 || i == 1) ? (this.sprite.collider.y) : (this.sprite.collider.y + this.sprite.collider.h);

            if (game.getTileGrid.getChunkFromLocation(this.sprite.getGamePositionX, this.sprite.getGamePositionY) !== undefined) {

                tilesUpDown.push(game.getTileGrid.getTileFromLocation(colliderXOffset, (colliderYOffset + velocity.y)));
                tilesLeftRight.push(game.getTileGrid.getTileFromLocation((colliderXOffset + velocity.x), colliderYOffset));
            }
        }

        for (var i = 0; i < tilesUpDown.length; i++)
            if (tilesUpDown[i].tileType.collision) {

                velocity.y = 0;
                this.sprite.collider.collided = true;
            }

        for (var i = 0; i < tilesLeftRight.length; i++)
            if (tilesLeftRight[i].tileType.collision) {

                velocity.x = 0;
                this.sprite.collider.collided = true;
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