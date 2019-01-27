import game from "../../..";
import LoginWindow from "../../../ui/window/types/loginwindow";
import RegisterWindow from "../../../ui/window/types/registerwindow";
import EscapeWindow from "../../../ui/window/types/escapewindow";
import MenuScreen from "../../../ui/scene/menuscreen";
import BuildWindow from "../../../ui/window/types/buildwindow";
import SettingsWindow from "../../../ui/window/types/settingswindow";

export default class ButtonInput {
    constructor() {

        this.ButtonActions = {

            list: {

                //TODO: sepertate these into the respecive window classes
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
                        if (game.getUI.getWindowByName("LoginWindow") !== undefined) {
                            if (!game.getUI.getWindowByName("LoginWindow").lockedInput)
                                game.getUI.toggleWindow(new RegisterWindow());
                        } else
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
                        if (!game.getUI.getWindowByName("LoginWindow").lockedInput)
                            game.getPlayer.playerProfile.requestToLogin();
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
                btnMainMenuBack: {
                    action: () => {
                        game.getUI.toggleWindow(new EscapeWindow());
                        return true;
                    }
                },

                btnMainMenu: {
                    action: () => {
                        game.getNetwork.sendMessage(JSON.stringify({ type: "LeaveGame", }));
                        game.getUI.setScreen(new MenuScreen());
                        return true;
                    }
                },

                btnSettings: {
                    action: () => {
                        game.getUI.toggleWindow(new EscapeWindow());
                        game.getUI.toggleWindow(new SettingsWindow());
                        return true;
                    }
                },

                btnSettingsBack: {
                    action: () => {
                        game.getUI.toggleWindow(new SettingsWindow());
                        game.getUI.toggleWindow(new EscapeWindow());
                        return true;
                    }
                },

                btnAyncChunkSetting: {
                    action: () => {
                        game.getPlayer.playerSettings.toggleSetting("asyncChunkLoading");
                        return true;
                    }
                },

                btnChunkDebugSetting: {
                    action: () => {
                        game.getPlayer.playerSettings.toggleSetting("chunkDebug");
                        return true;
                    }
                },

                btnBuild: {
                    action: () => {
                        game.getUI.toggleWindow(new EscapeWindow());
                        game.getUI.toggleWindow(new BuildWindow());

                        return true;
                    }
                },

                btnRespawn: {
                    action: () => {
                        game.getNetwork.sendMessage(JSON.stringify({ type: "Respawn", }));
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