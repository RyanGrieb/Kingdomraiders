import CustomText from "../../../ui/custom/customtext";

import game from "index";
import CustomSprite from "../../../ui/custom/customsprite";
//Maybe make this a child of window classes?

export default class Tooltip {
    constructor(item) {
        this.item = item;

        this.uiElements = [];

        this.constructUI();
    }

    constructUI() {
        var name = this.item.itemType.displayName;


        var overlay = new CustomSprite("GRAYMENU", this.x, this.y, 125, 100);
        overlay.customSprite.parentGroup = game.getUI.parentGroup.positive5;
        this.uiElements.push(overlay);

        var displayName = new CustomText("txtTooltipDisplay", name, this.x, this.y, 100, -1);
        displayName.customText.parentGroup = game.getUI.parentGroup.positive5;
        this.uiElements.push(displayName);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

        if (this.y > 650)
            this.y -= 133;

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