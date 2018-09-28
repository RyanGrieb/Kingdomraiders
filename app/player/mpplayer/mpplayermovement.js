export default class MPPlayerMovement {

    constructor(mpPlayer) {
        this.mpPlayer = mpPlayer;

        this.heldKeys = [];
        this.removedKeys = [];
        this.finalTargetX = undefined;
        this.finalTargetY = undefined;

        this.velocity = {
            x: 0,
            y: 0
        }
    }

    startMovement(json) {
        //If a remove packet was sent beofre a key was removed. don't do anything
        for (var i = 0; i < this.removedKeys.length; i++)
            if (this.removedKeys[i] === json.key) {
                this.removedKeys.splice(i, 1);
                return;
            }

        switch (json.key) {
            case "D":
                this.addKey({ key: "D", x: 5 });
                this.finalTargetX = undefined;
                break;

            case "A":
                this.addKey({ key: "A", x: -5 });
                this.finalTargetX = undefined;
                break;

            case "S":
                this.addKey({ key: "S", y: 5 });
                this.finalTargetY = undefined;
                break;

            case "W":
                this.addKey({ key: "W", y: -5 });
                this.finalTargetY = undefined;
                break;
        }
    }

    stopMovement(json) {

        //SImilar to start movement, we might have to check for removed keys as well

        switch (json.key) {
            case "D":
                this.finalTargetX = { key: "D", target: json.x };
                break;

            case "A":
                this.finalTargetX = { key: "A", target: json.x };
                break;

            case "S":
                this.finalTargetY = { key: "S", target: json.y };
                break;

            case "W":
                this.finalTargetY = { key: "W", target: json.y };
                break;
        }
        //If this packet was sent before a startMovement packet
        if (!this.isKeyHeld(json.key))
            this.removedKeys.push(json.key);


        this.removeKey(json.key);
    }

    handleMovement() {

        //If we're not moving to any final target, just move in the direction provided.
        if (this.finalTargetX === undefined && this.finalTargetY === undefined)
            for (var i = 0; i < this.heldKeys.length; i++) {
                var heldKey = this.heldKeys[i].key;

                //Movement
                if (heldKey == "W" || heldKey == "A" || heldKey == "S" || heldKey == "D") {

                    if (this.heldKeys[i].x != null)
                        this.velocity.x = this.heldKeys[i].x;

                    if (this.heldKeys[i].y != null)
                        this.velocity.y = this.heldKeys[i].y;
                }
            }
        else
            this.moveToFinalTarget();

        console.log(this.removedKeys.length);

        this.mpPlayer.setVelocity(this.velocity.x, this.velocity.y);
    }

    moveToFinalTarget() {
        //Veloctiy
        //x
        if (this.finalTargetX !== undefined)
            this.velocity.x = (this.mpPlayer.getX > this.finalTargetX.target) ? -5 : 5;

        //y
        if (this.finalTargetY !== undefined)
            this.velocity.y = (this.mpPlayer.getY > this.finalTargetY.target) ? -5 : 5;
        //..

        if (this.finalTargetX !== undefined)
            if (Math.abs(this.finalTargetX.target - this.mpPlayer.getX) <= 0) {
                this.removeKey(this.finalTargetX.key);
                this.velocity.x = 0;
                this.finalTargetX = undefined;
            }

        if (this.finalTargetY !== undefined)
            if (Math.abs(this.finalTargetY.target - this.mpPlayer.getY) <= 0) {
                this.removeKey(this.finalTargetY.key);
                this.velocity.y = 0;
                this.finalTargetY = undefined;
            }

    }

    addKey(obj) {
        this.heldKeys.push(obj);
    }

    removeKey(key) {
        for (var i = 0; i < this.heldKeys.length; i++)
            if (this.heldKeys[i].key === key)
                this.heldKeys.splice(i, 1);
    }

    isKeyHeld(key) {
        for (var i = 0; i < this.heldKeys.length; i++)
            if (this.heldKeys[i].key === key)
                return true;

        return false;
    }

    update() {
        this.handleMovement();
    }
}