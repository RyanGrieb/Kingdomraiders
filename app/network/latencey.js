import { setInterval } from "timers";

import game from "index";

export default class Latencey {
    constructor() {

        setInterval(() => this.pongServer(), 1000);

        this.ping = 0;
    }

    pongServer() {
        if (game.getPlayer.inGame)
            game.getNetwork.sendMessage("ping," + Date.now());
    }

    recievePong(message) {
        var messageString = String(message);
        var oldTime = messageString.substring(messageString.indexOf(",") + 1);

        this.ping = Date.now() - oldTime;
        this.waitTime = 0;
    }

}