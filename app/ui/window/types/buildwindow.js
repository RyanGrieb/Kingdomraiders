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

        this.setParentGroup(game.getUI.parentGroup.positive5);

        this.startingID = 0;
        this.displayedTiles = undefined;
        this.selectedTileName = "TILE_" + TileType.list.GRASS.name;

        this.x = 50;
        this.y = (game.HEIGHT / 2) - 500 / 2;
        this.w = 350;
        this.h = 500;
    }

    open() {
        this.displayedTiles = [];

        var body = new CustomSprite("GRAYMENU", this.x, this.y, this.w, this.h);
        this.addUI(body);


        //Tile List
        this.loadTileList(this.startingID);
        for (var i = 0; i < this.displayedTiles.length; i++) {
            this.addUI(this.displayedTiles[i]);
        }
    }

    close() {
        super.close();
    }

    loadTileList(startingID) {
        var id = startingID;
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 7; x++) {
                var currentTileTexture = this.getIndexName((id));
                if (currentTileTexture === undefined)
                    break;
                this.displayedTiles.push(new CustomSprite(currentTileTexture, (this.x + 5) + x * 49, (this.y + 5) + y * 49, 42, 42));
                id++;
            }
        }
    }

    previousTile() {
        this.startingID -= 7;
        this.close();
        this.open();
    }

    nextTile() {
        this.startingID += 7;
        this.close();
        this.open();
    }

    onClick() {
        var mX = game.renderer.plugins.interaction.mouse.global.x;
        var mY = game.renderer.plugins.interaction.mouse.global.y;

        if (mX > this.x && mX < (this.x + this.w))
            if (mY > this.y && mY < (this.y + this.h))
                for (var i = 0; i < this.displayedTiles.length; i++) {
                    var tile = this.displayedTiles[i];
                    tile.customSprite.tint = 0xFFFFFF;
                    if (mX > tile.x && mX < (tile.x + tile.w))
                        if (mY > tile.y && mY < (tile.y + tile.h)) {
                            tile.customSprite.tint = 0xDC143C;
                            this.selectedTileName = tile.name;
                        }
                }
    }

    getIndexName(index) {
        if (TileType.getTileFromID(index) === undefined)
            return undefined;

        return "TILE_" + TileType.getTileFromID(index).name;
    }

    get selectedTileID() {
        var name = this.selectedTileName.substring(this.selectedTileName.indexOf("_") + 1);
        return TileType.getIDFromName(name);
    }
}