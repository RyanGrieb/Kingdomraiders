import Projectile from "./projectile";
import ProjectileType from "./projectiletype";

import game from "index";

export default class ProjectileManager {

    constructor() {
        //Includes player, mpplayers.
        this.caster = undefined;

        //Might need to rewrite to where we mimic the server instead of just
        //reciving projectilepackets every 10ms...
    }

    setCaster() {

        this.caster = {
            //projType: projType,
            delay: game.getPlayer.playerProfile.stats.dex,
            currentDelay: game.getPlayer.playerProfile.stats.dex,
        }

        var msg = {
            type: "AddCaster",
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    removeCaster() {
        this.caster = undefined;

        var msg = {
            type: "RemoveCaster",
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    update() {
        this.checkOpenWindows();

        if (this.caster !== undefined) {

            if (this.caster.currentDelay >= this.caster.delay) {

                if (game.getPlayer.inventory.getWeapon !== undefined)
                    if (game.getPlayer.inventory.getWeapon.itemType.projectile !== undefined) {

                        var targetX = game.renderer.plugins.interaction.mouse.global.x;
                        var targetY = game.renderer.plugins.interaction.mouse.global.y;
                        Projectile.fire(game.getPlayer.inventory.getWeapon.itemType.projectile, game.getPlayer.getX, game.getPlayer.getY, targetX, targetY);
                    }

                this.caster.currentDelay = 0;
            }

            this.caster.currentDelay++;
        }
    }
    checkOpenWindows() {
        //We check for inventory too since it's not really a window
        if (!game.getUI.isAllWindowsClosed || game.getPlayer.inventory.windowOpen)
            this.caster = undefined;
    }


}