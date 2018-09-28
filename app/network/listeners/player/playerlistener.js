import game from "index";

import GameScreen from "../../../ui/scene/gamescreen";
import MPPlayer from "../../../player/mpplayer/mpplayer";

export default class PlayerListener {
    constructor() {

    }

    handleMessage(message) {
        var json = JSON.parse(message.data);
        switch (json.type) {

            //Client-based packets
            case "JoinGame":
                this.handleJoinResponse(json);
                break;

            case "PositionUpdate":
                this.handlePositionUpdate(json);
                break;

            //MPPlayer based packets
            case "MPJoinGame":
                this.handleMPJoinResponse(json);
                break;

            case "MPLeaveGame":
                this.handleMPLeaveResponse(json);
                break;

            case "MPPositionUpdate":
                this.handleMPPositionUpdate(json);
                break;

            case "MPMovementStart":
                this.handleMPMovementStart(json);
                break;

            case "MPMovementStop":
                this.handleMPMovementStop(json);
                break;
        }
    }

    handleJoinResponse(json) {
        game.getUI.setScreen(new GameScreen());
    }

    handlePositionUpdate(json) {
        game.getPlayer.movement.updatePosition(json.x, json.y);
    }

    //MPPlayer based response
    handleMPJoinResponse(json) {
        game.getEntityMap.entityMap.push(new MPPlayer(json));
    }

    handleMPLeaveResponse(json) {
        game.getEntityMap.getMPPlayerByID(json.id).leaveGame();
    }

    handleMPPositionUpdate(json) {
        game.getEntityMap.getMPPlayerByID(json.id).setPosition(json.x, json.y);
    }

    handleMPMovementStart(json) {
        game.getEntityMap.getMPPlayerByID(json.id).startMovement(json);
    }

    handleMPMovementStop(json) {
        game.getEntityMap.getMPPlayerByID(json.id).stopMovement(json);
    }
}