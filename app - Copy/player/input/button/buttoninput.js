import game from "../../..";
import LoginWindow from "../../../ui/window/types/loginwindow";
import RegisterWindow from "../../../ui/window/types/registerwindow";
import EscapeWindow from "../../../ui/window/types/escapewindow";
import MenuScreen from "../../../ui/scene/menuscreen";
import BuildWindow from "../../../ui/window/types/buildwindow";

export default class ButtonInput {
    constructor() {

        this.ButtonActions = {

            list: {

                //Menu Screen Buttons
                btnPlay: {
                    action: () => {
                        if (!game.getPlayer.isLoggedIn) {

                            //If a window is already open
                            if (game.getUI.windowObjects.length >= 1)
                                return false;

                            game.getUI.toggleWindow(new LoginWindow());
                        } else {
                            game.getPlayer.joinGame()
                        }

                        return true;
                    }
                },
                btnLogin: {
                    action: () => {
                        game.getUI.toggleWindow(new LoginWindow());


                        return true;
                    }
                },
                btnRegister: {
                    action: () => {
                        game.getUI.toggleWindow(new RegisterWindow());


                        return true;
                    }
                },
                btnSignOut: {
                    action: () => {
                        game.getPlayer.playerProfile.signOut();


                        return true;
                    }
                },

                //Login Screen
                btnSignIn: {
                    action: () => {
                        game.getPlayer.playerProfile.requestToLogin();
                        //game.getUI.getWindowByName("LoginWindow").requestToLogin();

                        return true;
                    }
                },
                //Register Screen
                btnRegisterAccount: {
                    action: () => {
                        game.getPlayer.playerProfile.requestToRegister();
                        // game.getUI.getWindowByName("RegisterWindow").requestToRegister();

                        return true;
                    }
                },

                //Game Screen Buttons
                btnMainMenu: {
                    action: () => {
                        game.getNetwork.sendMessage(JSON.stringify({ type: "LeaveGame", }));
                        game.getUI.setScreen(new MenuScreen());

                        return true;
                    }
                },

                btnBuild: {
                    action: () => {
                        game.getUI.toggleWindow(new EscapeWindow());
                        game.getUI.toggleWindow(new BuildWindow());

                        return true;
                    }
                }
            }

        }
    }

    checkButton(name) {
        for (var currName in this.ButtonActions.list) {
            if (name === currName)
                return this.ButtonActions.list[currName].action();
        }

        return false;
    }

}