import game from "index";
import ProjectileType from "./projectile/projectiletype";

export default class EntityShoot {

    constructor(name, entity) {
        //Misc helper variables
        this.camera = game.getUI.getCurrentScreen.getCamera;

        //Projectile variables
        this.projectileType = undefined;
        this.delay = undefined;
        this.currentDelay = undefined;

        //Entity owner variables
        this.name = name;
        this.entity = entity;
        this.targetX = undefined;
        this.targetY = undefined;

        //Misc interval boolean variables
        this.shooting = false;
        this.sentAddShooterPacket = false;
    }

    //Called mouse mouseclick
    startShooting() {
        this.shooting = true;
    }

    //Called when we haven't sent it yet & were ready to shoot
    sendAddShooterPacket() {
        //We convert our mousevalue to a gameX&Y value to be converted back from the other clients online.
        var targetX = (this.targetX + (game.getPlayer.getX - this.camera.position.x)) + 21;
        var targetY = (this.targetY + (game.getPlayer.getY - this.camera.position.y)) + 21;

        //Packet
        var msg = {
            type: "AddShooter",
            entityType: "Player",
            targetX: targetX,
            targetY: targetY,
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
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

    //inputs are a screen position WITH rotation offset
    setTarget(projectileType, delay, x, y) {
        this.projectileType = projectileType;
        this.delay = delay;
        if (this.currentDelay === undefined)
            this.currentDelay = this.delay;

        this.targetX = x;
        this.targetY = y;


        //Send target update to server
        //We convert our mousevalue to a gameX&Y value to be converted back from the other clients online.
        var targetX = (this.targetX + (game.getPlayer.getX - this.camera.position.x)) + 21;
        var targetY = (this.targetY + (game.getPlayer.getY - this.camera.position.y)) + 21;


        if (this.shooting) {
            var msg = {
                type: "ShooterUpdate",
                entityType: "Player",
                targetX: Math.round(targetX),
                targetY: Math.round(targetY),
            };
            game.getNetwork.sendMessage(JSON.stringify(msg));
        }
    }

    //inputs are a gameScreen position WITH rotation already applied
    recieveTarget(projectileType, delay, currentDelay, x, y) {
        this.shooting = true;
        this.sentAddShooterPacket = true; //Already sent since this is a packet that was sent to us

        this.projectileType = projectileType;
        this.delay = delay;
        this.currentDelay = currentDelay;

        //Need to convert target back to a mouse pos

        //Convert back to a screen position
        this.recieveTargetUpdate(x, y);

    }

    //(SERVERSIDE)
    //Recieved from serverside
    recieveTargetUpdate(x, y) {
        //Use existing method to just update our reiceved target
        var targetX = x;
        var targetY = y;

        var radians = (Math.PI / 180) * (this.camera.rotation);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        targetX = (targetX - (game.getPlayer.getX - this.camera.position.x)) - 21;
        targetY = (targetY - (game.getPlayer.getY - this.camera.position.y)) - 21;

        //This is for when the client-side player rotates his camera, this offsets that back to normal.
        //var targetXOffset = (cos * (targetX - this.camera.position.x)) - (sin * (targetY - this.camera.position.y)) + this.camera.position.x;
        //var targetYOffset = (cos * (targetY - this.camera.position.y)) + (sin * (targetX - this.camera.position.x)) + this.camera.position.y;

        this.targetX = targetX;
        this.targetY = targetY;

    }

    removeTarget() {
        this.targetX = undefined;
        this.targetY = undefined;
    }

    shoot() {
        //console.log("shooting")
        if (this.currentDelay >= this.delay) {

            var originX = (this.entity.x + (this.entity.w / 2)) - 16;
            var originY = (this.entity.y + (this.entity.h / 2)) - 16;

            game.getEntityMap.projectileManager2.shootProjectile(this.name, this.projectileType,
                originX, originY,
                this.targetX, this.targetY);


            if (!this.sentAddShooterPacket)
                this.sendAddShooterPacket();
            this.currentDelay = 0;
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

    update() {
        if (this.shooting)
            if (this.targetX !== undefined && this.targetY !== undefined)
                this.shoot();

        if (this.currentDelay !== undefined)
            if (this.currentDelay < this.delay)
                this.currentDelay++;
    }

}