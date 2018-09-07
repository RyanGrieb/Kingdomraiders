import game from "index";
import GameScreen from "../../../ui/scene/gamescreen";

export default class PlayerListener {
    constructor() {

    }

    handleMessage(message) {
        var json = JSON.parse(message.data);

        switch (json.type) {

            case "PositionUpdate":
                this.handlePositionUpdate(json);
                break;

            case "JoinGame":
                this.handleJoinResponse(json);
                break;
        }
    }

    handlePositionUpdate(json) {
        game.getPlayer.movement.updatePosition(json.x, json.y);
    }

    handleJoinResponse(json) {
        //set to gamescreen
        //Should be doing this in screen transitions!!!

        game.getUI.clearObjects();
        game.getUI.setScreen(new GameScreen());
    }

}