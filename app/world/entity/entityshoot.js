import game from "index";
import ProjectileType from "./projectile/projectiletype";
import AssetsEnum from "../assets/assetsenum";
import { setInterval, clearInterval } from "timers";

export default class EntityShoot {

    constructor(name, entity) {
        //Misc helper variables
        this.camera = game.getUI.getCurrentScreen.getCamera;

        //Projectile variables
        this.projectileType = undefined;
        this.attackDelay = undefined;
        this.prevTime;

        //Entity owner variables
        this.name = name;
        this.entity = entity;
        this.targetX = undefined;
        this.targetY = undefined;

        //Misc interval boolean variables
        this.shooting = false;
        this.sentAddShooterPacket = false;

        this.shootInterval = setInterval(() => this.shoot(), 1);
    }

    //Called mouse mouseclick
    startShooting() {
        this.shooting = true;
        this.prevTime = new Date().getTime();
    }

    //Called when we haven't sent it yet & were ready to shoot
    sendAddShooterPacket() {
        var msg = {
            type: "AddShooter",
            entityType: "Player",
            targetX: Math.round(this.targetX),
            targetY: Math.round(this.targetY),
            time: this.prevTime,
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
        //Packet

        this.sentAddShooterPacket = true;
    }



    //(SERVERSIDE)
    //Recieved from serverside, so we don't need to send a packet back like stopShooting()
    removeShooter() {
        this.shooting = false;
    }

    //(CLIENTSIDE)
    //Stops shooting and sends a packet about it
    stopShooting() {
        this.shooting = false;
        this.sentAddShooterPacket = false;

        var msg = {
            type: "RemoveShooter",
            entityType: "Player",
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    //inputs are a screen position -->>WITHOUT<-- rotation offset
    setTarget(projectileType, attackDelay, x, y) {
        this.projectileType = projectileType;
        this.attackDelay = attackDelay;

        //this.targetX = x;
        //this.targetY = y;


        //Send target update to server
        //We convert our mousevalue to a gameX&Y value to be converted back from the other clients online.
        var targetX = (x + (game.getPlayer.getX - this.camera.position.x));
        var targetY = (y + (game.getPlayer.getY - this.camera.position.y));

        //Now we convert our rotation offset
        var radians = (Math.PI / 180) * (this.camera.rotation);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Mouse /w rotation offset.
        var centerX = (this.entity.x + (this.entity.w / 2)) - 16;
        var centerY = (this.entity.y + (this.entity.h / 2)) - 16;
        var targetXMouseOffset = (cos * (targetX - centerX)) + (sin * (targetY - centerY)) + centerX;
        var targetYMouseOffset = (cos * (targetY - centerY)) - (sin * (targetX - centerX)) + centerY;
        this.targetX = targetXMouseOffset;
        this.targetY = targetYMouseOffset;

        //TODO: SYNC up with server just like monster projectiles
        if (this.shooting) {
            var msg = {
                type: "ShooterUpdate",
                entityType: "Player",
                targetX: Math.round(this.targetX),
                targetY: Math.round(this.targetY),
            };
            game.getNetwork.sendMessage(JSON.stringify(msg));
        }
    }

    //inputs are a gameScreen position WITH rotation already applied
    recieveTarget(projectileType, attackDelay, currentDelay, serverTime, x, y) {
        this.shooting = true;
        this.sentAddShooterPacket = true; //Already sent since this is a packet that was sent to us

        this.projectileType = projectileType;
        this.attackDelay = attackDelay;
        this.prevTime = serverTime;
        //this.prevTime = new Date().getTime();
        //console.log("Delay and current delay: " + this.delay + "," + this.currentDelay);
        //Need to convert target back to a mouse pos

        //Convert back to a screen position
        this.recieveTargetUpdate(x, y);
    }

    //(SERVERSIDE)
    //Recieved from serverside
    recieveTargetUpdate(x, y) {
        this.targetX = x;
        this.targetY = y;
    }

    removeTarget() {
        this.targetX = undefined;
        this.targetY = undefined;
    }

    shoot() {
        if (this.shooting)
            if (this.targetX !== undefined && this.targetY !== undefined) {
                //If we havent send a proper add shooter packet, do it now!
                if (!this.sentAddShooterPacket)
                    this.sendAddShooterPacket();
                var currTime = new Date().getTime();

                if ((currTime - this.prevTime) >= this.attackDelay) {
                    this.prevTime = currTime;
                    //console.log(currTime + "?");
                    var originX = (this.entity.x + (this.entity.w / 2)) - 16;
                    var originY = (this.entity.y + (this.entity.h / 2)) - 16;

                    game.getEntityMap.projectileManager.shootProjectile(this.name, this.projectileType,
                        originX, originY,
                        this.targetX, this.targetY);
                }

            }
    }

    setClientsideDirection() {
        var mouseX = game.renderer.plugins.interaction.mouse.global.x;
        var mouseY = game.renderer.plugins.interaction.mouse.global.y;
        var animationTick = "1";
        if (String(game.getPlayer.entity.sprite.name).includes("2"))
            animationTick = "2";

        if ((mouseY < game.HEIGHT / 2) &&
            (Math.abs(mouseY - game.HEIGHT / 2) > Math.abs(mouseX - game.WIDTH / 2))) {
            game.getPlayer.entity.sprite.setTexture("PLAYER_WARRIOR_UP" + animationTick);
        }
        if ((mouseY > game.HEIGHT / 2) &&
            (Math.abs(mouseY - game.HEIGHT / 2) > Math.abs(mouseX - game.WIDTH / 2))) {
            game.getPlayer.entity.sprite.setTexture("PLAYER_WARRIOR_DOWN" + animationTick);
        }
        if ((mouseX < game.WIDTH / 2) &&
            (Math.abs(mouseX - game.WIDTH / 2) > Math.abs(mouseY - game.HEIGHT / 2))) {
            game.getPlayer.entity.sprite.setTexture("PLAYER_WARRIOR_LEFT" + animationTick);
        }
        if ((mouseX > game.WIDTH / 2) &&
            (Math.abs(mouseX - game.WIDTH / 2) > Math.abs(mouseY - game.HEIGHT / 2))) {
            game.getPlayer.entity.sprite.setTexture("PLAYER_WARRIOR_RIGHT" + animationTick);
        }

    }

    kill() {
        //TODO: remove the repeating thread in this
        clearInterval(this.shootInterval);
    }

    update() {
        if (this.currentDelay !== undefined)
            if (this.currentDelay < this.delay)
                this.currentDelay++;
    }

}