
import game from "index";
import Screen from "./screen";
import Tile from '../../world/tile/tile';
import TileType from '../../world/tile/tiletype';
import TileGrid from '../../world/tile/tilegrid';
import CustomText from '../custom/customtext';
import Camera from "../camera/camera";
import FPSOverlay from "../fpsoverlay/fpsoverlay";

export default class GameScreen extends Screen {

    constructor() {
        super("GameScreen");
    }

    open() {
        this.camera = new Camera();

        game.getPlayer.spawnToGame();
        PIXI.Application.prototype.getTileGrid = new TileGrid();

        //game.getTileGrid.tileMap.push(new Tile(TileType.list.GRASS, 32, 32));
        //this.add.image(400, 300, 'star');


        this.fpsOverlay = new FPSOverlay();
    }

    close() {

    }


    update() {
        this.camera.update();
        game.getPlayer.update();
        game.getTileGrid.update();

        //FPS TEST
        this.fpsOverlay.update();
    }

    get getCamera() {
        return this.camera;
    }
}