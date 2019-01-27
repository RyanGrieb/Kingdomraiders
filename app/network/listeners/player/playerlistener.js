import game from "index";

import GameScreen from "../../../ui/scene/gamescreen";
import MPPlayer from "../../../player/mpplayer/mpplayer";
import RespawnWindow from "../../../ui/window/types/respawnwindow";

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

            //SETS x,y position of player
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

            case "PlayerSetHealth":
                this.handlePlayerSetHealth(json);
                break;

            case "PlayerDeath":
                this.handlePlayerDeath(json);
                break;

            case "Respawn":
                this.handleRepsawn(json);
                break;

            //MPPlayer based packets
            case "MPJoinGame":
                this.handleMPJoinResponse(json);
                break;

            case "MPTeleport":
                this.handleMPTeleport(json);
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

            case "debug":
                //console.log("Server Proj: " + json.x + "," + json.y + " \nClient: " + Math.round(game.getPlayer.getX) + "," + Math.round(game.getPlayer.getY));
                break;
        }
    }

    handleJoinResponse(json) {
        game.getPlayer.id = json.id;
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
        //We do this check to stop an errors when the player is lagging.
        if (game.getPlayer.inGame)
            game.getPlayer.inventory.receiveInventoryUpdate(json);
    }

    handleRequestStats(json) {
        game.getPlayer.playerProfile.recieveStats(json);
    }

    handlePlayerSetHealth(json) {
        if (game.getPlayer.inGame)
            game.getPlayer.playerProfile.setHealth(json);
    }

    handlePlayerDeath(json) {
        game.getPlayer.handleDeath(json);
    }

    handleRepsawn() {
        game.getPlayer.dead = false;
        game.getUI.toggleWindow(new RespawnWindow());
    }

    //MPPlayer based response
    handleMPJoinResponse(json) {
        game.getEntityMap.entityMap.push(new MPPlayer(json));
    }

    handleMPTeleport(json) {
        if (game.getEntityMap.getMPPlayerByID(json.id) !== undefined)
            game.getEntityMap.getMPPlayerByID(json.id).teleport(json.x, json.y);
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
            if (game.getEntityMap.getMPPlayerByID(json.id) !== undefined)
                game.getEntityMap.getMPPlayerByID(json.id).recivePosition(json);


    }
}