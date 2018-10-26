import game from "index";

const ItemType = {

    //TODO: add other attributes
    list: {
        BASIC_SWORD: { name: "BASIC_SWORD" },
        BASIC_CHESTPLATE: { name: "BASIC_CHESTPLATE" },
        BASIC_SHIELD: { name: "BASIC_SHIELD" },
        BASIC_RING: { name: "BASIC_RING" },
        BASIC_AMULET: { name: "BASIC_AMULET" },


        ERROR: { name: "ERROR" },
    },

    getItemFromID(id) {
        id--;

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

export default ItemType;