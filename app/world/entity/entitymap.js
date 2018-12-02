import game from "index";
import ProjectileManager from "./projectile/projectilemanager";
import MonsterManager from "./monster/monstermanager";
import MPPlayer from "../../player/mpplayer/mpplayer";
import Monster from "./monster/monster";

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

        this.projectileManager.update();
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

}