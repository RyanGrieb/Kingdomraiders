import TextBox from "../../ui/custom/textbox";

import game from "index";
import CustomWindow from "../../ui/window/customwindow";
import CustomText from "../../ui/custom/customtext";

export default class PlayerChat {

    constructor() {
        this.messages = [];

        this.openChat();
    }

    openChat() {
        this.chatBox = new TextBox("txtChat", 20, game.HEIGHT - 40, 300, 25);
        this.chatBox.setParentGroup(game.getUI.parentGroup.positive5);
        game.getUI.uiObjects.push(this.chatBox);
    }

    sendMessage() {
        if (this.isSelected) {

            var msg = {
                type: "ChatMessage",
                message: this.chatBox.customText.text,
            };

            this.chatBox.unselect();
            this.chatBox.customText.text = "";

            game.getNetwork.sendMessage(JSON.stringify(msg));

        } else
            this.chatBox.select();
    }

    reciveMessage(json) {
        var message = json.message;

        for (var i = 0; i < this.messages.length; i++)
            this.messages[i].customText.y -= 25;

        var msgText = new CustomText("txtChatMessage", json.name + ": " + message, 20, game.HEIGHT - 50, 100, -1);
        msgText.setParentGroup(game.getUI.parentGroup.positive5);
        msgText.customText.x = msgText.customText.x + msgText.customText.width / 2;
        this.messages.push(msgText);

        if (this.messages.length > 7)
            this.messages.shift().kill();

    }

    kill() {
        for (var j = 0; j < game.getUI.uiObjects.length; j++) {
            if (game.getUI.uiObjects[j] === this.chatBox) {
                game.getUI.uiObjects[j].kill();
                game.getUI.uiObjects.splice(j, 1);
            }
        }
    }

    get isSelected() {
        return this.chatBox.selected;
    }
}