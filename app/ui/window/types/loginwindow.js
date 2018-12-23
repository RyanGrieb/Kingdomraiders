import game from "index";

import CustomWindow from "../customwindow";
import CustomSprite from "../../custom/customsprite";
import TextBox from "../../custom/textbox";
import Button from "../../custom/button";
import CustomText from "../../custom/customtext";
import RegisterWindow from "./registerwindow";

export default class LoginWindow extends CustomWindow {

    constructor() {
        super("LoginWindow");

        this.lockedInput = false;
    }

    open() {
        this.addUI(new CustomSprite("GRAYMENU", (game.WIDTH / 2) - (300 / 2), (game.HEIGHT / 3), 300, 300));

        this.addUI(new TextBox("txtEmail", (game.WIDTH / 2) - (200 / 2), game.HEIGHT / 2.25, 200, 35));
        this.addUI(new TextBox("txtPassword", (game.WIDTH / 2) - (200 / 2), game.HEIGHT / 1.9, 200, 35));

        this.addUI(new Button("btnSignIn", "Sign In", (game.WIDTH / 2) - (178 / 2), (game.HEIGHT / 2) + 75, 178, 35, 115, 35));
        this.addUI(new Button("btnRegister", "Register Account", (game.WIDTH / 2) - (178 / 2), (game.HEIGHT / 2) + 125, 178, 35, 115, 35));


        this.addUI(new CustomText("txtInfoSignIn", "Sign In", "#ffffff", (game.WIDTH / 2) - 115, (game.HEIGHT / 2.80), 130, 35));

        this.addUI(new CustomText("txtInfoUsername", "Email", "#ffffff", (game.WIDTH / 2), (game.HEIGHT / 2) - 53, 130, 35));
        this.addUI(new CustomText("txtInfoUsername", "Password", "#ffffff", (game.WIDTH / 2), (game.HEIGHT / 2) + 10, 130, 35));

        this.addUI(new CustomText("txtErrorMessage", "", "#ffffff", (game.WIDTH / 2), (game.HEIGHT / 2) - 80, 130, 35));

        //Close other windows..
        //Close other windows..
        if (game.getUI.isWindowOpen("RegisterWindow"))
            game.getUI.toggleWindow(new RegisterWindow());

        //Highlight the 1st textbox.
        for (var i = 0; i < game.getUI.uiObjects.length; i++)
            if (game.getUI.uiObjects[i] instanceof TextBox) {
                game.getUI.uiObjects[i].select();
                break;
            }

    }

    close() {
        super.close();

        //Prevent mouse from staying in one state.
        document.querySelector('body').style.cursor = 'auto';
    }

    lockInput() {
        game.getUI.getObjectByName("txtErrorMessage").setText("Please Wait...");
        this.lockedInput = true;
    }

    unlockInput() {
        this.lockedInput = false;
    }

    handleResponse(error) {
        game.getUI.getObjectByName("txtErrorMessage").setText("Error: " + error.reason);
        this.lockedInput = false;
    }
}