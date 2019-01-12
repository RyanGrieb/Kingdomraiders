import Entity from "../entity";

import game from "index";
import ProjectileType from "./projectiletype";
import { setInterval, clearInterval } from "timers";
import Monster from "../monster/monster";
import { SystemRenderer } from "pixi.js";
import Player from "../../../player/player";
import AssetsEnum from "../../assets/assetsenum";

export default class Projectile extends Entity {

    constructor(ownerName, projType, x, y, targetX, targetY) {
        super(projType, x, y, 32, 32);
        //console.log("Starting: " + Math.round(x) + "," + Math.round(y));
        //console.log("Target: " + Math.round(targetX) + "," + Math.round(targetY));
        this.ownerName = ownerName;
        this.addCollision(8, 5, 16, 22);

        this.duration = 80;

        var radians = (Math.PI / 180) * this.camera.rotation;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Translates roation to a mouse value.
        this.targetX = targetX;
        this.targetY = targetY;
        //this.targetX = this.camera.position.x + (cos * (targetX - this.camera.position.x) + sin * (targetY - this.camera.position.y));
        //this.targetY = this.camera.position.y + (-sin * (targetX - this.camera.position.x) + cos * (targetY - this.camera.position.y));

        //Creates an angle from our target & position
        //TODO: subtract targetX by 16-cos (angle from mouse below...?)
        var deltaX = this.targetX - this.x;
        var deltaY = this.targetY - this.y;

        this.angle = Math.atan2(deltaY, deltaX);

        //Convert back to degree.
        var deg = (this.angle * (180 / Math.PI) + 90);
        this.sprite.customSprite.rotation = deg * (Math.PI / 180);

        this.sprite.customSprite.parentGroup = game.getUI.parentGroup.positive2;
        this.sprite.customSprite.visible = false;
        this.allowRotate = false;

        //Animation
        this.sprite.setAnimation(100, 2);
    }

    moveToTarget() {
        //Move to target
        if (--this.duration > 0 && !this.collider.collided &&
            (game.getEntityMap.monsterManager.getMonsterFromLocation(this.x, this.y, this.w, this.h) === undefined || (this.ownerName === "Monster")) &&
            (game.getEntityMap.getMPPlayerFromLocation(this.x, this.y, this.w, this.h) === undefined || this.ownerName === "Player")) {
            //console.log((this.angle * (180 / Math.PI)));
            if (!this.sprite.customSprite.visible)
                this.sprite.customSprite.visible = true;

            var velX = 7 * Math.cos(this.angle);
            var velY = 7 * Math.sin(this.angle);


            var velocity = this.checkCollision(velX, velY);

            //Camera rotation offset.
            var radians = (Math.PI / 180) * this.camera.rotation;
            //Sprite rotatation offset
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            //Ofset the cos & sin
            var velXOffset = (velocity.y * sin) + (-(velocity.x * cos));
            var velYOffset = (velocity.y * cos) + (velocity.x * sin);


            //Same as projectile.js, make sure to keep gameX&Y not offsetted by rotation.
            this.setGameVelocity(velocity.x * game.ticker.deltaTime, velocity.y * game.ticker.deltaTime);

            this.sprite.setVelocity(-velXOffset * game.ticker.deltaTime, velYOffset * game.ticker.deltaTime);

        } else {

            var player = game.getEntityMap.getPlayerFromLocation(this.x, this.y, this.w, this.h);
            if (player !== undefined) {
                //console.log("Hit: " + Math.round(this.x) + "," + Math.round(this.y));
            }

            this.kill();
            if (game.getPlayer.inGame)
                game.getEntityMap.removeObject(this);
        }

    }

    kill() {
        super.kill();
        clearInterval(this.intervalID);
    }

    update() {
        // console.log(Math.round(this.collider.x) + "," + Math.round(this.collider.y));
        //console.log(Math.round(this.sprite.getGamePositionX) + "," + Math.round(this.sprite.getGamePositionY));
        super.update();

        this.moveToTarget();
    }

    static fire(ownerName, projType, x, y, targetX, targetY) {
        game.getEntityMap.entityMap.push(new Projectile(ownerName, projType, x, y, targetX, targetY));
    }

}