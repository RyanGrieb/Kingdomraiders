import game from "index";

export default class EntityMap {
    constructor() {
        this.entityMap = [];

        this.bottomGroup = new PIXI.display.Group(1, false);
        game.stage.addChild(new PIXI.display.Layer(this.bottomGroup));

        this.mpPlayerGroup = new PIXI.display.Group(2, false);
        game.stage.addChild(new PIXI.display.Layer(this.mpPlayerGroup));

        this.monsterGroup = new PIXI.display.Group(4, false);
        game.stage.addChild(new PIXI.display.Layer(this.monsterGroup));
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