import ProjectileType from "../projectile/projectiletype";

const MonsterType = {

    //TODO: add other attributes
    list: {
        DEMON: {
            name: "MONSTER_DEMON1", w: 128, h: 128,
            projectileType: ProjectileType.list.BASIC,
            animation: { tick: 500, cycles: 2 },
            stats: {
                health: 100,
                speed: 2,
            },

        },
        // DRAGON: { name: "MONSTER_DRAGON", speed: 2, w: 256, h: 256, },
        GOUL: {
            name: "MONSTER_GOUL", w: 96, h: 96,
            projectileType: ProjectileType.list.FROZEN,
            projAmount: 3,
            projAngle: 30,
            stats: {
                health: 100,
                speed: 2,
            }
        },

        MOUSE: {
            name: "MONSTER_MOUSE", w: 32, h: 32,
            projectileType: ProjectileType.list.BASIC,
            stats: {
                health: 100,
                speed: 3,
            }
        },


        ERROR: { name: "ERROR" },
    },

    getMonsterFromID(id) {
        if (id == -1) return this.list.ERROR;
        return this.list[Object.keys(this.list)[id]];
    },

    getMonsterFromName(inputtedName) {
        inputtedName = String(inputtedName).toUpperCase();

        for (var name in MonsterType.list) {
            var obj = MonsterType.list[name];

            if (inputtedName == name)
                return obj;
        }

        return null;
    }


}

export default MonsterType;