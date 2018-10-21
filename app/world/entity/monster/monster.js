import game from "index";

import Entity from "../entity";
import AssetEnum from "../../assets/assetsenum";

export default class Monster extends Entity {
    constructor(type, x, y, w, h) {
        super(type, x, y, w, h);

        this.sprite.parentGroup = game.getEntityMap.monsterGroup;
    }

    update() {
        super.update();
    }
}