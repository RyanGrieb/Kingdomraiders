import game from "index";
import AccountListener from "./listeners/player/account/accountlistener";
import MapListener from "./listeners/map/maplistener";
import PlayerListener from "./listeners/player/playerlistener";

import MenuScreen from "../ui/scene/menuscreen";
import MonsterListener from "./listeners/entity/monsterlistener";
import LoadingScreen from "../ui/scene/loadingscreen";
import Latencey from "./latencey";
import ProjectileListener from "./listeners/entity/projectilelistener";

export default class Network {
    constructor() {
        this.ws = {};

        //Our listeners lists
        this.listeners = [];

        this.listeners.push(new PlayerListener(), new AccountListener(), new MapListener(), new MonsterListener(), new ProjectileListener());

        this.latencey = new Latencey();
    }

    connect() {

        //this.ws = new WebSocket("ws://45.31.152.207:5000");
        this.ws = new WebSocket("ws://localhost:5000");

        this.ws.onopen = () => this.onConnection();

        this.ws.onclose = () => this.onDisconnect();

        this.ws.onmessage = (message) => this.onMessage(message);
    }

    onConnection() {
        game.getUI.clearObjects();
        game.getUI.setScreen(new MenuScreen());
    }

    onDisconnect() {
        console.log("Disconnected from server.");
    }

    onMessage(message) {
        if (message.data.includes("pong")) {
            this.latencey.recievePong(message.data);
            return;
        }


        //Allow our listeners to handle the message seperately
        for (var i = 0; i < this.listeners.length; i++) {
            this.listeners[i].handleMessage(message);
        }
    }

    lerp(v0, v1, t) {
        return v0 * (1 - t) + v1 * t
    }

    sendMessage(message) {
        this.ws.send(message);
    }

}