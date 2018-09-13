import game from "index";
import Player from "../player";

export default class PlayerMovement {
    constructor() {
        this.heldKeys = [];

        //The last location the player passed a tile..
        this.pastTilePass = {
            x: 0,
            y: 0
        }

        //The Players current velocity..
        this.velocity = {
            x: 0,
            y: 0
        }
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

        }
    }

    handleInputRelease(e) {
        switch (e.keyCode) {
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
        }
    }

    handleMovement() {
        if (this.heldKeys.length == 0)
            return;

        for (var i = 0; i < this.heldKeys.length; i++) {

            if (this.heldKeys[i].x != null)
                this.velocity.x = this.heldKeys[i].x;

            if (this.heldKeys[i].y != null)
                this.velocity.y = this.heldKeys[i].y;
        }

        game.getPlayer.sprite.setVelocity(this.velocity.x, this.velocity.y);
    }

    handleTilePass() {

    }

    update() {
        if (game.getPlayer.inGame)
            this.handleMovement();

        //Tile pass (after 32..)
        this.handleTilePass();
    }

}