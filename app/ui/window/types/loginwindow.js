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
    }

    open() {
        this.addUI(new CustomSprite("GRAYMENU", (window.innerWidth / 2) - (300 / 2), (window.innerHeight / 3), 300, 300));

        this.addUI(new TextBox("txtEmail", (window.innerWidth / 2) - (200 / 2), window.innerHeight / 2.25, 200, 35));
        this.addUI(new TextBox("txtPassword", (window.innerWidth / 2) - (200 / 2), window.innerHeight / 1.9, 200, 35));

        this.addUI(new Button("btnSignIn", "Sign In", (window.innerWidth / 2) - (178 / 2), (window.innerHeight / 2) + 75, 178, 35, 115, 35));
        this.addUI(new Button("btnRegister", "Register Account", (window.innerWidth / 2) - (178 / 2), (window.innerHeight / 2) + 125, 178, 35, 115, 35));


        this.addUI(new CustomText("txtInfoSignIn", "Sign In", (window.innerWidth / 2) - 115, (window.innerHeight / 2.80), 130, 35));

        this.addUI(new CustomText("txtInfoUsername", "Email", (window.innerWidth / 2), (window.innerHeight / 2) - 53, 130, 35));
        this.addUI(new CustomText("txtInfoUsername", "Password", (window.innerWidth / 2), (window.innerHeight / 2) + 10, 130, 35));

        this.addUI(new CustomText("txtErrorMessage", "", (window.innerWidth / 2), (window.innerHeight / 2) - 80, 130, 35));

        //Close other windows..
        //Close other windows..
        if (game.getUI.isWindowOpen("RegisterWindow"))
            game.getUI.toggleWindow(new RegisterWindow());

        //Highlight the 1st textbox.
        game.getUI.uiObjects[5].select();
    }

    close() {
        super.close();

        //Prevent mouse from staying in one state.
        document.querySelector('body').style.cursor = 'auto';
    }

    requestToLogin() {
        var email = game.getUI.getObjectByName("txtEmail").getText;
        var password = game.getUI.getObjectByName("txtPassword").getText;

        var msg = {
            type: "LoginRequest",
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