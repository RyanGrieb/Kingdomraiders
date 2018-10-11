import game from "index";
import Player from "../player";
import { setInterval } from "timers";

export default class PlayerMovement {
    constructor() {
        this.heldKeys = [];

        //The last location the player passed a tile..
        this.pastTilePass = {
            x: 0,
            y: 0
        }

        //Previous location sent by the packet
        this.previousX = 0;
        this.previousY = 0;

        //The Players current velocity..
        this.velocity = {
            x: 0,
            y: 0
        }

        //Camera rotation
        this.cameraRotation = {
            left: false,
            right: false
        }

        //Update movement every 100ms.
        setInterval(this.sendMovementUpdate, 100);
    }

    updatePosition(x, y) {

        if (game.getPlayer.sprite != null) {
            var camera = game.getUI.getCurrentScreen.getCamera;

            //Incorrect.
            game.getPlayer.sprite.setPosition(x, y);
        }
        else {
            //Player origin
            Player.prototype.spawnX = x;
            Player.prototype.spawnY = y;
        }
    }


    handleInput(e) {
        switch (e.keyCode) {

            //Movement

            //D
            case 68:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "D")
                        return;

                this.heldKeys.push({ key: "D", x: 5 });
                break;

            //A
            case 65:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "A")
                        return;

                this.heldKeys.push({ key: "A", x: -5 });
                break;

            //S
            case 83:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "S")
                        return;

                this.heldKeys.push({ key: "S", y: 5 });
                break;

            //W
            case 87:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "W")
                        return;

                this.heldKeys.push({ key: "W", y: -5 });
                break;

            //Camera rotation

            //Q
            case 81:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "Q")
                        return;

                this.heldKeys.push({ key: "Q", left: true });
                break;

            case 69:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "E")
                        return;

                this.heldKeys.push({ key: "E", right: true });
                break;

        }
    }

    handleInputRelease(e) {
        switch (e.keyCode) {

            //Movement

            //D
            case 68:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "D") {

                        this.velocity.x = 0;
                        this.heldKeys.splice(i, 1);
                    }
                break;

            //A
            case 65:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "A") {

                        this.velocity.x = 0;
                        this.heldKeys.splice(i, 1);
                    }
                break;

            //S
            case 83:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "S") {

                        this.velocity.y = 0;
                        this.heldKeys.splice(i, 1);
                    }
                break;

            //W
            case 87:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "W") {

                        this.velocity.y = 0;
                        this.heldKeys.splice(i, 1);
                    }
                break;

            //Camera rotation

            //Q
            case 81:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "Q") {

                        this.cameraRotation.left = false;
                        this.heldKeys.splice(i, 1);
                    }
                break;

            //E
            case 69:
                for (var i = 0; i < this.heldKeys.length; i++)
                    if (this.heldKeys[i].key === "E") {

                        this.cameraRotation.right = false;
                        this.heldKeys.splice(i, 1);
                    }
                break;
        }
    }

    handleMovement() {
        if (this.heldKeys.length == 0)
            return;

        for (var i = 0; i < this.heldKeys.length; i++) {
            var heldKey = this.heldKeys[i].key;

            //Movement
            if (heldKey == "W" || heldKey == "A" || heldKey == "S" || heldKey == "D") {

                if (this.heldKeys[i].x != null)
                    this.velocity.x = this.heldKeys[i].x;

                if (this.heldKeys[i].y != null)
                    this.velocity.y = this.heldKeys[i].y;
            }

            //Camera rotation
            if (heldKey == "Q" || heldKey == "E") {

                if (this.heldKeys[i].left != null) {
                    this.cameraRotation.left = this.heldKeys[i].left;
                    this.cameraRotation.right = false;
                }

                if (this.heldKeys[i].right != null) {
                    this.cameraRotation.left = false;
                    this.cameraRotation.right = this.heldKeys[i].right;
                }
            }
        }

        //Set player velocity based off held keys

        var distanceX = this.velocity.x;
        var distanceY = this.velocity.y;
        var hypotnuse = Math.sqrt(((this.velocity.x * this.velocity.x) + (this.velocity.y * this.velocity.y)));

        //console.log(distanceX + "," + distanceY);

        var distanceX = (distanceX / hypotnuse);
        var distanceY = (distanceY / hypotnuse);


        //Normalize like mpplayer.
        if (hypotnuse !== 0)
            game.getPlayer.sprite.setVelocity(distanceX * 5, distanceY * 5);

        //Set camera rotation
        game.getUI.getCurrentScreen.camera.setRotation(this.cameraRotation.left, this.cameraRotation.right);
    }

    sendMovementUpdate() {
        if (game.getPlayer.inGame)
            if (game.getPlayer.getX !== this.previousX || game.getPlayer.getY !== this.previousY) {

                var msg = {
                    type: "MovementUpdate",
                    x: game.getPlayer.getX,
                    y: game.getPlayer.getY,
                };

                game.getNetwork.sendMessage(JSON.stringify(msg));
                this.previousX = game.getPlayer.getX;
                this.previousY = game.getPlayer.getY;
            }
    }

    clearKeys() {
        this.heldKeys = [];
    }

    update() {
        if (game.getPlayer.inGame) {
            this.handleMovement();
        }
    }

}