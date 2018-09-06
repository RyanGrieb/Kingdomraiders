import game from "index";

import Button from "ui/custom/button";
import CustomSprite from "ui/custom/customsprite";
import TextBox from '../custom/textbox';
import CustomText from '../custom/customtext';
import Screen from './screen';


export default class MenuScreen extends Screen {

    constructor() {
        super("MenuScreen");
    }

    open() {

        game.getUI.uiObjects.push(new Button("btnPlay", "Play", (window.innerWidth / 2) - 200 / 2, (window.innerHeight / 2) + 100, 200, 50, 200, 50));
        game.getUI.uiObjects.push(new CustomSprite("TITLEIMAGE", (window.innerWidth / 2) - (500 / 2), 175, 500, 200));

        this.setLoggedOut();
        // this.add.image(400, 300, 'sky');
        //this.add.image(400, 300, 'star');

    }

    close() {

    }

    update() {
        game.getPlayer.update();
    }

    setLoggedIn() {
        game.getUI.removeObject("btnLogin");
        game.getUI.removeObject("btnRegister");

        //Hacked way to center the login info window to the right side.
        var loggedInInfo = new CustomText("txtLoggedInInfo", "Logged in as " + game.getPlayer.playerProfile.name, -1, 25, 130, 35);
        loggedInInfo.x = ((window.innerWidth - 100) - loggedInInfo.customText.width) + (loggedInInfo.customText.width * 0.5);
        loggedInInfo.kill();
        loggedInInfo.generateText();
        game.getUI.uiObjects.push(loggedInInfo);

        game.getUI.uiObjects.push(new Button("btnSignOut", "Sign Out", window.innerWidth - (95), 25 - (30 / 2), 90, 30, 115, 30));
    }

    setLoggedOut() {


        game.getUI.uiObjects.push(new Button("btnLogin", "Login", window.innerWidth - 200, 25, 90, 30, 115, 30));
        game.getUI.uiObjects.push(new Button("btnRegister", "Register", window.innerWidth - 105, 25, 90, 30, 115, 30));
    }

}