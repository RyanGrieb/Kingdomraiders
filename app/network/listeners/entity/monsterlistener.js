import game from "index";

export default class MonsterListener {

    handleMessage(message) {
        var json = JSON.parse(message.data);

        switch (json.type) {

            case "MonsterSpawn":
                this.handleMonsterSpawn(json);
                break;

            case "MonsterTarget":
                this.handleMonsterTarget(json);
                break;

            case "MonsterRemoveTarget":
            this.handleMonsterRemoveTarget(json);
            break;
        }
    }

    handleMonsterSpawn(json) {
        game.getEntityMap.monsterManager.recieveMonsterSpawn(json);
    }

    handleMonsterTarget(json) {
        game.getEntityMap.monsterManager.recieveMonsterTarget(json);
    }

    handleMonsterRemoveTarget(json){
        game.getEntityMap.monsterManager.recieveMonsterRemoveTarget(json);
    }
}