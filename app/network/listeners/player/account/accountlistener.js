import game from "index";
import LoginWindow from "../../../../ui/window/types/loginwindow";
import RegisterWindow from "../../../../ui/window/types/registerwindow";

export default class AccountListener {
    constructor() {

    }

    handleMessage(message) {
        var json = JSON.parse(message.data);

        switch (json.type) {

            case "AssignID":
                console.log("assigning id:" + json.id);
                this.id = json.id;
                break;

            case "LoginRequest":
                this.handleLoginResponse(json);
                break;

            case "RegisterRequest":
                this.handleRegisterResponse(json);
                break;
        }
    }

    handleLoginResponse(json) {

        if (json.response === "accepted") {
            game.getPlayer.loggedIn = true;

            game.getUI.getCurrentScreen.setLoggedIn();
            game.getUI.toggleWindow(new LoginWindow());
        }

        if (json.response === "rejected") {
            game.getUI.getWindowByName("LoginWindow").handleResponse(json);
        }
    }

    handleRegisterResponse(json) {

        if (json.response === "accepted") {
            console.log("Sucessfuly Registered");
            game.getUI.toggleWindow(new RegisterWindow());
        }

        if (json.response === "rejected") {
            game.getUI.getWindowByName("RegisterWindow").handleResponse(json);
        }
    }
}