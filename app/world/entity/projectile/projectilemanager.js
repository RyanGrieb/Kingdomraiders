import game from "index";
import Projectile from "./projectile";
import ProjectileType from "./projectiletype";

export default class ProjectileManager2 {
    constructor() {

    }

    recieveShooter(json) {
        if (json.entityType === "Player")
            game.getEntityMap.getMPPlayerByID(json.id).entityShoot.recieveTarget(
                ProjectileType.getProjectileFromID(json.projectileID),
                json.attackdelay,
                json.currentDelay, json.time,
                json.targetX, json.targetY);

        if (json.entityType === "Monster")
            game.getEntityMap.getMonsterFromID(json.id).entityShoot.recieveTarget(
                ProjectileType.getProjectileFromID(json.projectileID),
                json.attackdelay,
                json.currentDelay, json.time,
                json.targetX, json.targetY);
    }

    recieveShooterUpdate(json) {
        if (json.entityType === "Player")
            game.getEntityMap.getMPPlayerByID(json.id).entityShoot.recieveTargetUpdate(json.targetX, json.targetY);

        if (json.entityType === "Monster")
            game.getEntityMap.getMonsterFromID(json.id).entityShoot.recieveTargetUpdate(json.targetX, json.targetY);
    }

    removeShooter(json) {
        if (json.entityType === "Player")
            game.getEntityMap.getMPPlayerByID(json.id).entityShoot.removeShooter();

        if (json.entityType === "Monster")
            game.getEntityMap.getMonsterFromID(json.id).entityShoot.removeShooter();
    }

    shootProjectile(entityName, projectileType, x, y, targetX, targetY) {
        Projectile.fire(entityName, projectileType, x, y, targetX, targetY);
    }
}