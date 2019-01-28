import game from "index";
import AssetsEnum from "../../world/assets/assetsenum";

export default class PlayerProfile {

    constructor() {
        this.name = undefined;

        //Will be updated by server.
        this.stats = {
            attackDelay: 0,
            speed: 0,
            vitality: 0,
            maxHealth: 0,
            health: 0,
            mana: 0,
        }

        this.prevRegenTime = new Date().getTime();
    }

    requestStats() {
        game.getNetwork.sendMessage(JSON.stringify({ type: "RequestStats" }));
    }

    recieveStats(json) {
        this.stats.attackDelay = json.attackdelay;
        this.stats.speed = json.speed;
        this.stats.vitality = json.vitality;
        this.stats.maxHealth = json.health;
        this.stats.health = json.health;
        this.stats.mana = json.mana;
    }

    convertDexToDelay(dex) {
        var delay = 100;
        return delay - dex;
    }

    setHealth(json) {
        this.stats.health = json.health;
        game.getPlayer.inventory.setHealthbar(this.stats.health);

        if (json.context === "Projectile") {
            //Attempt to find projectile on player & remove it
            var projectile = game.getEntityMap.getProjectileFromLocation(game.getPlayer.getX, game.getPlayer.getY,
                game.getPlayer.getWidth, game.getPlayer.getHeight);

            if (projectile !== undefined) {
                //game.getEntityMap.removeObject(projectile);
                // projectile.kill();
            }

            //!!!!!!!!! MEMORY LEAK+
            var sound = PIXI.sound.Sound.from(AssetsEnum.list.SOUND_BUTTONCLICK.sound);
            sound.volume = 0.3;
            sound.play();
            //setTimeout(() => { sound.destroy() }, 100);
        }
    }

    regenHealth() {
        var currentTime = new Date().getTime();
        if (currentTime - this.prevRegenTime > 666) {

            if (this.stats.health < this.stats.maxHealth) {

                this.stats.health += this.stats.vitality;

                if (this.stats.health > this.stats.maxHealth)
                    this.stats.health = this.stats.maxHealth;

                game.getPlayer.inventory.setHealthbar(this.stats.health);
            }
            this.prevRegenTime = currentTime;
        }

    }

    requestToLogin() {
        game.getUI.getWindowByName("LoginWindow").lockInput();

        var email = game.getUI.getObjectByName("txtEmail").getText;
        var password = game.getUI.getObjectByName("txtPassword").getText;

        var msg = {
            type: "LoginRequest",
            email: email,
            password: password,
            response: "request",
            date: Date.now()
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    signOut() {
        game.getPlayer.loggedIn = false;
        game.getUI.getCurrentScreen.setLoggedOut();

        var msg = {
            type: "LogoutRequest",
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    requestToRegister() {
        var username = game.getUI.getObjectByName("txtUsername").getText;
        var email = game.getUI.getObjectByName("txtEmail").getText;
        var password = game.getUI.getObjectByName("txtPassword").getText;
        var passwordAgain = game.getUI.getObjectByName("txtPasswordAgain").getText;

        //TODO: same password check..

        var msg = {
            type: "RegisterRequest",
            username: username,
            email: email,
            password: password,
            response: "request",
            date: Date.now()
        };

        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    update() {
        this.regenHealth();
    }
}