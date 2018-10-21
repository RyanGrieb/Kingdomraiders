import game from "index";

import CustomWindow from "../customwindow";
import CustomSprite from "../../custom/customsprite";
import TextBox from "../../custom/textbox";
import Button from "../../custom/button";
import CustomText from "../../custom/customtext";
import RegisterWindow from "./registerwindow";
import TileType from "../../../world/tile/tiletype";
import AssetsEnum from "../../../world/assets/assetsenum";

export default class BuildWindow extends CustomWindow {

    constructor() {
        super("BuildWindow");

        this.index = 0;
    }

    open() {
        var body = new CustomSprite("GRAYMENU", (game.WIDTH / 2) - (400 / 2), (game.HEIGHT - 150), 400, 100);
        body.customSprite.parentGroup = game.getUI.parentGroup.positive4;
        this.addUI(body);

        this.selectedTile = new CustomSprite("TILE_GRASS", (game.WIDTH / 2) - (64 / 2), (game.HEIGHT - 133), 64, 64);
        this.selectedTile.customSprite.parentGroup = game.getUI.parentGroup.positive4;
        this.addUI(this.selectedTile);
    }

    close() {
        super.close();
    }

    previousTile() {
        this.index--;
        this.selectedTile.customSprite.texture = AssetsEnum.getObjectFromName(this.getIndexName).texture;
    }

    nextTile() {
        this.index++;
        this.selectedTile.customSprite.texture = AssetsEnum.getObjectFromName(this.getIndexName).texture;
    }

    get getIndexName() {
        if (TileType.getTileFromID(this.index) === undefined && this.index > 0)
            return "TILE_" + TileType.getTileFromID(--this.index).name;

        if (TileType.getTileFromID(this.index) === undefined && this.index <= 0)
            return "TILE_" + TileType.getTileFromID(++this.index).name;

        return "TILE_" + TileType.getTileFromID(this.index).name;
    }

    get selectedTileID() {
        return this.index;
    }
}