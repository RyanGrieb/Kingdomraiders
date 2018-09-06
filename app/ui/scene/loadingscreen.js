import game from "index";

import UIObjectEnum from "ui/custom/object/uiobjectenum";
import CustomText from "ui/custom/customtext";
import TileType from '../../world/tile/tiletype';
import Screen from "./screen";
import Button from "../custom/button";

export default class LoadingScreen extends Screen {


    constructor() {
        super("LoadingScreen");

        this.loader = new PIXI.loaders.Loader();
    }

    open() {
        //UI
        for (var name in UIObjectEnum.list) {

            var obj = UIObjectEnum.list[name];
            this.loader.add(name, obj.path);
        }

        // listen to the progress event
        this.loader.on('progress', function (loader, res) {
            console.log(loader.progress);
            // text.text = loader.progress;
        })

        // listen to the complete event, it will be fired when everything is loaded
        this.loader.on('complete', function (loader, res) {

            //Assign loaded sprites back to our enums

            //UI
            for (var name in UIObjectEnum.list) {
                UIObjectEnum.list[name].texture = loader.resources[name].texture;
            }
            //TILES
            //..

            game.getNetwork.connect();
        });
        // start loading
        this.loader.load();
    }

    close() {

    }

    update() {

    }

}