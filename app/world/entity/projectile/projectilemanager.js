import game from "index";
import Projectile from "./projectile";
import ProjectileType from "./projectiletype";

export default class ProjectileManager {
    constructor() {

    }

    //From monsters
    recieveProjectileShot(json) {
        var camera = game.getUI.getCurrentScreen.getCamera;

        if (json.entityType === "Player") {
            var player = game.getEntityMap.getMPPlayerByID(json.id);

            var originX = (player.getX + (player.getWidth / 2)) - 16;
            var originY = (player.getY + (player.getHeight / 2)) - 16;
            this.shootProjectile("Player", ProjectileType.getProjectileFromID(json.projID), originX, originY, json.targetX, json.targetY);
        }

        if (json.entityType === "Monster") {
            var monster = game.getEntityMap.getMonsterFromID(json.id);
            if (monster === undefined)
                return;

            var minDeg = -((monster.type.projAmount - 1) * monster.type.projAngle) / 2;
            var maxDeg = ((monster.type.projAmount - 1) * monster.type.projAngle) / 2;

            for (var degAngle = minDeg; degAngle <= maxDeg; degAngle += monster.type.projAngle) {
                var radians = (Math.PI / 180) * (degAngle);
                //Sprite rotatation offset
                var cos = Math.cos(radians);
                var sin = Math.sin(radians);
                var targetXOffset = json.originX + (cos * (json.targetX - json.originX) + sin * (json.targetY - json.originY))
                var targetYOffset = json.originY + (-sin * (json.targetX - json.originX) + cos * (json.targetY - json.originY))

                this.shootProjectile("Monster", monster.type.projectileType,
                    json.originX, json.originY,
                    targetXOffset, targetYOffset);
            }
        }
    }

    shootProjectile(entityName, projectileType, x, y, targetX, targetY) {
        Projectile.fire(entityName, projectileType, x, y, targetX, targetY);
    }
}