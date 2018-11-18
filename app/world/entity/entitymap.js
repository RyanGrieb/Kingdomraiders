import game from "index";
import ProjectileManager from "./projectile/projectilemanager";
import MonsterManager from "./monster/monstermanager";

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
            if (this.entityMap[i].type.name.includes("PLAYER")) {
                if (this.entityMap[i].id === id)
                    return this.entityMap[i];
            }
        }
    }

}