import game from "index";
import Player from "../../player";
import { setInterval } from "timers";
import Entity from "../../../world/entity/entity";
import { CONST } from "pixi.js";

export default class PlayerMovement {
    constructor() {

        this.heldKeys = [];

        //Last tile/entity collided
        this.previousCollision = undefined;
        this.previouslyMoved = false;

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

        //Locked movement
        this.lockMovement = true;

        //setInterval(() => this.sendMovementUpdate(), 1); //Update movement every 100ms.

        //Animation tick
        this.animationTick = 0;
        this.animationNumber = 1;
    }

    updatePosition(x, y) {

        if (game.getPlayer.sprite != null) {
            var camera = game.getUI.getCurrentScreen.getCamera;

            //Incorrect.
            game.getPlayer.sprite.setGamePosition(x, y);
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

                //Set our sprite direction
                var animationNum = game.getPlayer.entity.sprite.animation.currentAnimationNumber;
                if (heldKey == "W")
                    game.getPlayer.entity.sprite.setTexture("PLAYER_WARRIOR_UP" + animationNum);
                if (heldKey == "A")
                    game.getPlayer.entity.sprite.setTexture("PLAYER_WARRIOR_LEFT" + animationNum);
                if (heldKey == "S")
                    game.getPlayer.entity.sprite.setTexture("PLAYER_WARRIOR_DOWN" + animationNum);
                if (heldKey == "D")
                    game.getPlayer.entity.sprite.setTexture("PLAYER_WARRIOR_RIGHT" + animationNum);

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

        distanceX = (distanceX / hypotnuse) * 5;
        distanceY = (distanceY / hypotnuse) * 5;

        //Normalize like mpplayer.
        if (hypotnuse !== 0) {
            this.setVelocity(distanceX, distanceY);
            this.previouslyMoved = true;
        }
        //Set camera rotation
        game.getUI.getCurrentScreen.camera.setRotation(this.cameraRotation.left, this.cameraRotation.right);
    }

    handleMovementAnimation() {
        if (this.heldKeys.length > 0)
            game.getPlayer.entity.sprite.setAnimation(150, 2);
        else if (game.getPlayer.entity.sprite.animation.isEnabled)
            game.getPlayer.entity.sprite.removeAnimation();
    }

    sendMovementUpdate() {

        if (game.getPlayer.inGame)
            if (this.previouslyMoved && this.velocity.x === 0 && this.velocity.y === 0 && this.heldKeys.length === 0) {
                //Send stop movement packet.
                //console.log("stop packet");
                this.previouslyMoved = false;
            } else
                if (game.getPlayer.getX !== this.previousX || game.getPlayer.getY !== this.previousY) {
                    //Send repeated movement update packets

                    var msg = {
                        type: "MovementUpdate",
                        x: Math.round(game.getPlayer.getX),
                        y: Math.round(game.getPlayer.getY),
                    };

                    game.getNetwork.sendMessage(JSON.stringify(msg));
                    this.previousX = game.getPlayer.getX;
                    this.previousY = game.getPlayer.getY;

                    //console.log("moving")
                }
    }

    setVelocity(x, y) {
        //Fake x,y for camera rotation offset.
        var rotation = game.getUI.getCurrentScreen.camera.rotation;
        var radians = (Math.PI / 180) * rotation;

        //Sprite rotatation offset
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Ofset the cos & sin
        var offsetX = ((y * sin) + (x * cos));
        var offsetY = ((y * cos) - (x * sin));


        //Collision (TODO: SEPERATE METHOD)
        var playerCollider = game.getPlayer.entity.collider;
        //console.log(playerCollider.x);

        var velocity = game.getPlayer.entity.checkCollision(offsetX, offsetY);

        //Display labels for doungeons (TODO: move in a better spot)
        if (velocity.entity !== undefined) {
            if (velocity.entity.type.name.includes("DUNGEON")) {
                velocity.entity.addLabel("Enter [SPACE]");
                this.previousCollision = velocity.entity;
            }
        } else if (this.previousCollision !== undefined) {
            this.previousCollision.removeLabel();
            this.previousCollision = undefined;
        }

        //Instead of setting velocity we just chang our x&y values here, b/c we don't want to move the customsprite insdie.
        game.getPlayer.entity.setGameVelocity(velocity.x, velocity.y);
        //game.getPlayer.entity.setVelocity(offsetX, offsetY);
    }

    interact() {
        if (this.previousCollision !== undefined)
            if (this.previousCollision.type.name.includes("DUNGEON")) {
                var msg = {
                    type: "EnterDungeon",
                    x: this.previousCollision.x,
                    y: this.previousCollision.y,
                };
                game.getNetwork.sendMessage(JSON.stringify(msg));
            }
        this.previousCollision = undefined;
    }

    clearKeys() {
        this.heldKeys = [];
    }

    update() {
        if (game.getPlayer.inGame) {
            //if (!this.lockMovement)
            this.handleMovement();

            this.handleMovementAnimation();

            this.sendMovementUpdate();
        }
    }

}