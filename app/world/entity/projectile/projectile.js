import Entity from "../entity";

import game from "index";
import ProjectileType from "./projectiletype";

export default class Projectile extends Entity {

    constructor(projType, x, y, targetX, targetY) {
        super(projType, x, y, 32, 32);

        this.duration = 40;

        var radians = (Math.PI / 180) * this.camera.rotation;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Translates roation to a mouse value.
        this.targetX = this.camera.position.x + (cos * (targetX - this.camera.position.x) + sin * (targetY - this.camera.position.y));
        this.targetY = this.camera.position.y + (-sin * (targetX - this.camera.position.x) + cos * (targetY - this.camera.position.y));

        //Converts mouse values to game x,y values 
        this.targetX = (this.targetX + (game.getPlayer.getX - this.camera.position.x)) + 21;
        this.targetY = (this.targetY + (game.getPlayer.getY - this.camera.position.y)) + 21;

        //Creates an angle from our target & position
        //TODO: subtract targetX by 16-cos (angle from mouse below...?)
        var deltaX = this.targetX - this.x;
        var deltaY = this.targetY - this.y;

        this.angle = Math.atan2(deltaY, deltaX);

        //Convert back to degree.
        var deg = (this.angle * (180 / Math.PI) + 90);
        this.sprite.rotation = deg * (Math.PI / 180);

        this.sprite.parentGroup = game.getUI.parentGroup.positive2;
        this.sprite.visible = false;
        this.allowRotate = false;
    }

    moveToTarget() {
        if (--this.duration > 0) {

            console.log((this.angle * (180 / Math.PI)));
            if (!this.sprite.visible)
                this.sprite.visible = true;

            var velX = 7 * Math.cos(this.angle);
            var velY = 7 * Math.sin(this.angle);

            this.setVelocity(velX, velY);

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
        super.update();

        this.moveToTarget();
    }

    static fire(projType, x, y, targetX, targetY) {
        game.getEntityMap.entityMap.push(new Projectile(projType, x, y, targetX, targetY));
    }

}