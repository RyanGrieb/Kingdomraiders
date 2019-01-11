import game from "index";

export default class ProjectileListener {

    handleMessage(message) {
        var json = JSON.parse(message.data);

        switch (json.type) {
            case "ProjShot":
                this.handleProjectileShot(json);
                break;
        }
    }

    handleProjectileShot(json) {
        if (game.getPlayer.inGame)
            game.getEntityMap.projectileManager.recieveProjectileShot(json);
    }

}