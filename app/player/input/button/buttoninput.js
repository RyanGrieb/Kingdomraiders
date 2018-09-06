import game from "../../..";
import LoginWindow from "../../../ui/window/types/loginwindow";
import RegisterWindow from "../../../ui/window/types/registerwindow";

export default class ButtonInput {
    constructor() {

        this.ButtonActions = {

            list: {

                btnPlay: {
                    action: () => {
                        if (!game.getPlayer.isLoggedIn) {

                            //If a window is already open
                            if (game.getUI.windowObjects.length >= 1)
                                return;

                            game.getUI.toggleWindow(new LoginWindow());
                        } else {
                            game.getPlayer.joinGame()
                        }
                    }
                },
                btnLogin: {
                    action: () => {
                        game.getUI.toggleWindow(new LoginWindow());
                    }
                },
                btnRegister: {
                    action: () => {
                        game.getUI.toggleWindow(new RegisterWindow());
                    }
                },

                //Login Screen
                btnSignIn: {
                    action: () => {
                        game.getUI.getWindowByName("LoginWindow").requestToLogin();
                    }
                },
                //Register Screen
                btnRegisterAccount: {
                    action: () => {
                        game.getUI.getWindowByName("RegisterWindow").requestToRegister();
                    }
                }
            }

        }
    }

    checkButton(name) {
        for (var currName in this.ButtonActions.list) {
            if (name === currName)
                this.ButtonActions.list[currName].action();
        }
    }

}