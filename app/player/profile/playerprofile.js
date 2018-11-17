import game from "index";

export default class PlayerProfile {

    constructor() {
        this.name = undefined;

        //Will be updated by server.
        this.stats = {
            dex: 10,
            speed: 0,
            health: 0,
            mana: 0,
        }
    }

    requestStats() {
        game.getNetwork.sendMessage(JSON.stringify({ type: "RequestStats" }));
    }

    recieveStats(json) {
        this.stats.dex = json.dex;
        this.stats.speed = json.speed;
        this.stats.health = json.health;
        this.stats.mana = json.mana;
    }

    convertDexToDelay(dex) {
        var delay = 100;
        return delay - dex;
    }

    requestToLogin() {
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
}