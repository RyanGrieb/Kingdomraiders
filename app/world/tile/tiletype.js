import AssetEnum from "../assets/assetsenum";

const TileType = {

    //TODO: add other attributes
    list: {
        GRASS: { name: "GRASS" },
        GRASS2: { name: "GRASS2" },
        FLOOR: { name: "FLOOR" },




        ERROR: { name: "ERROR" },
    },

    getTileFromID(id) {
        if (id == -1) return this.list.ERROR;
        return this.list[Object.keys(this.list)[id]];
    }

}

export default TileType;