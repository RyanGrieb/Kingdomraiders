const ProjectileType = {

    //List of misc entities
    list: {
        //Trees
        BASIC: { name: "PROJECTILE_BASIC", speed: 6, },
        BASIC2: { name: "PROJECTILE_BASIC2", speed: 6, },
        FROZEN: { name: "PROJECTILE_FROZEN", speed: 6, },


        ERROR: { name: "ERROR" },
    },

    getProjectileFromID(id) {
        if (id == -1) return this.list.ERROR;
        return this.list[Object.keys(this.list)[id]];
    },

}

export default ProjectileType;