import game from "index";

import Entity from "../entity";
import AssetEnum from "../../assets/assetsenum";

export default class Monster extends Entity {
    constructor(monsterType, x, y, w, h) {
        super("MONSTER", x, y, w, h);

        this.sprite = new PIXI.Sprite(AssetEnum.getObjectFromName("MONSTER_" + monsterType.name).texture);

        this.monsterType = monsterType;
        this.sprite.x = (this.x + (this.camera.position.x - game.getPlayer.getX) - 21) + (w / 2);
        this.sprite.y = (this.y + (this.camera.position.y - game.getPlayer.getY) - 21) + (w / 2);
        this.sprite.width = w;
        this.sprite.height = h;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.parentGroup = game.getEntityMap.group;

        game.stage.addChild(this.sprite);
    }

    update() {
        super.update();
    }
}