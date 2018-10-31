import game from "index";
import ProjectileType from "../../world/entity/projectile/projectiletype";

const ItemType = {

    //TODO: add other attributes
    list: {
        BASIC_SWORD: { name: "BASIC_SWORD", displayName: "Basic Sword", projectile: ProjectileType.list.BASIC },
        BASIC_CHESTPLATE: { name: "BASIC_CHESTPLATE", displayName: "Basic Chestplate" },
        BASIC_SHIELD: { name: "BASIC_SHIELD", displayName: "Basic Shield" },
        BASIC_RING: { name: "BASIC_RING", displayName: "Basic Ring" },
        BASIC_AMULET: { name: "BASIC_AMULET", displayName: "Basic Amulet" },


        ERROR: { name: "ERROR" },
    },

    getItemFromID(id) {
        id--;

        if (id == -1) return this.list.ERROR;
        return this.list[Object.keys(this.list)[id]];
    },

    getIDFromName(name) {
        var index = 1;
        for (var tilename in this.list) {
            if (name === tilename)
                return index;
            index++;
        }


    }

}

export default ItemType;