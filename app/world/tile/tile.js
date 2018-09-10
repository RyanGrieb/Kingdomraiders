import game from "index";

import AssetEnum from "../../world/assets/assetsenum";

export default class Tile {

    constructor(chunk, tileType, x, y) {
        this.texture = tileType.name;
        this.x = x;
        this.y = y;

        this.sprite = new PIXI.Sprite(AssetEnum.getObjectFromName(tileType.name).texture);
        this.sprite.x = x;
        this.sprite.y = y;

        //Sprite layer
        //this.sprite.parentGroup = game.getTileGrid.tileGroup;

        chunk.renderer.render(this.sprite, chunk.renderTexture);
        //chunk.container.addChild(this.sprite);

    }

    setCameraPivot(x, y) {
        this.sprite.x -= game.getPlayer.getX - x;
        this.sprite.y -= game.getPlayer.getY - y;
    }
}