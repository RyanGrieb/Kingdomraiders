import game from "index";

import Entity from "../../world/entity/entity";
import AssetsEnum from "../../world/assets/assetsenum";
import MPPlayerMovement from "./mpplayermovement";
import CustomText from "../../ui/custom/customtext";

export default class MPPlayer extends Entity {

    constructor(json) {
        super({ name: "PLAYER_WARRIOR_DOWN1" }, json.x, json.y, 42, 42);

        this.movement = new MPPlayerMovement(this);
        this.addEntityShoot("Player", this);

        this.id = json.id;
        this.name = json.name;

        this.nametag = new CustomText("mpnametag_" + this.name, this.name, "#ffffff", this.sprite.x, this.sprite.y, 100, 125);

        this.sprite.customSprite.parentGroup = game.getUI.parentGroup.positive2;
        this.nametag.customText.parentGroup = game.getUI.parentGroup.positive2;
    }

    leaveGame() {
        game.getEntityMap.removeObject(this);
        this.kill();
    }

    //Different from set position, as were chaning the sprite & true positions
    teleport(x, y) {
        this.setClientsidePosition(x, y);

        var screenPos = this.getScreenPosition(x, y);
        this.setPosition(screenPos.x, screenPos.y);
    }

    setPosition(x, y) {
        this.sprite.setPosition(x, y);
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
        this.nametag.customText.x = (this.sprite.customSprite.x);
        this.nametag.customText.y = (this.sprite.customSprite.y - 42);

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
        return this.x;
    }

    get getY() {
        return this.y;
    }

}