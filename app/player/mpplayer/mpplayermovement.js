import game from "index";

export default class MPPlayerMovement {

    constructor(mpPlayer) {
        //Misc helper variables
        this.camera = game.getUI.getCurrentScreen.getCamera;

        this.mpPlayer = mpPlayer;

        this.finalTarget = undefined;
        this.rotation = 0;
    }

    recivePosition(json) {
        this.finalTarget = {
            x: json.x,
            y: json.y,
        }
    }

    moveToFinalTarget() {
        //Thanks to Ranner for help
        var distanceX = (this.finalTarget.x - this.mpPlayer.x);
        var distanceY = (this.finalTarget.y - this.mpPlayer.y);

        var hypotnuse = Math.sqrt(((distanceX * distanceX) + (distanceY * distanceY)));

        if (hypotnuse === 0)
            return;


        distanceX = (distanceX / hypotnuse);
        distanceY = (distanceY / hypotnuse);


        if (hypotnuse < -5 || hypotnuse > 5)
            this.mpPlayer.setVelocity(distanceX * 5, distanceY * 5);

    }

    update() {
        if (this.finalTarget !== undefined)
            this.moveToFinalTarget();
    }
}