
import game from "index";
import Screen from "./screen";
import Tile from '../../world/tile/tile';
import TileType from '../../world/tile/tiletype';
import TileGrid from '../../world/tile/tilegrid';
import CustomText from '../custom/customtext';

export default class GameScreen extends Screen {

    constructor() {
        super("GameScreen");
    }

    open() {
        console.log("Game Screen!");

        game.getPlayer.spawnToGame();
        //Phaser.Game.prototype.getTileGrid = new TileGrid();

        //game.getTileGrid.tileMap.push(new Tile(TileType.list.GRASS, 32, 32));
        //this.add.image(400, 300, 'star');
    }

    close() {

    }

    update() {
        //game.getPlayer.update();
        //this.cameras.main.startFollow(game.getPlayer.getSprite.baseSprite);

        // console.log(game.loop.actualFps);
    }
}