import game from "index";

import Entity from "../entity";
import AssetEnum from "../../assets/assetsenum";
import { setTimeout } from "timers";
import { togglePauseAll } from "pixi-sound";
import CustomSprite from "../../../ui/custom/customsprite";
import Player from "../../../player/player";
import MPPlayer from "../../../player/mpplayer/mpplayer";

export default class Monster extends Entity {
    constructor(monsterID, type, health, x, y) {
        type.anchorX = 0.5;
        type.anchorY = 0.5;
        var w = type.w;
        var h = type.h;
        super(type, x, y, w, h);

        this.addEntityShoot("Monster", this);

        //Healthbars
        this.health = health;

        var screenPosition = this.getScreenPosition(this.x, this.y);
        this.healthbarBackground = new CustomSprite("RED_HEALTHBAR", screenPosition.x, screenPosition.y, this.w, 5);
        this.healthbarBackground.setAnchor(0.5, this.h / 8);
        this.healthbar = new CustomSprite("GREEN_HEALTHBAR", screenPosition.x - this.w / 2, screenPosition.y, this.w, 5);
        this.healthbar.setAnchor(0, this.h / 8);
        this.setHealth(this.health);

        this.monsterID = monsterID;

        this.sprite.setParentGroup(game.getUI.parentGroup.positive3);
        this.healthbarBackground.setParentGroup(game.getUI.parentGroup.positive3);
        this.healthbar.setParentGroup(game.getUI.parentGroup.positive3);

        if (type.animation !== undefined) {
            this.sprite.setAnimation(type.animation.tick, type.animation.cycles);
        }

        this.targetX = undefined;
        this.targetY = undefined;
    }

    //Recieve the order to track a player. (We don't look for the player clientside using our position due to latency).
    setTarget(x, y) {
        this.targetX = x;
        this.targetY = y;
        //Check if the distance is a lot (40 min)
        //console.log(x - this.x);
        // this.setPosition(x, y);
    }

    stopTracking(json) {
        //Our final target.
        this.targetX = json.x;
        this.targetY = json.y;
        //this.finalTargetX = json.x;
        //this.finalTargetY = json.y;
        console.log("called")
        game.getEntityMap.projectileManager.removeShooter("Monster", this.monsterID);
    }

    trackTarget() {

        //game.getEntityMap.projectileManager.setTargetOfEntity("Monster", this.monsterID, this.targetX, this.targetY);

        var distanceX = (this.targetX - this.x);
        var distanceY = (this.targetY - this.y);

        var hypotnuse = Math.sqrt(((distanceX * distanceX) + (distanceY * distanceY)));

        if (hypotnuse === 0)
            return;


        distanceX = (distanceX / hypotnuse);
        distanceY = (distanceY / hypotnuse);

        if (hypotnuse < -this.type.stats.speed || hypotnuse > this.type.stats.speed) {
            var velX = distanceX * this.type.stats.speed;
            var velY = distanceY * this.type.stats.speed;

            //Fake x,y for camera rotation offset.
            var radians = (Math.PI / 180) * this.camera.rotation;

            //Sprite rotatation offset
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);

            //Ofset the cos & sin
            var velXOffset = (velY * sin) + (-(velX * cos));
            var velYOffset = (velY * cos) + (velX * sin);

            //Set set our gameX&Y without our rotate offset.
            this.setGameVelocity(velX * game.ticker.deltaTime, velY * game.ticker.deltaTime);

            velXOffset *= game.ticker.deltaTime;
            velYOffset *= game.ticker.deltaTime;

            //But for our screenX&Y, we apply our offset values.
            this.sprite.setVelocity(-velXOffset, velYOffset);
            this.healthbar.setVelocity(-velXOffset, velYOffset);
            this.healthbarBackground.setVelocity(-velXOffset, velYOffset);
        } else {

        }

        //console.log(Math.round(this.x) + "," + Math.round(this.y));
    }

    setHealth(amount) {
        var maxHealth = this.type.stats.health;
        this.health -= amount;
        var newWidth = (this.w * (amount / maxHealth));
        this.healthbar.customSprite.width = newWidth;
    }

    //Normal set camera pivot but just for our extra healthbar.
    setCameraPivot(rotation, x, y) {

        //Camera rotation (Moves the sprite's around the player) (Called first since we still need to modify rotation for other things.)
        if (this.rotation != rotation) {
            var radians = (Math.PI / 180) * (this.rotation - rotation);
            //Sprite rotatation offset
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var newXAroundCamera = (cos * (this.sprite.customSprite.x - this.camera.position.x)) + (sin * (this.healthbar.customSprite.y - this.camera.position.y)) + this.camera.position.x;
            var newYAroundCamera = (cos * (this.healthbar.customSprite.y - this.camera.position.y)) - (sin * (this.sprite.customSprite.x - this.camera.position.x)) + this.camera.position.y;

            this.healthbarBackground.setPosition(newXAroundCamera, newYAroundCamera);
            this.healthbar.setPosition(newXAroundCamera - this.w / 2, newYAroundCamera);
        }

        super.setCameraPivot(rotation, x, y);

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
        this.healthbarBackground.setVelocity(-camPosOffsetX, -camPosOffsetY);
        this.healthbar.setVelocity(-camPosOffsetX, -camPosOffsetY);
    }

    update() {
        //console.log(Math.round(this.x) + "," + Math.round(this.y));
        super.update();
        this.trackTarget();

        //console.log(this.entityShoot.targetX + ',' + this.entityShoot.targetY)
    }

    kill() {
        super.kill();
        this.targetPlayer = undefined;
        this.finalTargetX = undefined;
        this.finalTargetY = undefined;

        this.healthbar.kill();
        this.healthbarBackground.kill();
    }
}