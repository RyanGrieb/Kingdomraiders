/**
 * Application entry point
 */

// Load application styles
import "styles/index.scss";

//Universal imports
import * as $ from "jquery";
import * as PIXI from "pixi.js";
import "pixi-sound";
import "pixi-layers";
import '@babel/polyfill';

import UserInterface from "./ui/ui";
import Player from "./player/player";
import Network from "./network/network";
import LoadingScreen from "./ui/scene/loadingscreen";

var sceneManager;
var game;

function initGame() {

    //Apply settings here..
    //Fixes blurry sprites & fonts
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    //PIXI.settings.RENDER_OPTIONS.roundPixels = true;
    //PIXI.settings.RENDER_OPTIONS.forceFXAA = true;

    //..
    
    game = new PIXI.Application(window.innerWidth, window.innerHeight, { backgroundColor: 0x1099bb });
    document.body.appendChild(game.view);

    //Post-Object settings..
    game.stage = new PIXI.display.Stage();
    game.stage.group.enableSort = true;
    //..

    console.log("Welcome to Kingdomraiders!")
}

function initConfigurations() {
    //Our configurations..

    PIXI.Application.prototype.WIDTH = $("body").innerWidth();
    PIXI.Application.prototype.HEIGHT = $("body").innerHeight();

    PIXI.Application.prototype.getUI = new UserInterface();
    PIXI.Application.prototype.getPlayer = new Player();
    PIXI.Application.prototype.getNetwork = new Network();

    game.getUI.setScreen(new LoadingScreen());
}

initGame();
export default game;

initConfigurations();