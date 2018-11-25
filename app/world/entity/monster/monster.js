import game from "index";

import Entity from "../entity";
import AssetEnum from "../../assets/assetsenum";
import { setTimeout } from "timers";
import { togglePauseAll } from "pixi-sound";
import CustomSprite from "../../../ui/custom/customsprite";

export default class Monster extends Entity {
    constructor(monsterID, type, health, x, y) {
        type.anchorX = 0.5;
        type.anchorY = 0.5;
        var w = type.w;
        var h = type.h;
        super(type, x, y, w, h);

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

        this.targetPlayer = undefined;
        this.finalTargetX = undefined;
        this.finalTargetY = undefined;
    }

    //Recieve the order to track a player. (We don't look for the player clientside using our position due to latency).
    setPlayerToTrack(id) {
        //We add a delay to preven overestimatation from the client.
        //setTimeout(() => {

        for (var i = 0; i < game.getEntityMap.getAllPlayers.length; i++) {
            if (game.getEntityMap.getAllPlayers[i].id === id) {
                this.targetPlayer = game.getEntityMap.getAllPlayers[i];
            }
        }
        // }, 100);
    }

    stopTracking(json) {
        //Our final target.
        this.targetPlayer = undefined;
        this.finalTargetX = json.x;
        this.finalTargetY = json.y;
    }

    trackPlayer() {
        //If we have aboslutley no target. stop.
        if (this.targetPlayer === undefined && this.finalTargetX === undefined && this.finalTargetY === undefined)
            return;

        //Switches between targetplayer & the final target if there is one.
        var targetX = (this.finalTargetX === undefined) ? this.targetPlayer.getX - this.w / 2 : this.finalTargetX;
        var targetY = (this.finalTargetY === undefined) ? this.targetPlayer.getY - this.h / 2 : this.finalTargetY;

        var distanceX = (targetX - this.x);
        var distanceY = (targetY - this.y);

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
            this.setGameVelocity(velX, velY);

            //But for our screenX&Y, we apply our offset values.
            this.sprite.setVelocity(-velXOffset, velYOffset);
            this.healthbar.setVelocity(-velXOffset, velYOffset);
            this.healthbarBackground.setVelocity(-velXOffset, velYOffset);
        } else {
            //We've reached our final target, remove everything relating to a target.
            if (this.finalTargetX !== undefined || this.finalTargetY !== undefined) {
                this.finalTargetX = undefined;
                this.finalTargetY = undefined;
            }
        }
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
        super.update();
        this.trackPlayer();
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