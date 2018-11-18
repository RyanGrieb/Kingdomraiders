import game from "index";

import Entity from "../entity";
import AssetEnum from "../../assets/assetsenum";

export default class Monster extends Entity {
    constructor(monsterID, type, x, y) {
        type.anchorX = 0.5;
        type.anchorY = 0.5;
        var w = type.w;
        var h = type.h;
        super(type, x, y, w, h);

        this.monsterID = monsterID;

        this.sprite.setParentGroup(game.getUI.parentGroup.positive3);
    }

    trackPlayer(id) {
        console.log("tracking: " + id);
    }

    update() {
        super.update();
    }
}