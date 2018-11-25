import game from "index";

export default class UIObject {

    constructor(name, x, y, w, h) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    mouseInside() {
        var mouseX = game.renderer.plugins.interaction.mouse.global.x;
        var mouseY = game.renderer.plugins.interaction.mouse.global.y;


        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            return true;
        }

        return false;
    }

}