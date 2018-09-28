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
        this.addUI(new CustomSprite("GRAYMENU", (game.WIDTH / 2) - (300 / 2), (game.HEIGHT / 3) - 25, 300, 425));

        this.addUI(new TextBox("txtUsername", (game.WIDTH / 2) - (200 / 2), (game.HEIGHT / 2) - 57, 200, 35));
        this.addUI(new TextBox("txtEmail", (game.WIDTH / 2) - (200 / 2), (game.HEIGHT / 2) + 10, 200, 35));
        this.addUI(new TextBox("txtPassword", (game.WIDTH / 2) - (200 / 2), (game.HEIGHT / 2) + 75, 200, 35));
        this.addUI(new TextBox("txtPasswordAgain", (game.WIDTH / 2) - (200 / 2), (game.HEIGHT / 2) + 140, 200, 35));

        this.addUI(new Button("btnRegisterAccount", "Register Account", (game.WIDTH / 2) - (178 / 2), (game.HEIGHT / 2) + 215, 178, 35, 115, 35));

        this.addUI(new CustomText("txtInfoSignIn", "Register Account", (game.WIDTH / 2) - 78, (game.HEIGHT / 3.1), 130, 35));

        this.addUI(new CustomText("txtInfoUsername", "Username", (game.WIDTH / 2), (game.HEIGHT / 2) - 68, 130, 35));
        this.addUI(new CustomText("txtInfoEmail", "Email", (game.WIDTH / 2), (game.HEIGHT / 2) - 1, 130, 35));
        this.addUI(new CustomText("txtInfoPassword", "Password", (game.WIDTH / 2), (game.HEIGHT / 2) + 64, 130, 35));
        this.addUI(new CustomText("txtInfoPasswordAgain", "Re-Enter Password", (game.WIDTH / 2), (game.HEIGHT / 2) + 130, 130, 35));

        var errorMessage = (new CustomText("txtErrorMessage", "", (game.WIDTH / 2), (game.HEIGHT / 2) - 100, 130, 35));
        this.addUI(errorMessage);


        //Close other windows..
        if (game.getUI.isWindowOpen("LoginWindow"))
            game.getUI.toggleWindow(new LoginWindow());

        //Highlight the 1st textbox.
        game.getUI.uiObjects[5].select();
    }

    close() {
        super.close();

        //Prevent mouse from staying in one state.
        document.querySelector('body').style.cursor = 'auto';
    }


    requestToRegister() {
        var username = game.getUI.getObjectByName("txtUsername").getText;
        var email = game.getUI.getObjectByName("txtEmail").getText;
        var password = game.getUI.getObjectByName("txtPassword").getText;
        var passwordAgain = game.getUI.getObjectByName("txtPasswordAgain").getText;

        //TODO: same password check..

        var msg = {
            type: "RegisterRequest",
            username: username,
            email: email,
            password: password,
            response: "request",
            date: Date.now()
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    handleResponse(error) {
        game.getUI.getObjectByName("txtErrorMessage").setText("Error: " + error.reason);
    }
}