import game from "index";
import ProjectileType from "./projectiletype";
import Projectile from "./projectile";

export default class ProjectileManager {

    constructor() {
        //Misc helper variables
        this.camera = game.getUI.getCurrentScreen.getCamera;

        this.shooters = [];

        setInterval(() => this.sendTargetUpdate(), 100);
    }

    //Clientside methods.
    setClientsideShooter() {
        //If were holding a valid wepaon, lets start shooting!.
        if (game.getPlayer.inventory.getWeapon !== undefined)
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
                    projectile: game.getPlayer.inventory.getWeapon.itemType.projectile,
                    delay: game.getPlayer.playerProfile.stats.dex,
                    currentDelay: game.getPlayer.playerProfile.stats.dex,

                    targetX: game.renderer.plugins.interaction.mouse.global.x,
                    targetY: game.renderer.plugins.interaction.mouse.global.y,
                    serversideTargetX: mouseX,
                    serversideTargetY: mouseY,
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
        for (var i = 0; i < this.shooters.length; i++)
            if (this.shooters[i].id === undefined)
                this.shooters.splice(i, 1);

        var msg = {
            type: "RemoveShooter",
            entityType: "Player",
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    sendTargetUpdate() {
        //If we open our inventory while shooting, stop!! (I don't like the return statements either.)
        if (game.getPlayer.inventory === undefined)
            return;

        if (!game.getUI.isAllWindowsClosed || game.getPlayer.inventory.windowOpen) {
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
            if (this.shooters[i].id === undefined)
                if (this.shooters[i].serversideTargetX !== mouseX || this.shooters[i].serversideTargetY !== mouseY) {
                    var msg = {
                        type: "ShooterUpdate",
                        entityType: "Player",
                        targetX: Math.round(offsettedTargetX),
                        targetY: Math.round(offsettedTargetY),
                    };

                    game.getNetwork.sendMessage(JSON.stringify(msg));

                    this.shooters[i].targetX = Math.round(mX);
                    this.shooters[i].targetY = Math.round(mY);
                    this.shooters[i].serversideTargetX = mouseX;
                    this.shooters[i].serversideTargetY = mouseY;
                }

    }

    //Non-clientside based methods (MPPlayers & other entities)
    recieveShooter(json) {
        var radians = (Math.PI / 180) * (this.camera.rotation);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        var id = json.id;
        var mpPlayer = game.getEntityMap.getMPPlayerByID(id);

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
            projectile: ProjectileType.getProjectileFromID(json.projectileID),
            delay: 10, //Need to change to get it from json.delay.
            currentDelay: 10,
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
            if (this.shooters[i].id === json.id) {
                this.shooters[i].targetX = targetXOffset;
                this.shooters[i].targetY = targetYOffset;
            }
    }

    removeShooter(id) {
        for (var i = 0; i < this.shooters.length; i++)
            if (this.shooters[i].id === id)
                this.shooters.splice(i, 1);
    }

    update() {

        for (var i = 0; i < this.shooters.length; i++) {
            var x = 0;
            var y = 0;

            if (this.shooters[i].id === undefined) {
                x = game.getPlayer.getX;
                y = game.getPlayer.getY;
            } else {

                //
                if (game.getEntityMap.getMPPlayerByID(this.shooters[i].id) === undefined) {
                    this.removeShooter(this.shooters[i].id);
                    continue;
                }


                x = game.getEntityMap.getMPPlayerByID(this.shooters[i].id).x;
                y = game.getEntityMap.getMPPlayerByID(this.shooters[i].id).y;
            }


            if (this.shooters[i].currentDelay >= this.shooters[i].delay) {
                Projectile.fire(this.shooters[i].projectile,
                    x, y,
                    this.shooters[i].targetX, this.shooters[i].targetY);

                this.shooters[i].currentDelay = 0;
            }

            this.shooters[i].currentDelay++;
        }


    }
}