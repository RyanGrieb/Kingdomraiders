const EntityType = {

    //List of misc entities
    list: {
        //Trees
        TREE: { name: "ENTITY_TREE" },
        BIGTREE: {name: "ENTITY_BIGTREE"},


        ERROR: { name: "ERROR" },
    },

    getEntityFromID(id) {
        if (id == -1) return this.list.ERROR;
        return this.list[Object.keys(this.list)[id]];
    }

}

export default EntityType;