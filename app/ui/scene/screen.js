export default class Screen {
    constructor(name) {
        this.name = name;
    }

    open() {

    }

    close() {

    }

    update() {
        game.getPlayer.update();
    }
}