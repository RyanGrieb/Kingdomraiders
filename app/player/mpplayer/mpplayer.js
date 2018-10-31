import game from "index";

import Entity from "../../world/entity/entity";
import AssetsEnum from "../../world/assets/assetsenum";
import MPPlayerMovement from "./mpplayermovement";
import CustomText from "../../ui/custom/customtext";

export default class MPPlayer extends Entity {

    constructor(json) {
        super({ name: "DEFAULT_PLAYER" }, 0, 0, 42, 42);

        this.movement = new MPPlayerMovement(this);

        this.id = json.id;
        this.name = json.name;

        this.nametag = new CustomText("mpnametag_" + this.name, this.name, this.sprite.x, this.sprite.y, 100, 125);

        this.sprite.parentGroup = game.getUI.parentGroup.positive2;
        this.nametag.customText.parentGroup = game.getUI.parentGroup.positive2;

        game.stage.addChild(this.sprite);
    }

    leaveGame() {
        game.getEntityMap.removeObject(this);
        this.kill();
    }

    setPosition(x, y) {
        //Converts our x value to where we put it on our screen.
        var unrotatedXOffset = x + (this.camera.position.x - game.getPlayer.getX);
        var unrotatedYOffset = y + (this.camera.position.y - game.getPlayer.getY);
        var rotatedXOffset = unrotatedXOffset;
        var rotatedYOffset = unrotatedYOffset;


        //Sets our roation around the camera angle. (This is called before update() to prevent glitching due to delay)
        if (this.rotation != this.camera.rotation) {
            var radians = (Math.PI / 180) * (this.rotation - this.camera.rotation);

            //Sprite rotatation offset
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            rotatedXOffset = this.camera.position.x + (cos * (unrotatedXOffset - this.camera.position.x) + sin * (unrotatedYOffset - this.camera.position.y));
            rotatedYOffset = this.camera.position.y + (-sin * (unrotatedXOffset - this.camera.position.x) + cos * (unrotatedYOffset - this.camera.position.y))

            this.rotation = this.camera.rotation;
        }

        this.sprite.x = rotatedXOffset;
        this.sprite.y = rotatedYOffset;

        this.x = x;
        this.y = y;
    }

    recivePosition(json) {
        this.movement.recivePosition(json);
    }

    stopMovement(json) {
        this.movement.stopMovement(json);
    }

    setVelocity(x, y) {
        super.setVelocity(x, y);
    }

    updateNametag() {
        this.nametag.customText.x = (this.sprite.x);
        this.nametag.customText.y = (this.sprite.y - 42);

        //center 
        this.nametag.customText.x = this.nametag.customText.x - (this.nametag.customText.width / 2);
    }

    kill() {
        super.kill();

        this.nametag.kill();
    }

    update() {
        super.update();

        this.movement.update();
        this.updateNametag();
    }


    get getX() {
        return (this.sprite.x + (game.getPlayer.getX - this.camera.position.x));
    }

    get getY() {
        return (this.sprite.y + (game.getPlayer.getY - this.camera.position.y));
    }

}