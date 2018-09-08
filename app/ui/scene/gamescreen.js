
import game from "index";
import Screen from "./screen";
import Tile from '../../world/tile/tile';
import TileType from '../../world/tile/tiletype';
import TileGrid from '../../world/tile/tilegrid';
import CustomText from '../custom/customtext';
import Camera from "../camera/camera";

export default class GameScreen extends Screen {

    constructor() {
        super("GameScreen");
    }

    open() {
        this.camera = new Camera();

        game.getPlayer.spawnToGame();
        this.testTile = new Tile(TileType.list.GRASS, 0, 0);
        this.testTile2 = new Tile(TileType.list.GRASS, game.getPlayer.spawnX, game.getPlayer.spawnY);
        //PIXI.Application.prototype.getTileGrid = new TileGrid();

        //game.getTileGrid.tileMap.push(new Tile(TileType.list.GRASS, 32, 32));
        //this.add.image(400, 300, 'star');
    }

    close() {

    }

    update() {
        console.log(this.testTile.x + "||" + game.getPlayer.getX);
        this.camera.update();
        game.getPlayer.update();
        this.testTile.setCameraPivot(this.camera.pivot.x, this.camera.pivot.y);
        //this.testTile2.setCameraPivot(this.camera.pivot.x, this.camera.pivot.y);
        //game.getTileGrid.update();
        //this.cameras.main.startFollow(game.getPlayer.getSprite.baseSprite);

        // console.log(game.loop.actualFps);
    }

    get getCamera() {
        return this.camera;
    }
}