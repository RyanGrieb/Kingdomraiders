import game from "index";
import Monster from "./monster";
import MonsterType from "./monstertype";

export default class MonsterManager {

    constructor() {
        //Misc helper.
        this.camera = game.getUI.getCurrentScreen.getCamera;
    }

    recieveMonsterSpawn(json) {
        // console.log("Monster :" + json.monsterID + " at " + json.x + "," + json.y);
        var monster = new Monster(json.monsterID, MonsterType.getMonsterFromName(json.name), json.x, json.y);

        game.getEntityMap.entityMap.push(monster);
    }

    recieveMonsterTarget(json) {
        for (var i = 0; i < game.getEntityMap.entityMap.length; i++) {
            if (game.getEntityMap.entityMap[i] instanceof Monster)
                if (game.getEntityMap.entityMap[i].monsterID === json.monsterID)
                    game.getEntityMap.entityMap[i].setPlayerToTrack(json.targetPlayer);

        }
    }

    recieveMonsterRemoveTarget(json) {
        for (var i = 0; i < game.getEntityMap.entityMap.length; i++) {
            if (game.getEntityMap.entityMap[i] instanceof Monster)
                if (game.getEntityMap.entityMap[i].monsterID === json.monsterID)
                    game.getEntityMap.entityMap[i].stopTracking(json);

        }
    }

}