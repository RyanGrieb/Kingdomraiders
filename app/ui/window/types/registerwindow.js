import game from "index";

import CustomWindow from "../customwindow";
import CustomSprite from "../../custom/customsprite";
import TextBox from "../../custom/textbox";
import Button from "../../custom/button";
import CustomText from "../../custom/customtext";
import LoginWindow from "./loginwindow";

export default class RegisterWindow extends CustomWindow {

    constructor() {
        super("RegisterWindow");
    }

    open() {
        var background = new CustomSprite("GRAYMENU", (game.WIDTH / 2) - (300 / 2), (game.HEIGHT / 3) - 25, 300, 425);
        this.addUI(background);

        this.addUI(new TextBox("txtUsername", background.x + (background.w / 2 - 200 / 2), background.y + 95, 200, 35));
        this.addUI(new TextBox("txtEmail", background.x + (background.w / 2 - 200 / 2), background.y + 162, 200, 35));
        this.addUI(new TextBox("txtPassword", background.x + (background.w / 2 - 200 / 2), background.y + 228, 200, 35));
        this.addUI(new TextBox("txtPasswordAgain", background.x + (background.w / 2 - 200 / 2), background.y + 293, 200, 35));

        this.addUI(new Button("btnRegisterAccount", "Register Account", background.x + (background.w / 2 - 178 / 2), background.y + 360, 178, 35, 115, 35));

        this.addUI(new CustomText("txtInfoSignIn", "Register Account", "#ffffff", background.x + 70, background.y + 15, 123, 35));

        this.addUI(new CustomText("txtInfoUsername", "Username", "#ffffff", background.x + background.w / 2, background.y + 82, 130, 35));
        this.addUI(new CustomText("txtInfoEmail", "Email", "#ffffff", background.x + background.w / 2, background.y + 150, 130, 35));
        this.addUI(new CustomText("txtInfoPassword", "Password", "#ffffff", background.x + background.w / 2, background.y + 217, 130, 35));
        this.addUI(new CustomText("txtInfoPasswordAgain", "Re-Enter Password", "#ffffff", background.x + background.w / 2, background.y + 282, 130, 35));

        var errorMessage = (new CustomText("txtErrorMessage", "", "#ffffff", background.x + background.w / 2, background.y + 50, 130, 35));
        this.addUI(errorMessage);


        //Close other windows..
        if (game.getUI.isWindowOpen("LoginWindow"))
            game.getUI.toggleWindow(new LoginWindow());

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

    handleResponse(error) {
        game.getUI.getObjectByName("txtErrorMessage").setText("Error: " + error.reason);
    }
}