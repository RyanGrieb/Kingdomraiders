import game from "index";
import ProjectileType from "./projectiletype";
import Projectile from "./projectile";
import { setTimeout } from "timers";

export default class ProjectileManager {

    constructor() {
        //Misc helper variables
        this.camera = game.getUI.getCurrentScreen.getCamera;

        this.shooters = [];

        setInterval(() => this.sendTargetUpdate(), 100);

        //Prevents client from spamming his mouse.
        // this.clientSideMouseDelay = 0;
    }

    //Clientside methods.
    setClientsideShooter() {

        // if (this.clientSideMouseDelay <= 0)     //If the player isn't already shooting.
        if (game.getPlayer.inventory.getWeapon !== undefined)    //If were holding a valid wepaon, lets start shooting!.
            if (game.getPlayer.inventory.getWeapon.itemType.projectile !== undefined) {


                var radians = (Math.PI / 180) * (this.camera.rotation);
                var cos = Math.cos(radians);
                var sin = Math.sin(radians);

                //Basic mouse pos.
                var mX = game.renderer.plugins.interaction.mouse.global.x;
                var mY = game.renderer.plugins.interaction.mouse.global.y;

                //Mouse /w rotation offset.
                var mouseX = this.camera.position.x + (cos * (mX - this.camera.position.x) + sin * (mY - this.camera.position.y));
                var mouseY = this.camera.position.y + (-sin * (mX - this.camera.position.x) + cos * (mY - this.camera.position.y));

                //We convert our mousevalue to a gameX&Y value to be converted back from the other clients online.
                var targetX = (mouseX + (game.getPlayer.getX - this.camera.position.x)) + 21;
                var targetY = (mouseY + (game.getPlayer.getY - this.camera.position.y)) + 21;

                var shooterObj = {
                    id: undefined,
                    entityType: "Player",
                    projectile: game.getPlayer.inventory.getWeapon.itemType.projectile,
                    delay: game.getPlayer.playerProfile.convertDexToDelay(game.getPlayer.playerProfile.stats.dex),
                    currentDelay: game.getPlayer.playerProfile.convertDexToDelay(game.getPlayer.playerProfile.stats.dex),

                    targetX: game.renderer.plugins.interaction.mouse.global.x,
                    targetY: game.renderer.plugins.interaction.mouse.global.y,
                    //serversideTargetX: mouseX,
                    //serversideTargetY: mouseY,
                };
                this.shooters.push(shooterObj);

                var msg = {
                    type: "AddShooter",
                    entityType: "Player",
                    targetX: targetX,
                    targetY: targetY,
                };

                game.getNetwork.sendMessage(JSON.stringify(msg));

            }
    }

    removeClientsideShooter() {
        //If any of our windows are open, don't send a remove packet, unless we are shooting still.
        if (game.getUI.isAllWindowsClosed && !game.getPlayer.inventory.windowOpen || this.getShooterByID(undefined) !== undefined) {

            var clientsideShooterIndex = undefined;
            for (var i = 0; i < this.shooters.length; i++)
                if (this.shooters[i].id === undefined)
                    clientsideShooterIndex = i;


            //If we already remove our clientside shooter, just stop.
            if (clientsideShooterIndex === undefined)
                return;

            this.shooters.splice(clientsideShooterIndex, 1);
            var msg = {
                type: "RemoveShooter",
                entityType: "Player",
            };

            game.getNetwork.sendMessage(JSON.stringify(msg));
        }
    }

    sendTargetUpdate() {
        //If we open our inventory while shooting, stop!! (I don't like the return statements either.)
        if (game.getPlayer.inventory === undefined)
            return;

        if (!game.getUI.isAllWindowsClosed || game.getPlayer.inventory.windowOpen) {
            //If the clientside shooter exists, remove it.
            if (this.getShooterByID(undefined) !== undefined)
                this.removeClientsideShooter();
            return;
        }

        var radians = (Math.PI / 180) * (this.camera.rotation);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Basic mouse pos.
        var mX = game.renderer.plugins.interaction.mouse.global.x;
        var mY = game.renderer.plugins.interaction.mouse.global.y;

        var targetX = (mX + (game.getPlayer.getX - this.camera.position.x)) + 21;
        var targetY = (mY + (game.getPlayer.getY - this.camera.position.y)) + 21;

        //Our target /w rotation offset, it's confusing i know... (it's not used clientside)
        //Mouse /w rotation offset.
        var mouseX = this.camera.position.x + (cos * (mX - this.camera.position.x) + sin * (mY - this.camera.position.y));
        var mouseY = this.camera.position.y + (-sin * (mX - this.camera.position.x) + cos * (mY - this.camera.position.y));

        //We convert our mousevalue to a gameX&Y value to be converted back from the other clients online.
        var offsettedTargetX = (mouseX + (game.getPlayer.getX - this.camera.position.x)) + 21;
        var offsettedTargetY = (mouseY + (game.getPlayer.getY - this.camera.position.y)) + 21;

        for (var i = 0; i < this.shooters.length; i++)
            if (this.shooters[i].id === undefined) //TODO; make this more effiecient, wehre the server translate the mouse pos /w screen size
                if (this.shooters[i].serversideTargetX !== offsettedTargetX || this.shooters[i].serversideTargetY !== offsettedTargetY) {
                    var msg = {
                        type: "ShooterUpdate",
                        entityType: "Player",
                        targetX: Math.round(offsettedTargetX),
                        targetY: Math.round(offsettedTargetY),
                    };

                    game.getNetwork.sendMessage(JSON.stringify(msg));

                    this.shooters[i].targetX = Math.round(mX);
                    this.shooters[i].targetY = Math.round(mY);
                    this.shooters[i].serversideTargetX = offsettedTargetX;
                    this.shooters[i].serversideTargetY = offsettedTargetY;
                }
    }

