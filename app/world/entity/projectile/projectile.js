import Entity from "../entity";

import game from "index";
import ProjectileType from "./projectiletype";

export default class Projectile extends Entity {

    constructor(projType, x, y, targetX, targetY) {
        super(projType, x, y, 32, 32);
        this.addCollision(8, 5, 16, 22);

        this.duration = 40;

        var radians = (Math.PI / 180) * this.camera.rotation;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Translates roation to a mouse value.
        this.targetX = this.camera.position.x + (cos * (targetX - this.camera.position.x) + sin * (targetY - this.camera.position.y));
        this.targetY = this.camera.position.y + (-sin * (targetX - this.camera.position.x) + cos * (targetY - this.camera.position.y));

        //Creates an angle from our target & position
        //TODO: subtract targetX by 16-cos (angle from mouse below...?)
        var deltaX = this.targetX - this.sprite.x;
        var deltaY = this.targetY - this.sprite.y;

        this.angle = Math.atan2(deltaY, deltaX);

        //Convert back to degree.
        var deg = (this.angle * (180 / Math.PI) + 90);
        this.sprite.customSprite.rotation = deg * (Math.PI / 180);

        this.sprite.customSprite.parentGroup = game.getUI.parentGroup.positive2;
        this.sprite.customSprite.visible = false;
        this.allowRotate = false;
    }

    moveToTarget() {
        if (--this.duration > 0 && !this.collider.collided) {

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
            this.setGameVelocity(velocity.x, velocity.y);

            this.sprite.setVelocity(-velXOffset, velYOffset);

        } else
            this.kill();
    }

    kill() {
        //Bad solution, but stops stray projectiles from staying on screen during screen switch.
        if (game.getPlayer.inGame)
            game.getEntityMap.removeObject(this);

        super.kill();
    }

    update() {
        //console.log(Math.round(this.sprite.collider.x) + "," + Math.round(this.sprite.collider.y));
        //console.log(Math.round(this.sprite.getGamePositionX) + "," + Math.round(this.sprite.getGamePositionY));
        super.update();

        this.moveToTarget();
    }

    static fire(projType, x, y, targetX, targetY) {
        game.getEntityMap.entityMap.push(new Projectile(projType, x, y, targetX, targetY));
    }

}