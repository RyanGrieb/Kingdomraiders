import game from "index";

import AssetsEnum from "../../world/assets/assetsenum";
import CustomText from "ui/custom/customtext";
import TileType from '../../world/tile/tiletype';
import Screen from "./screen";
import Button from "../custom/button";

export default class LoadingScreen extends Screen {


    constructor() {
        super("LoadingScreen");

        this.loader = new PIXI.loaders.Loader();
        this.graphics = new PIXI.Graphics();

        this.renderProgressBar();
    }

    open() {
        //UI
        for (var name in AssetsEnum.list) {

            var obj = AssetsEnum.list[name];
            this.loader.add(name, obj.path);
        }

        // listen to the progress event
        this.loader.on('progress', (loader, res) => {
            this.updateProgressBar();
            // text.text = loader.progress;
        })

        // listen to the complete event, it will be fired when everything is loaded
        this.loader.on('complete', (loader, res) => {

            //Assign loaded sprites back to our enums

            //UI
            for (var name in AssetsEnum.list) {
                AssetsEnum.list[name].texture = loader.resources[name].texture;
            }
            //TILES
            //..

            game.getNetwork.connect();
            this.loadingtext.text = "Connecting...";
        });
        // start loading
        this.loader.load();
    }

    close() {
        game.getUI.clearObjects();

        this.loadingtext.destroy();
        this.graphics.destroy();
    }

    renderProgressBar() {
        //Loading text
        this.loadingtext = new PIXI.Text('Loading:   0%', { fill: '#ffffff', fontFamily: '12px Times New Roman', wordWrap: true, wordWrapWidth: 700 });
        this.loadingtext.x = (game.WIDTH / 2 - this.loadingtext.width / 2);
        this.loadingtext.y = (game.HEIGHT / 2 - this.loadingtext.height / 2) - 35;
        game.stage.addChild(this.loadingtext);

        //Progress bar base.
        this.graphics.beginFill(0x778899);

        this.graphics.drawRect(game.WIDTH / 2 - 300 / 2, game.HEIGHT / 2 - 35 / 2, 300, 35);
        game.stage.addChild(this.graphics);
    }

    updateProgressBar() {
        //Progress bar inside.
        this.graphics.beginFill(0xDCDCDC);

        var width = 290 * (this.loader.progress / 100);

        this.graphics.drawRect(game.WIDTH / 2 - 290 / 2, game.HEIGHT / 2 - 25 / 2, width, 25);
        game.stage.addChild(this.graphics);

        this.loadingtext.text = "Loading: " + parseInt(this.loader.progress) + "%";
    }

    update() {

    }

}