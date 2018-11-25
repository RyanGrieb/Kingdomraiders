import game from "index";

import Button from "ui/custom/button";
import CustomSprite from "ui/custom/customsprite";
import TextBox from '../custom/textbox';
import CustomText from '../custom/customtext';
import Screen from './screen';
import MenuOverlay from "../overlay/menuoverlay";
import OutdatedWindow from "../window/types/outdatedwindow";


export default class MenuScreen extends Screen {

    constructor() {
        super("MenuScreen");
    }

    open() {
        this.menuOverlay = new MenuOverlay();

        game.getUI.uiObjects.push(new Button("btnPlay", "Play", (game.WIDTH / 2) - 200 / 2, (game.HEIGHT / 2) + 100, 200, 50, 200, 50));
        game.getUI.uiObjects.push(new CustomSprite("TITLE_IMAGE", (game.WIDTH / 2) - (500 / 2), 175, 500, 200));
        game.getUI.uiObjects.push(new CustomText("txtAuthor", "By Ryan Grieb | KingdomRaiders 1.00", "#ffffff", 125, game.HEIGHT - 15, 100, 20));

        if (!game.getPlayer.loggedIn)
            this.setLoggedOut();
        else
            this.setLoggedIn();

        //Check for bad browsers (i.e internet explorer)
        OutdatedWindow.checkOutdated();
    }

    close() {
        game.getUI.clearObjects();

        this.menuOverlay.clearObjects();
    }

    update() {
        game.getPlayer.update();

        this.menuOverlay.update();
    }

    setLoggedIn() {
        //Add a check for these to see if they exist already. !!!
        game.getUI.removeObject("btnLogin");
        game.getUI.removeObject("btnRegister");

        //Hacked way to center the login info window to the right side.
        var loggedInInfo = new CustomText("txtLoggedInInfo", "Logged in as " + game.getPlayer.playerProfile.name, "#ffffff", -1, 25, 130, 35);
        loggedInInfo.x = ((game.WIDTH - 100) - loggedInInfo.customText.width) + (loggedInInfo.customText.width * 0.5);
        loggedInInfo.kill();
        loggedInInfo.generateText();
        game.getUI.uiObjects.push(loggedInInfo);

        game.getUI.uiObjects.push(new Button("btnSignOut", "Sign Out", game.WIDTH - (95), 25 - (30 / 2), 90, 30, 115, 30));
    }

    setLoggedOut() {
        game.getUI.removeObject("txtLoggedInInfo");
        game.getUI.removeObject("btnSignOut");

        game.getUI.uiObjects.push(new Button("btnLogin", "Login", game.WIDTH - 200, 25, 90, 30, 115, 30));
        game.getUI.uiObjects.push(new Button("btnRegister", "Register", game.WIDTH - 105, 25, 90, 30, 115, 30));
    }

}