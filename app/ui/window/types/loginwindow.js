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
        var background = new CustomSprite("GRAYMENU", (game.WIDTH / 2) - (300 / 2), (game.HEIGHT / 3), 300, 300);
        this.addUI(background);

        this.addUI(new TextBox("txtEmail", background.x + (background.w / 2 - 200 / 2), background.y + 85, 200, 35));
        this.addUI(new TextBox("txtPassword", background.x + (background.w / 2 - 200 / 2), background.y + 150, 200, 35));

        this.addUI(new Button("btnSignIn", "Sign In", background.x + (background.w / 2 - 178 / 2), background.y + 200, 178, 35, 115, 35));
        this.addUI(new Button("btnRegister", "Register Account", background.x + (background.w / 2 - 178 / 2), background.y + 250, 178, 35, 115, 35));


        this.addUI(new CustomText("txtInfoSignIn", "Sign In", "#ffffff", background.x + 35, background.y + 15, 130, 35));

        this.addUI(new CustomText("txtInfoUsername", "Email", "#ffffff", background.x + background.w / 2, background.y + 73, 130, 35));
        this.addUI(new CustomText("txtInfoUsername", "Password", "#ffffff", background.x + background.w / 2, background.y + 137, 130, 35));

        this.addUI(new CustomText("txtErrorMessage", "", "#ffffff", background.x + background.w / 2, background.y + 45, 130, 35));

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