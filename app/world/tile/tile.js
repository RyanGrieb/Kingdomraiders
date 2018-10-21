import game from "index";

import AssetEnum from "../../world/assets/assetsenum";

export default class Tile {

    constructor(container, tileType, x, y) {
        this.tileType = tileType;
        this.texture = tileType.name;
        this.x = x;
        this.y = y;

        this.sprite = new PIXI.Sprite(AssetEnum.getObjectFromName("TILE_" + tileType.name).texture);
        this.sprite.x = x;
        this.sprite.y = y;

        //Sprite layer
        //this.sprite.parentGroup = game.getTileGrid.tileGroup;

        if (container !== undefined)
            container.addChild(this.sprite);
        else
            game.stage.addChild(this.sprite);

    }

    setCameraPivot(x, y) {
        this.sprite.x -= game.getPlayer.getX - x;
        this.sprite.y -= game.getPlayer.getY - y;
    }

    kill() {
        this.sprite.destroy();
    }
}