import CustomText from "../../../ui/custom/customtext";

import game from "index";
import CustomSprite from "../../../ui/custom/customsprite";
//Maybe make this a child of window classes?

export default class Tooltip {
    constructor(item, x, y) {
        this.item = item;
        this.x = x;
        this.y = y;

        this.uiElements = [];

        this.constructUI();
    }

    constructUI() {
        var name = this.item.itemType.displayName;
        var description = this.item.itemType.description;


        var overlay = new CustomSprite("GRAYMENU", this.x, this.y, 200, 150);
        overlay.customSprite.parentGroup = game.getUI.parentGroup.positive5;
        this.uiElements.push(overlay);

        var overlay = new CustomSprite("ITEM_" + this.item.itemType.name, this.x + 5, this.y + 5, 32, 32);
        overlay.customSprite.parentGroup = game.getUI.parentGroup.positive5;
        this.uiElements.push(overlay);

        var displayName = new CustomText("txtTooltipDisplay", name, "#000000", this.x + (200 / 2) + 10, this.y + 12, 100, -1);
        displayName.customText.parentGroup = game.getUI.parentGroup.positive5;
        this.uiElements.push(displayName);
        //290
        var displayDescription = new CustomText("txtTooltipDesc", description, "#000000", this.x + 5, this.y + 60, 85, -1);
        displayDescription.customText.x = displayDescription.customText.x + displayDescription.customText.width / 2;
        displayDescription.customText.parentGroup = game.getUI.parentGroup.positive5;
        this.uiElements.push(displayDescription);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

        for (var i = 0; i < this.uiElements.length; i++)
            if (this.uiElements[i].customSprite !== undefined) {
                this.uiElements[i].customSprite.x = this.x;
                this.uiElements[i].customSprite.y = this.y;

            } else if (this.uiElements[i].customText !== undefined) {
                this.uiElements[i].customText.x = this.x;
                this.uiElements[i].customText.y = this.y;
            }

    }

    kill() {
        for (var i = 0; i < this.uiElements.length; i++)
            this.uiElements[i].kill();
    }
}