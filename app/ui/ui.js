import $ from 'jquery';
import game from "index";

export default class UserInterface {

    constructor() {
        this.uiObjects = [];
        this.windowObjects = [];
        this.currentScreen;

        this.createLayers();

        //Universal update method
        game.ticker.add(() => this.update());

        //Fix Browser resize offset.
        $(window).resize(() => this.onResize());
    }

    createLayers() {
        this.negativeParentGroup3 = new PIXI.display.Group(-3, false);
        game.stage.addChild(new PIXI.display.Layer(this.negativeParentGroup3));

        this.negativeParentGroup2 = new PIXI.display.Group(-2, false);
        game.stage.addChild(new PIXI.display.Layer(this.negativeParentGroup2));

        this.negativeParentGroup1 = new PIXI.display.Group(-1, false);
        game.stage.addChild(new PIXI.display.Layer(this.negativeParentGroup1));

        this.parentGroup1 = new PIXI.display.Group(1, false);
        game.stage.addChild(new PIXI.display.Layer(this.parentGroup1));

        this.parentGroup2 = new PIXI.display.Group(2, false);
        game.stage.addChild(new PIXI.display.Layer(this.parentGroup2));

        this.parentGroup3 = new PIXI.display.Group(3, false);
        game.stage.addChild(new PIXI.display.Layer(this.parentGroup3));

        this.parentGroup4 = new PIXI.display.Group(4, false);
        game.stage.addChild(new PIXI.display.Layer(this.parentGroup4));
    }

    //Objects

    pushObject(obj) {
        if (obj.customSprite !== undefined) {
            obj.customSprite.parentGroup = this.parentGroup2;
        }
    }

    clearObjects() {
        for (var i = 0; i < this.uiObjects.length; i++)
            this.uiObjects[i].kill();

        this.uiObjects = [];

        //Also close any windows
        for (var i = 0; i < this.windowObjects.length; i++)
            this.windowObjects[i].close();

        this.windowObjects = [];

    }

    removeObject(name) {
        for (var i = 0; i < this.uiObjects.length; i++) {

            if (this.uiObjects[i].name === name) {
                this.uiObjects[i].kill();
                this.uiObjects.splice(i, 1);
            }
        }
    }

    getObjectByName(name) {
        for (var i = 0; i < this.uiObjects.length; i++) {

            if (this.uiObjects[i].name === name)
                return this.uiObjects[i];
        }
    }

    //Windows

    toggleWindow(window) {
        //If we find an existing window close & return
        for (var i = 0; i < this.windowObjects.length; i++) {
            if (this.windowObjects[i].name === window.name) {
                this.windowObjects[i].close();
                this.windowObjects.splice(i, 1);
                return;
            }
        }

        //If we don't, open a new window
        //Need to create a new Object
        this.windowObjects.push(window);
        window.open();
    }

    getWindowByName(windowName) {
        for (var i = 0; i < this.windowObjects.length; i++) {
            if (this.windowObjects[i].name == windowName)
                return this.windowObjects[i];
        }
    }

    isWindowOpen(windowName) {
        for (var i = 0; i < this.windowObjects.length; i++) {
            if (this.windowObjects[i].name === windowName)
                return windowName;
        }
    }

    isAnyWindowOpenExcept(windowName) {
        for (var i = 0; i < this.windowObjects.length; i++) {
            if (this.windowObjects[i].name !== windowName)
                return true;
        }

        return false;
    }

    //Screens
    setScreen(screen) {
        if (this.currentScreen != null)
            this.currentScreen.close();

        this.currentScreen = screen;
        screen.open();
    }

    get getCurrentScreen() {
        return this.currentScreen;
    }

    update() {
        this.currentScreen.update();
    }

    onResize() {
        game.renderer.resize(window.innerWidth, window.innerHeight);
    }
}
