const MonsterType = {

    //TODO: add other attributes
    list: {
        DEMON: { name: "MONSTER_DEMON", },
        DRAGON: { name: "MONSTER_DRAGON", },



        ERROR: { name: "ERROR" },
    },

    getMonsterFromID(id) {
        if (id == -1) return this.list.ERROR;
        return this.list[Object.keys(this.list)[id]];
    }

}

export default MonsterType;