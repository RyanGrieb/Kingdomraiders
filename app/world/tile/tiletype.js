import AssetEnum from "../assets/assetsenum";

const TileType = {

    //TODO: add other attributes
    list: {
        GRASS: { name: "GRASS" },
        GRASS2: { name: "GRASS2" },
        FLOOR: { name: "FLOOR" },
        PATH: { name: "PATH" },
        LIGHTPATH: { name: "LIGHTPATH" },
        WALLBOTTOM: { name: "WALLBOTTOM" },
        WALLBOTTOMLEFT: { name: "WALLBOTTOMLEFT" },
        WALLBOTTOMRIGHT: { name: "WALLBOTTOMRIGHT" },
        WALLLEFT: { name: "WALLLEFT" },
        WALLRIGHT: { name: "WALLRIGHT" },
        WALLTOP: { name: "WALLTOP" },
        WALLTOPLEFT: { name: "WALLTOPLEFT" },
        WALLTOPRIGHT: { name: "WALLTOPRIGHT" },



        ERROR: { name: "ERROR" },
    },

    getTileFromID(id) {
        if (id == -1) return this.list.ERROR;
        return this.list[Object.keys(this.list)[id]];
    },

    getIDFromName(name) {
        var index = -1;
        for (var tilename in this.list)
            if (name === tilename)
                return ++index;

    }

}

export default TileType;