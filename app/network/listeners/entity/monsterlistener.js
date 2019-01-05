import game from "index";

export default class MonsterListener {

    handleMessage(message) {
        var json = JSON.parse(message.data);

        switch (json.type) {

            case "MonsterSpawn":
                this.handleMonsterSpawn(json);
                break;

            case "MonsterPositionUpdate":
                this.handleMonsterPositionUpdate(json);
                break;

            case "MonsterRemoveTarget":
                this.handleMonsterRemoveTarget(json);
                break;

            case "MonsterSetHealth":
                this.handleMonsterSetHealth(json);
                break;

            case "MonsterKill":
            this.handleMonsterKill(json);
            break;

            case "MonsterShoot":
            this.handleMonsterStartShoot(json);
            break;
        }
    }

    handleMonsterSpawn(json) {
        game.getEntityMap.monsterManager.recieveMonsterSpawn(json);
    }

    handleMonsterPositionUpdate(json) {
        game.getEntityMap.monsterManager.recieveMonsterPosition(json);
    }

    handleMonsterRemoveTarget(json) {
        game.getEntityMap.monsterManager.recieveMonsterRemoveTarget(json);
    }

    handleMonsterSetHealth(json) {
        game.getEntityMap.monsterManager.recieveSetHealth(json);
    }

    handleMonsterKill(json){
        game.getEntityMap.monsterManager.recieveKillMonster(json);
    }

    handleMonsterStartShoot(json){
        game.getEntityMap.monsterManager.recieveStartShoot(json);
    }
}