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
        //Send packet Every 10ms-100ms?
        this.finalTarget = {
            x: json.x,
            y: json.y,
        }

        //temp
        //this.mpPlayer.setPosition(json.x, json.y);
    }

    moveToFinalTarget() {
        //Thanks to Ranner for help
        var distanceX = (this.finalTarget.x - this.mpPlayer.x);
        var distanceY = (this.finalTarget.y - this.mpPlayer.y);

        var hypotnuse = Math.sqrt(((distanceX * distanceX) + (distanceY * distanceY)));

        //console.log(distanceX + "," + distanceY);
        if (hypotnuse === 0)
            return;


        distanceX = (distanceX / hypotnuse);
        distanceY = (distanceY / hypotnuse);


        if (hypotnuse < -5 || hypotnuse > 5) {

            console.log(distanceY * 5);
            this.mpPlayer.setVelocity(distanceX * 5, distanceY * 5);
        }




    }

    update() {
        // console.log(this.mpPlayer.x + "?");
        if (this.finalTarget !== undefined)
            this.moveToFinalTarget();
    }
}