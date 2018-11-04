import game from "index";

import CustomWindow from "../customwindow";
import CustomSprite from "../../custom/customsprite";
import TextBox from "../../custom/textbox";
import Button from "../../custom/button";
import CustomText from "../../custom/customtext";
import LoginWindow from "./loginwindow";

export default class SettingsWindow extends CustomWindow {

    constructor() {
        super("SettingsWindow");

        this.setParentGroup(game.getUI.parentGroup.positive4);
    }

    open() {
        this.addUI(new CustomSprite("GRAYMENU", (game.WIDTH / 2) - (500 / 2), (game.HEIGHT / 3) - 25, 500, 300));

        this.addUI(new CustomText("txtSettingsInfo", "Settings", (game.WIDTH / 2), (game.HEIGHT / 3) - 10, 115, -1));

        this.addUI(new Button("btnSettingsBack", "Back", (game.WIDTH / 2) - (500 / 2) + 5, (game.HEIGHT / 3) - 20, 65, 35, 115, -1));

        this.addUI(new Button("btnAyncChunkSetting", "Async Chunk Loading", (game.WIDTH / 2) - (500 / 2) + 100, (game.HEIGHT / 3) + 50, 135, 35, 90, -1));
        this.addUI(new Button("btnChunkDebugSetting", "Chunk Debug", (game.WIDTH / 2) - (500 / 2) + 100, (game.HEIGHT / 3) + 100, 135, 35, 90, -1));
    }

    close() {
        super.close();
    }
}