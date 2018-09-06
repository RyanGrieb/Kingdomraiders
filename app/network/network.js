import game from "index";
import AccountListener from "./listeners/player/account/accountlistener";
import MapListener from "./listeners/map/maplistener";
import PlayerListener from "./listeners/player/playerlistener";

import MenuScreen from "../ui/scene/menuscreen";

export default class Network {
    constructor() {
        this.ws = {};

        //Our listeners lists
        this.listeners = [];

        this.listeners.push(new PlayerListener(), new AccountListener(), new MapListener());
    }

    connect() {

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
        //Allow our listeners to handle the message seperately
        for (var i = 0; i < this.listeners.length; i++) {
            this.listeners[i].handleMessage(message);
        }
    }


    sendMessage(message) {
        this.ws.send(message);
    }

}