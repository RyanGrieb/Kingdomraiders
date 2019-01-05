import game from "index";
import Monster from "./monster";
import MonsterType from "./monstertype";

export default class MonsterManager {

    constructor() {
        //Misc helper.
        this.camera = game.getUI.getCurrentScreen.getCamera;
    }

    recieveMonsterSpawn(json) {
        var monster = new Monster(json.monsterID, MonsterType.getMonsterFromName(json.name), json.health, json.x, json.y);
        game.getEntityMap.entityMap.push(monster);
    }

    recieveMonsterPosition(json) {
        for (var i = 0; i < game.getEntityMap.entityMap.length; i++) {
            if (game.getEntityMap.entityMap[i] instanceof Monster)
                if (game.getEntityMap.entityMap[i].monsterID === json.monsterID)
                    game.getEntityMap.entityMap[i].setTarget(json.targetX, json.targetY);

        }
    }

    recieveMonsterRemoveTarget(json) {
        for (var i = 0; i < game.getEntityMap.entityMap.length; i++) {
            if (game.getEntityMap.entityMap[i] instanceof Monster)
                if (game.getEntityMap.entityMap[i].monsterID === json.monsterID)
                    game.getEntityMap.entityMap[i].stopTracking(json);

        }
    }

    recieveSetHealth(json) {
        for (var i = 0; i < game.getEntityMap.entityMap.length; i++) {
            if (game.getEntityMap.entityMap[i] instanceof Monster)
                if (game.getEntityMap.entityMap[i].monsterID === json.monsterID)
                    game.getEntityMap.entityMap[i].setHealth(json.health);
        }
    }

    recieveKillMonster(json) {
        for (var i = 0; i < game.getEntityMap.entityMap.length; i++) {
            if (game.getEntityMap.entityMap[i] instanceof Monster)
                if (game.getEntityMap.entityMap[i].monsterID === json.monsterID) {
                    game.getEntityMap.entityMap[i].kill();
                    game.getEntityMap.entityMap.splice(i, 1);
                }

        }
    }

    getMonsterFromLocation(x, y, w, h) {
        for (let i = 0; i < 4; i++) {
            //Add all four corners of the collider.
            let xCorner = (i == 0 || i == 2) ? (x) : (x + 32);
            let yCorner = (i == 0 || i == 1) ? (y) : (y + 32);

            //TODO: add monster collider.
            for (let i = 0; i < game.getEntityMap.entityMap.length; i++)
                if (game.getEntityMap.entityMap[i] instanceof Monster) {
                    var monster = game.getEntityMap.entityMap[i];
                    if (xCorner > monster.x && xCorner < (monster.x + monster.w))
                        if (yCorner > monster.y && yCorner < (monster.y + monster.h)) {
                            return monster;
                        }

                }
        }
        return undefined;
    }
}