import game from "index";

import CustomWindow from "../customwindow";
import CustomSprite from "../../custom/customsprite";
import TextBox from "../../custom/textbox";
import Button from "../../custom/button";
import CustomText from "../../custom/customtext";
import RegisterWindow from "./registerwindow";

export default class EscapeWindow extends CustomWindow {

    constructor() {
        super("EscapeWindow");

        this.group = new PIXI.display.Group(4, false);
        game.stage.addChild(new PIXI.display.Layer(this.group));
    }

    open() {
        var body = new CustomSprite("GRAYMENU", (game.WIDTH / 2) - (250 / 2), (game.HEIGHT / 3), 250, 300);
        body.customSprite.parentGroup = this.group;
        this.addUI(body);

        var lblEscapeInfo = new CustomText("lblEscapeInfo", "Options", (game.WIDTH / 2), (game.HEIGHT / 3) + 15, 125, -1);
        lblEscapeInfo.customText.parentGroup = this.group;
        this.addUI(lblEscapeInfo);

        var btnMainMenu = new Button("btnMainMenu", "Main Menu", (game.WIDTH / 2) - (125 / 2), (game.HEIGHT / 3) + 50, 125, 35, 100, 100);
        btnMainMenu.buttonSprite.parentGroup = this.group;
        btnMainMenu.buttonText.customText.parentGroup = this.group;
        this.addUI(btnMainMenu);

        var btnSettings = new Button("btnSettings", "Settings", (game.WIDTH / 2) - (125 / 2), (game.HEIGHT / 3) + 100, 125, 35, 100, 100);
        btnSettings.buttonSprite.parentGroup = this.group;
        btnSettings.buttonText.customText.parentGroup = this.group;
        this.addUI(btnSettings);

        var btnSettings = new Button("btnBuild", "Build", (game.WIDTH / 2) - (125 / 2), (game.HEIGHT / 3) + 150, 125, 35, 100, 100);
        btnSettings.buttonSprite.parentGroup = this.group;
        btnSettings.buttonText.customText.parentGroup = this.group;
        this.addUI(btnSettings);

        //var body = new CustomSprite("GRAYMENU", (game.WIDTH / 2) - (300 / 2), (game.HEIGHT / 3), 300, 300);
        //body.customSprite.parentGroup = this.group;
        // this.addUI(body);
    }

    close() {
        super.close();
    }
}