import AssetEnum from "../assets/assetsenum";
import game from "index";

const TileType = {

    //TODO: add other attributes
    list: {
        GRASS: { name: "GRASS", collision: false },
        GRASS2: { name: "GRASS2", collision: false },
        FLOOR: { name: "FLOOR", collision: false },
        PATH: { name: "PATH", collision: false },
        LIGHTPATH: { name: "LIGHTPATH", collision: false },

        TREE: { name: "TREE", replace: true, rotate: true, collision: undefined, width: 32, height: 32, group: 3 },
        BIGTREE: { name: "BIGTREE", replace: true, rotate: true, collision: undefined, width: 128, height: 128, group: 5, anchorX: 0.5, anchorY: 1 },
        BIGTREE2: { name: "BIGTREE2", replace: true, rotate: true, collision: undefined, width: 128, height: 128, group: 5, anchorX: 0.5, anchorY: 1 },
        STATUE: { name: "STATUE", replace: true, rotate: true, collision: undefined, width: 64, height: 64, group: 5 },

        BRUSH: { name: "BRUSH", replace: true, rotate: false, collision: false, width: 32, height: 32, group: 3 },
        YELLOWFLOWER: { name: "YELLOWFLOWER", replace: true, rotate: false, collision: false, width: 32, height: 32, group: 3 },

        WALLBOTTOM: { name: "WALLBOTTOM", collision: true },
        WALLBOTTOMLEFT: { name: "WALLBOTTOMLEFT", collision: true },
        WALLBOTTOMRIGHT: { name: "WALLBOTTOMRIGHT", collision: true },
        WALLLEFT: { name: "WALLLEFT", collision: true },
        WALLRIGHT: { name: "WALLRIGHT", collision: true },
        WALLTOP: { name: "WALLTOP", collision: true },
        WALLTOPLEFT: { name: "WALLTOPLEFT", collision: true },
        WALLTOPRIGHT: { name: "WALLTOPRIGHT", collision: true },




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