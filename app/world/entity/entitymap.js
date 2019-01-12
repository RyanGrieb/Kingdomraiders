import game from "index";
import MonsterManager from "./monster/monstermanager";
import MPPlayer from "../../player/mpplayer/mpplayer";
import Monster from "./monster/monster";
import ProjectileManager from "./projectile/projectilemanager";
import Projectile from "./projectile/projectile";

export default class EntityMap {
    constructor() {
        this.entityMap = [];

        this.projectileManager = new ProjectileManager();
        this.monsterManager = new MonsterManager();
    }

    removeObject(obj) {
        for (var i = 0; i < this.entityMap.length; i++) {
            if (this.entityMap[i] === obj)
                this.entityMap.splice(i, 1);
        }
    }

    clearObjects() {
        for (var i = 0; i < this.entityMap.length; i++)
            this.entityMap[i].kill();

        this.entityMap = [];
    }

    update() {
        for (var i = 0; i < this.entityMap.length; i++)
            this.entityMap[i].update();
    }

    //Broad

    //Get Monster/Player/Item by name, id, 

    //MPPlayer
    getMPPlayerByID(id) {
        for (var i = 0; i < this.entityMap.length; i++) {
            if (this.entityMap[i].type.name.includes("PLAYER")) { //We use this to include clientsideplayer.
                if (this.entityMap[i].id === id)
                    return this.entityMap[i];
            }
        }
    }

    getPlayerFromLocation(x, y, w, h) {
        for (var i = 0; i < this.getAllPlayers.length; i++) {
            var player = this.getAllPlayers[i];
            if (x < (player.getX + player.getWidth) && (x + w) > player.getX)
                if (y < (player.getY + player.getHeight) && (y + h) > player.getY)
                    return player;
        }

        return undefined;
    }

    getMPPlayerFromLocation(x, y, w, h) {
        for (var i = 0; i < this.getAllMPPlayers.length; i++) {
            var player = this.getAllMPPlayers[i];
            if (x < (player.getX + player.getWidth) && (x + w) > player.getX)
                if (y < (player.getY + player.getHeight) && (y + h) > player.getY)
                    return player;
        }

        return undefined;
    }

    //Projectile
    getProjectileFromLocation(x, y, w, h) {
        for (var i = 0; i < this.getAllProjectiles.length; i++) {
            var projectile = this.getAllProjectiles[i];
            if (x < (projectile.x + projectile.getWidth) && (x + w) > projectile.x)
                if (y < (projectile.y + projectile.getHeight) && (y + h) > projectile.y)
                    return projectile;
        }

        return undefined;
    }

    //Monster
    getMonsterFromID(id) {
        for (var i = 0; i < game.getEntityMap.entityMap.length; i++)
            if (game.getEntityMap.entityMap[i] instanceof Monster)
                if (game.getEntityMap.entityMap[i].monsterID === id)
                    return game.getEntityMap.entityMap[i];

        return undefined;
    }

    get getAllPlayers() {
        var allPlayers = [];
        for (var i = 0; i < this.entityMap.length; i++)
            if (this.entityMap[i] instanceof MPPlayer)
                allPlayers.push(this.entityMap[i]);

        allPlayers.push(game.getPlayer);

        return allPlayers;
    }

    get getAllMPPlayers() {
        var allPlayers = [];
        for (var i = 0; i < this.entityMap.length; i++)
            if (this.entityMap[i] instanceof MPPlayer)
                allPlayers.push(this.entityMap[i]);

        return allPlayers;
    }

    get getAllProjectiles() {
        var allProjectiles = [];
        for (var i = 0; i < this.entityMap.length; i++)
            if (this.entityMap[i] instanceof Projectile)
                allProjectiles.push(this.entityMap[i]);

        return allProjectiles;
    }

}