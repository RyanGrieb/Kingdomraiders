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
        }
    }

    handleChunkRequest(json) {
        game.getTileGrid.receiveChunk(json);
    }

    handleChunkUpdate(json) {
        game.getTileGrid.updateChunk(json);
    }
}