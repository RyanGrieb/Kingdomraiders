/**
 * Application entry point
 */

// Load application styles
import "styles/index.scss";
import * as PIXI from "pixi.js";

import UserInterface from "./ui/ui";
import Player from "./player/player";
import Network from "./network/network";
import LoadingScreen from "./ui/scene/loadingscreen";

var sceneManager;
var game;

function initGame() {
    //Apply settings here..
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    game = new PIXI.Application(window.innerWidth, window.innerHeight, { backgroundColor: 0x1099bb });
    document.body.appendChild(game.view);
}

function initConfigurations() {
    //Our configurations..
    PIXI.Application.prototype.getUI = new UserInterface();
    PIXI.Application.prototype.getPlayer = new Player();
    PIXI.Application.prototype.getNetwork = new Network();

    game.getUI.setScreen(new LoadingScreen());
}

initGame();
export default game;

initConfigurations();