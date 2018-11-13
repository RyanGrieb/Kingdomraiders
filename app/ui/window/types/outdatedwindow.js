import game from "index";

import CustomWindow from "../customwindow";
import CustomSprite from "../../custom/customsprite";
import TextBox from "../../custom/textbox";
import Button from "../../custom/button";
import CustomText from "../../custom/customtext";
import RegisterWindow from "./registerwindow";
import TileType from "../../../world/tile/tiletype";
import AssetsEnum from "../../../world/assets/assetsenum";

export default class OutdatedWindow extends CustomWindow {

    constructor() {
        super("OutdatedWindow");
    }

    open() {
        game.getUI.removeObject("btnLogin");
        game.getUI.removeObject("btnRegister");

        var body = new CustomSprite("GRAYMENU", (game.WIDTH / 2) - (350 / 2), (game.HEIGHT / 3), 350, 300);
        this.addUI(body);

        this.addUI(new CustomText("txtInfoOutdated", "Outdated Browser!", "#ffffff", body.x + body.w / 2, (game.HEIGHT / 2.80), 130, 35));
        this.addUI(new CustomText("txtInfoOutdated2", "Please use a modern browser to play.", "#ffffff", body.x + body.w / 2, (game.HEIGHT / 1.85), 130, 35));


    }

    close() {
        super.close();
    }

    static checkOutdated() {
        var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
        var msie = ua.indexOf('MSIE '); // IE 10 or older
        var trident = ua.indexOf('Trident/'); //IE 11

        if ((msie > 0 || trident > 0))
            game.getUI.toggleWindow(new OutdatedWindow());
    }
}