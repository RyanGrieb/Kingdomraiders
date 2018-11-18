
import game from "index";
import Screen from "./screen";
import Tile from '../../world/tile/tile';
import TileType from '../../world/tile/tiletype';
import TileGrid from '../../world/tile/tilegrid';
import CustomText from '../custom/customtext';
import Camera from "../camera/camera";
import FPSOverlay from "../overlay/fpsoverlay";
import EntityMap from "../../world/entity/entitymap";
import Monster from "../../world/entity/monster/monster";
import MonsterType from "../../world/entity/monster/monstertype";
import Entity from "../../world/entity/entity";
import EntityType from "../../world/entity/entitytype";
import Projectile from "../../world/entity/projectile/projectile";
import ProjectileType from "../../world/entity/projectile/projectiletype";

export default class GameScreen extends Screen {

    constructor() {
        super("GameScreen");
    }

    open() {
        this.camera = new Camera();

        game.getPlayer.spawnToGame();

        PIXI.Application.prototype.getTileGrid = new TileGrid();
        PIXI.Application.prototype.getEntityMap = new EntityMap();

       // game.getEntityMap.entityMap.push(new Monster(MonsterType.list.DRAGON, 16162, 31730));
        //game.getEntityMap.entityMap.push(new Projectile(ProjectileType.list.BASIC, 1600, 1600));
        //game.getTileGrid.tileMap.push(new Tile(TileType.list.GRASS, 32, 32));
        //this.add.image(400, 300, 'star');


        //Overlay
        this.fpsOverlay = new FPSOverlay();
    }

    close() {
        this.fpsOverlay.clearObjects();

        game.getPlayer.kill();
        game.getUI.clearObjects();
        game.getTileGrid.clearObjects();
        game.getEntityMap.clearObjects();
    }


    update() {
        this.camera.update();
        game.getPlayer.update();
        game.getTileGrid.update();
        game.getEntityMap.update();

        //FPS TEST
        this.fpsOverlay.update();
    }

    get getCamera() {
        return this.camera;
    }
}