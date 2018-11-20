import ItemType from "./itemtype";
import AssetEnum from "../../world/assets/assetsenum";

import game from "index";

export default class Item {

    constructor(itemType, x, y) {
        this.itemType = itemType;
        this.sprite = new PIXI.Sprite(AssetEnum.getObjectFromName("ITEM_" + this.itemType.name).texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = 32;
        this.sprite.height = 32;
        this.dragged = false;

        this.sprite.parentGroup = game.getUI.parentGroup.positive5;

      //  game.stage.addChild(this.sprite);
    }

    kill() {
        this.sprite.destroy();
    }
}