import game from "index";

export default class MapListener {

    handleMessage(message) {
        var json = JSON.parse(message.data);

        switch (json.type) {

            case "ChunkRequest":
                this.handleChunkRequest(json);
                break;
        }
    }

    handleChunkRequest(json) {
        console.log("recived chunks:" + json.chunk);
        game.getTileGrid.receiveChunk(json);
    }
}