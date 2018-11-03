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
        //Convert our values to a screenX&Y..
        this.finalTarget = {
            x: json.x,
            y: json.y,
        }
    }

    moveToFinalTarget() {
        //Problem is that our getGamePosition is now offsetted by our camera rotation
        //B/c of this JUST SET FINALTARGET.X&Y TO SCREEN.X&Y POSITIONS FOR ACCURATE TARGETS...

        //Thanks to Ranner for help
        var distanceX = (this.mpPlayer.sprite.getGamePositionX - this.finalTarget.x);
        var distanceY = (this.finalTarget.y - this.mpPlayer.sprite.getGamePositionY);
        console.log(this.finalTarget.x)
        //If the player is lagging behind or tabbed out...
        if (Math.abs(distanceX) > 96 || Math.abs(distanceY) > 96) {
            //(We set our rotation to 0, since were adding a non rotated-location)
            //this.mpPlayer.rotation = 0;
            //this.mpPlayer.setPosition(this.finalTarget.x, this.finalTarget.y);
            return;
        }

        var hypotnuse = Math.sqrt(((distanceX * distanceX) + (distanceY * distanceY)));

        if (hypotnuse === 0)
            return;


        distanceX = (distanceX / hypotnuse);
        distanceY = (distanceY / hypotnuse);

        //TODO: CHECK FOR COLLISION VARS TO STOP MPPLAYER GITCH ON WALL

        //Prevents overextension
        if (hypotnuse < -5 || hypotnuse > 5)
            this.mpPlayer.setVelocity(distanceX * 5, distanceY * 5);

    }

    update() {
        if (this.finalTarget !== undefined)
            this.moveToFinalTarget();
    }
}