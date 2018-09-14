import game from "index";

export default class Camera {

    constructor() {
        this.position = {
            x: 0,
            y: 0,

            set(x, y) {
                this.x = x;
                this.y = y;
            }
        }

        this.pivot = {};

        this.position.set(game.WIDTH / 2, game.HEIGHT / 2);
        this.pivot.x = game.getPlayer.getX;
        this.pivot.y = game.getPlayer.getY;


    }

    update() {
        var targetPivotX = game.getPlayer.getX;
        var targetPivotY = game.getPlayer.getY;

        // or you can just assign targetpivot to pivot
        this.pivot.x = (targetPivotX - this.pivot.x) * 1 + this.pivot.x;
        this.pivot.y = (targetPivotY - this.pivot.y) * 1 + this.pivot.y;
    }
}