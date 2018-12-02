import game from "index";

export default class ProjectileListener {

    handleMessage(message) {
        var json = JSON.parse(message.data);

        switch (json.type) {

            case "AddShooter":
                this.handleAddShooter(json);
                break;

            case "ShooterUpdate":
                this.handleShooterUpdate(json);
                break;

            case "RemoveShooter":
                this.handleRemoveShooter(json);
                break;
        }
    }

    handleAddShooter(json) {
        if (game.getPlayer.inGame)
            game.getEntityMap.projectileManager.recieveShooter(json);
    }

    handleShooterUpdate(json) {
        if (game.getPlayer.inGame)
            game.getEntityMap.projectileManager.recieveShooterUpdate(json);
    }


    handleRemoveShooter(json) {
        if (game.getPlayer.inGame)
            game.getEntityMap.projectileManager.removeShooter(json.entityType, json.id);
    }

}