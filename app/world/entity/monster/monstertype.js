const MonsterType = {

    //TODO: add other attributes
    list: {
        DEMON: {
            name: "MONSTER_DEMON", speed: 2, w: 128, h: 128,
            animation: { tick: 100, cycles: 2 },
        },
        DRAGON: { name: "MONSTER_DRAGON", speed: 2, w: 256, h: 256, },



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