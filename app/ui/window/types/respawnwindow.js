import game from "index";

import CustomWindow from "../customwindow";
import CustomSprite from "../../custom/customsprite";
import TextBox from "../../custom/textbox";
import Button from "../../custom/button";
import CustomText from "../../custom/customtext";
import RegisterWindow from "./registerwindow";

export default class RespawnWindow extends CustomWindow {

    constructor() {
        super("RespawnWindow");

        this.setParentGroup(game.getUI.parentGroup.positive5);
    }

    open() {
        var body = new CustomSprite("DARKBACKGROUND", 0, 0, game.WIDTH, game.HEIGHT);
        this.addUI(body);

        this.addUI(new CustomText("txtInfoYouDied", "You Died!", "#ffffff", game.WIDTH / 2, game.HEIGHT / 2 - 100, 200, -1));
        this.addUI(new Button("btnRespawn", "Respawn", game.WIDTH / 2 - 178 / 2, game.HEIGHT / 2 - 45 / 2, 178, 45, 115, 35));
    }

    close() {
        super.close();
    }
}