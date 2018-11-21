import game from "index";

import Entity from "../entity";
import AssetEnum from "../../assets/assetsenum";
import { setTimeout } from "timers";

export default class Monster extends Entity {
    constructor(monsterID, type, x, y) {
        type.anchorX = 0.5;
        type.anchorY = 0.5;
        var w = type.w;
        var h = type.h;
        super(type, x, y, w, h);

        this.monsterID = monsterID;

        this.sprite.setParentGroup(game.getUI.parentGroup.positive3);

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


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //PROBLEM: DURING LAG SOMETIMES MONSTER FOLLOWS PLAYER FOREVER
    //
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

        if (hypotnuse < -this.type.speed || hypotnuse > this.type.speed) {
            var velX = distanceX * this.type.speed;
            var velY = distanceY * this.type.speed;

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
        } else {
            //We've reached our final target, remove everything relating to a target.
            if (this.finalTargetX !== undefined || this.finalTargetY !== undefined) {
                this.finalTargetX = undefined;
                this.finalTargetY = undefined;
            }
        }
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
    }
}