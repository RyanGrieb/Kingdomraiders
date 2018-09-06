import game from "index";

export default class Tile {

    constructor(tileType, x, y) {
        this.texture = tileType.name;
        this.sprite = game.createInstance.add.sprite(x, y, this.texture);
        this.sprite.setOrigin(0, 0);
        this.sprite.setDisplaySize(32, 32);
    }
}