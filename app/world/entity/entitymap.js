import game from "index";

export default class EntityMap {
    constructor() {
        this.entityMap = [];

        this.group = new PIXI.display.Group(2, false);
        game.stage.addChild(new PIXI.display.Layer(this.group));
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
}