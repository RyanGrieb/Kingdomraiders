import game from "index";
import ProjectileType from "../../world/entity/projectile/projectiletype";

const ItemType = {

    //TODO: add other attributes
    list: {
        BASIC_SWORD: {
            name: "BASIC_SWORD",
            displayName: "Basic Sword",
            projectile: ProjectileType.list.BASIC,

            description: "The default sword. \nYou should probally get a new one.",
        },

        BASIC_CHESTPLATE: {
            name: "BASIC_CHESTPLATE",
            displayName: "Basic Chestplate",

            description: "The default chestplate. \nYou should probally get a new one.",
        },

        BASIC_SHIELD: {
            name: "BASIC_SHIELD",
            displayName: "Basic Shield",

            description: "The default shield. \nYou should probally get a new one.",
        },

        BASIC_RING: {
            name: "BASIC_RING",
            displayName: "Basic Ring",

            description: "The default ring. \nYou should probally get a new one.",
        },

        BASIC_AMULET: {
            name: "BASIC_AMULET",
            displayName: "Basic Amulet",

            description: "The default amulet. \nYou should probally get a new one.",
        },

        FROZEN_WAND: {
            name: "FROZEN_WAND",
            displayName: "Frozen Wand",
            projectile: ProjectileType.list.FROZEN,

            description: "A frozen wand. \nIt's really cold & hard to hold.",
        },


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