    //Non-clientside based methods (MPPlayers & other entities)
    recieveShooter(json) {
        var radians = (Math.PI / 180) * (this.camera.rotation);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        var id = json.id;

        //Modify our offsets to our targetX&Y
        var targetX = json.targetX;
        var targetY = json.targetY;

        //Convert back to a screen position
        targetX = (targetX - (game.getPlayer.getX - this.camera.position.x)) - 21;
        targetY = (targetY - (game.getPlayer.getY - this.camera.position.y)) - 21;

        //This is for when the client-side player rotates his camera, this offsets that back to normal.
        var targetXOffset = (cos * (targetX - this.camera.position.x)) - (sin * (targetY - this.camera.position.y)) + this.camera.position.x;
        var targetYOffset = (cos * (targetY - this.camera.position.y)) + (sin * (targetX - this.camera.position.x)) + this.camera.position.y;


        var shooterObj = {
            id: id,
            entityType: json.entityType,
            projectile: ProjectileType.getProjectileFromID(json.projectileID),
            delay: game.getPlayer.playerProfile.convertDexToDelay(json.dex), //Need to change to get it from json.delay.
            currentDelay: json.currentDelay,
            targetX: targetXOffset,
            targetY: targetYOffset,
        };
        this.shooters.push(shooterObj);

    }

    recieveShooterUpdate(json) {
        var radians = (Math.PI / 180) * (this.camera.rotation);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Convert back to a screen position
        var targetX = (json.targetX - (game.getPlayer.getX - this.camera.position.x)) - 21;
        var targetY = (json.targetY - (game.getPlayer.getY - this.camera.position.y)) - 21;

        //This is for when the client-side player rotates his camera, this offsets that back to normal.
        var targetXOffset = (cos * (targetX - this.camera.position.x)) - (sin * (targetY - this.camera.position.y)) + this.camera.position.x;
        var targetYOffset = (cos * (targetY - this.camera.position.y)) + (sin * (targetX - this.camera.position.x)) + this.camera.position.y;


        for (var i = 0; i < this.shooters.length; i++)
            if (this.shooters[i].entityType === json.entityType)
                if (this.shooters[i].id === json.id) {
                    this.shooters[i].targetX = targetXOffset;
                    this.shooters[i].targetY = targetYOffset;
                }
    }

    removeShooter(entityType, id) {
        for (var i = 0; i < this.shooters.length; i++)
            if (this.shooters[i].entityType === entityType)
                if (this.shooters[i].id === id)
                    this.shooters.splice(i, 1);
    }

    getShooterByID(id) {
        for (var i = 0; i < this.shooters.length; i++)
            if (this.shooters[i].id === id)
                return this.shooters[i];
    }

    //Sets the sprit face depending on our mouse positons.
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

    setTargetOfEntity(entityType, id, targetX, targetY) {
        for (var i = 0; i < this.shooters.length; i++)
            if (this.shooters[i].entityType === entityType)
                if (this.shooters[i].id === id) {
                    this.shooters[i].targetX = targetX;
                    this.shooters[i].targetY = targetY;
                }
    }

    update() {
        //Fires our shooters projectile every x ms..
        for (var i = 0; i < this.shooters.length; i++) {
            var x = 0;
            var y = 0;
            var w = 1;
            var h = 1;

            if (this.shooters[i].id === undefined) { //Clientside shooter.
                x = game.getPlayer.getX;
                y = game.getPlayer.getY;
                w = 0;
                h = 0;
            } else {

                //MPPlayers shooters
                if (this.shooters[i].entityType === "Player") {
                    if (game.getEntityMap.getMPPlayerByID(this.shooters[i].id) === undefined) {
                        this.removeShooter("Player", this.shooters[i].id);
                        continue;
                    }

                    x = game.getEntityMap.getMPPlayerByID(this.shooters[i].id).x;
                    y = game.getEntityMap.getMPPlayerByID(this.shooters[i].id).y;
                    w = game.getEntityMap.getMPPlayerByID(this.shooters[i].id).w - 32;
                    h = game.getEntityMap.getMPPlayerByID(this.shooters[i].id).h - 32;
                }

                //Monster Shooters
                if (this.shooters[i].entityType === "Monster") {
                    if (game.getEntityMap.getMonsterFromID(this.shooters[i].id) === undefined) {
                        this.removeShooter("Monster", this.shooters[i].id);
                        continue;
                    }

                    x = game.getEntityMap.getMonsterFromID(this.shooters[i].id).x;
                    y = game.getEntityMap.getMonsterFromID(this.shooters[i].id).y;
                    w = game.getEntityMap.getMonsterFromID(this.shooters[i].id).w - 32;
                    h = game.getEntityMap.getMonsterFromID(this.shooters[i].id).h - 32;
                }
            }


            if (this.shooters[i].currentDelay >= this.shooters[i].delay) {
                Projectile.fire(this.shooters[i], this.shooters[i].projectile,
                    x + w / 2, y + h / 2,
                    this.shooters[i].targetX, this.shooters[i].targetY);

                this.shooters[i].currentDelay = 0;
            }

            this.shooters[i].currentDelay++;
        }

        //Inefficent
        if (this.getShooterByID(undefined) !== undefined)
            this.setClientsideDirection();


        //Recues our clientSideMouseDelay
        // if (this.clientSideMouseDelay > 0)
        //     this.clientSideMouseDelay--;

    }
}