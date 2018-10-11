import $ from 'jquery';
import game from "index";

export default class UserInterface {

    constructor() {
        this.uiObjects = [];
        this.windowObjects = [];
        this.currentScreen;

        //Universal update method
        game.ticker.add(() => this.update());

        //Fix Browser resize offset.
        $(window).resize(() => this.onResize());
    }

    //Objects

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
