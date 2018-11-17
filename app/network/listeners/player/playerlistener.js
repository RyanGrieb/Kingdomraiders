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

            case "ChatMessage":
                this.handleChatMessage(json);
                break;

            case "RequestInventory":
                this.handleRequestInventory(json);
                break;

            case "RequestStats":
                this.handleRequestStats(json);
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

            case "MPMovementTarget":
                this.handleMPMovementTarget(json);
                break;

            case "MPAddShooter":
                this.handleMPAddShooter(json);
                break;

            case "MPShooterUpdate":
                this.handleMPShooterUpdate(json);
                break;

            case "MPRemoveShooter":
                this.handleMPRemoveShooter(json);
                break;
        }
    }

    handleJoinResponse(json) {
        game.getPlayer.movement.updatePosition(json.x, json.y);
        game.getUI.setScreen(new GameScreen());
    }

    handlePositionUpdate(json) {
        game.getPlayer.movement.updatePosition(json.x, json.y);
    }

    handleChatMessage(json) {
        game.getPlayer.playerChat.reciveMessage(json);
    }

    handleRequestInventory(json) {
        game.getPlayer.inventory.receiveInventoryUpdate(json);
    }

    handleRequestStats(json) {
        game.getPlayer.playerProfile.recieveStats(json);
    }

    //MPPlayer based response
    handleMPJoinResponse(json) {
        game.getEntityMap.entityMap.push(new MPPlayer(json));
    }

    handleMPLeaveResponse(json) {
        if (game.getEntityMap.getMPPlayerByID(json.id) !== undefined)
            game.getEntityMap.getMPPlayerByID(json.id).leaveGame();
    }

    handleMPPositionUpdate(json) {
        //Set the exact position of the mpplayer.
        game.getEntityMap.getMPPlayerByID(json.id).setPosition(json.x, json.y);
    }

    handleMPMovementTarget(json) {
        //Move the mpplayer to the target /w velocity.
        if (game.getPlayer.inGame) //temp.. remove later.
            game.getEntityMap.getMPPlayerByID(json.id).recivePosition(json);
    }

    handleMPAddShooter(json) {
        //Server should be checking for us !!!
        if (game.getPlayer.inGame)
            game.getEntityMap.projectileManager.recieveShooter(json);

    }

    handleMPShooterUpdate(json) {
        if (game.getPlayer.inGame)
            game.getEntityMap.projectileManager.recieveShooterUpdate(json);
    }

    handleMPRemoveShooter(json) {
        if (game.getPlayer.inGame)
            game.getEntityMap.projectileManager.removeShooter(json.id);
    }
}