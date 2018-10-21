import game from "index";

export default class EntityMap {
    constructor() {
        this.entityMap = [];
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
            if (this.entityMap[i].type.name.includes("_PLAYER")) {
                if (this.entityMap[i].id === id)
                    return this.entityMap[i];
            }
        }
    }

    getGroupByName(name) {
        switch (name) {
            case "monsterGroup":
                return this.monsterGroup;

            case "mpPlayerGroup":
                return this.mpPlayerGroup;

            case "bottomGroup":
                return this.bottomGroup;
        }
    }


}