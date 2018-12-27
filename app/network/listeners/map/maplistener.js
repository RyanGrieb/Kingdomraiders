import game from "index";

export default class MapListener {

    handleMessage(message) {
        var json = JSON.parse(message.data);

        switch (json.type) {

            case "ChunkRequest":
                this.handleChunkRequest(json);
                break;

            case "ChunkUpdate":
                this.handleChunkUpdate(json);
                break;

            case "ChunkReset":
                this.handleChunkReset(json);
                break;
        }
    }

    handleChunkRequest(json) {
        game.getTileGrid.receiveChunk(json);
    }

    handleChunkUpdate(json) {
        game.getTileGrid.updateChunk(json);
    }

    handleChunkReset(json) {
        //Set player position
        game.getPlayer.entity.setClientsidePosition(json.x, json.y);

        game.getTileGrid.clearObjects();
        game.getEntityMap.clearObjects();

        game.getTileGrid.initMap(game.getPlayer.getX + game.getPlayer.w / 2, game.getPlayer.getY + game.getPlayer.h / 2);
    }
}