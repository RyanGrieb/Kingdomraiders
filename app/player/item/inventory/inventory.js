import CustomWindow from "../../../ui/window/customwindow";
import CustomText from "../../../ui/custom/customtext";
import CustomSprite from "../../../ui/custom/customsprite";
import ItemType from "../itemtype";

import game from "index";
import Item from "../item";
import { CONST } from "pixi.js";
import Tooltip from "./tooltip";

export default class Inventory {
    constructor() {

        this.overlayObjects = [];
        this.openInventoryObjects = [];
        this.items = [];

        this.windowOpen = false;
        this.inventorySize = 23;

        this.openOverlay();
        
        this.requestCurrentItems();
    }

    requestCurrentItems() {
        //Make a server request.
        game.getNetwork.sendMessage(JSON.stringify({ type: "RequestInventory" }));
    }

    receiveInventoryUpdate(json) {
        //Recive the server request.
        var inventory = String(json.inventory).split(",");

        for (var i = 0; i < inventory.length; i++) {
            var slotX = this.getSlotLocationX(i);
            var slotY = this.getSlotLocationY(i);

            var item = (inventory[i] !== "0") ? new Item(ItemType.getItemFromID(inventory[i]), slotX, slotY) : undefined;
            this.setSlot(i, item);
        }

    }

    sendInventoryUpdate() {
        var msg = {
            type: "ModifyInventory",
            inventory: this.getCurrentInventoryIDs(),
        }
        game.getNetwork.sendMessage(JSON.stringify(msg));
    }

    //Tooltip. 
    onHover() {
        //Checks if were dragging an item, if so, then delete...
        var draggedItem = false;
        for (var i = 0; i < this.items.length; i++)
            if (this.items[i] !== undefined)
                if (this.items[i].dragged)
                    draggedItem = true;

        //Basic mouse x,y
        var mouseX = game.renderer.plugins.interaction.mouse.global.x;
        var mouseY = game.renderer.plugins.interaction.mouse.global.y;
        var hoveredItem = undefined;

        //If our mouse is inside an item...
        for (var i = 0; i < this.items.length; i++)
            if (this.items[i] !== undefined)
                if (mouseX > this.items[i].sprite.x && mouseX < this.items[i].sprite.x + 32 && mouseY > this.items[i].sprite.y && mouseY < this.items[i].sprite.y + 32)
                    hoveredItem = this.items[i];


        //Create the tooltip for the first time.

        if (hoveredItem !== undefined && !draggedItem) {
            if (this.tooltip !== undefined) {
                this.tooltip.kill();
                this.tooltip = undefined;
            }

            if (mouseY + 15 > 650)
                mouseY -= 133;

            this.tooltip = new Tooltip(hoveredItem, mouseX + 15, mouseY + 15);
        } else
            //If there is no item hovered & we still have a tooltip, delete.
            if (this.tooltip !== undefined) {
                this.tooltip.kill();
                this.tooltip = undefined;
            }

    }


    onMouseClick() {
        if (!this.windowOpen)
            return;

        for (var i = 0; i < this.items.length; i++)
            if (this.items[i] !== undefined) {
                var mouseX = game.renderer.plugins.interaction.mouse.global.x;
                var mouseY = game.renderer.plugins.interaction.mouse.global.y;

                if (mouseX > this.items[i].sprite.x &&
                    mouseX < this.items[i].sprite.x + this.items[i].sprite.width &&
                    mouseY > this.items[i].sprite.y &&
                    mouseY < this.items[i].sprite.y + this.items[i].sprite.height) {
                    this.items[i].dragged = true;
                    this.items[i].sprite.parentGroup = game.getUI.parentGroup.positive5;
                }


            }
    }

    onMouseRelease() {
        for (var i = 0; i < this.items.length; i++)
            if (this.items[i] !== undefined)
                if (this.items[i].dragged) {

                    //Moves the sprite to the nearst slot.
                    var nearestSlot = this.getNearestSlot();
                    this.items[i].dragged = false;
                    this.items[i].sprite.parentGroup = game.getUI.parentGroup.positive4;

                    //If it's dropped outside a slot.
                    if (nearestSlot === undefined) {
                        this.items[i].sprite.x = this.getSlotLocationX(i);
                        this.items[i].sprite.y = this.getSlotLocationY(i);
                        return;
                    }

                    //If it's nto dropped outside a slot..
                    this.items[i].sprite.x = this.getSlotLocationX(nearestSlot);
                    this.items[i].sprite.y = this.getSlotLocationY(nearestSlot);

                    //Swaps the nearest slot with our item
                    var replacedSlot = this.items[nearestSlot];
                    this.items[nearestSlot] = this.items[i];

                    //Set the previous slot we moved from to what were switching from.
                    this.items[i] = replacedSlot;
                    if (this.items[i] !== undefined) {
                        this.items[i].sprite.x = this.getSlotLocationX(i);
                        this.items[i].sprite.y = this.getSlotLocationY(i);
                    }


                    this.sendInventoryUpdate();
                }
    }

    //Called with the update method, drags an item if selected.
    dragItem() {
        for (var i = 0; i < this.items.length; i++)
            if (this.items[i] !== undefined)
                if (this.items[i].dragged) {
                    var mouseX = game.renderer.plugins.interaction.mouse.global.x;
                    var mouseY = game.renderer.plugins.interaction.mouse.global.y;

                    this.items[i].sprite.x = mouseX - 16;
                    this.items[i].sprite.y = mouseY - 16;
                }
    }

    setSlot(slotIndex, item) {
        this.items[slotIndex] = item;

        if (slotIndex > 17 && item !== undefined)
            game.stage.addChild(item.sprite);
    }

    getNearestSlot() {
        var mouseX = (game.renderer.plugins.interaction.mouse.global.x);
        var mouseY = (game.renderer.plugins.interaction.mouse.global.y);
        for (var i = 0; i < this.inventorySize; i++) {
            var slotLocX = (this.getSlotLocationX(i) + 8);
            var slotLocY = (this.getSlotLocationY(i) + 8);
            if ((slotLocX - mouseX < 32) && (slotLocY - mouseY < 32) &&
                (mouseX - slotLocX < 32) && (mouseY - slotLocY < 32)) {
                return i;
            }
        }
        return undefined;
    }

    getSlotLocationX(index) {
        var baseX = (game.WIDTH / 2 - 350 / 2) + 26.5;
        if (index > 17) {
            return baseX + (index - 18.032) * 67.3;
        }
        if (index > 11) {
            return baseX + (index - 12) * 53;
        }
        if (index > 5) {
            return baseX + (index - 6) * 53;
        }
        return baseX + index * 53;
    }

    getSlotLocationY(index) {
        var baseY = game.HEIGHT / 2 + 33;
        if (index > 17) {
            return game.HEIGHT - 63;
        }
        if (index > 11) {
            return baseY + 98;
        }
        if (index > 5) {
            return baseY + 49;
        }

        return baseY;
    }

    getCurrentInventoryIDs() {
        var itemIDs = [];
        for (var i = 0; i < this.items.length; i++)
            if (this.items[i] !== undefined) {
                itemIDs.push(ItemType.getIDFromName(this.items[i].itemType.name));
            } else
                itemIDs.push(0);
        return itemIDs;
    }

    get getWeapon() {
        return this.items[18];
    }

    openOverlay() {
        var inventoryOverlay = new CustomSprite("INVENTORY_OVERLAY", game.WIDTH / 2 - 325 / 2, game.HEIGHT - 75, 325, 55)
        inventoryOverlay.customSprite.parentGroup = game.getUI.parentGroup.positive4;
        this.overlayObjects.push(inventoryOverlay);

        var healthbarOverlay = new CustomSprite("PLAYER_HEALTHBAR", game.WIDTH / 2 - 300 / 2, game.HEIGHT - 110, 300, 10);
        healthbarOverlay.customSprite.parentGroup = game.getUI.parentGroup.positive4;
        this.overlayObjects.push(healthbarOverlay);

        var manabarOverlay = new CustomSprite("PLAYER_MANABAR", game.WIDTH / 2 - 300 / 2, game.HEIGHT - 95, 300, 10);
        manabarOverlay.customSprite.parentGroup = game.getUI.parentGroup.positive4;
        this.overlayObjects.push(manabarOverlay);


        var healthLabelOverlay = new CustomText("txtHealthLabel", "100 / 100", "#ffffff", game.WIDTH / 2 - 50 / 2, game.HEIGHT - 106, 80, 15);
        healthLabelOverlay.customText.parentGroup = game.getUI.parentGroup.positive4;
        healthLabelOverlay.customText.x = game.WIDTH / 2 - healthLabelOverlay.customText.width / 2;
        this.overlayObjects.push(healthLabelOverlay);

        var manaLabelOverlay = new CustomText("txtManaLabel", "100 / 100", "#ffffff", game.WIDTH / 2 - 50 / 2, game.HEIGHT - 91, 80, 15);
        manaLabelOverlay.customText.parentGroup = game.getUI.parentGroup.positive4;
        manaLabelOverlay.customText.x = game.WIDTH / 2 - manaLabelOverlay.customText.width / 2;
        this.overlayObjects.push(manaLabelOverlay);
    }

    //We have this since techniclally this window is considred already always open in parent classes.
    toggle() {
        console.log(this.windowOpen);
        if (this.windowOpen)
            this.closeInventory();
        else
            this.openInventory();

    }

    openInventory() {
        var playerStats = game.getPlayer.playerProfile.stats;
        this.windowOpen = true;

        var inventoryBackground = new CustomSprite("INVENTORY_BACKGROUND", game.WIDTH / 2 - 350 / 2, game.HEIGHT / 2 - 175, 350, 350)
        inventoryBackground.customSprite.parentGroup = game.getUI.parentGroup.positive4;
        this.openInventoryObjects.push(inventoryBackground);

        var lblInvName = new CustomText("txtInvName", game.getPlayer.playerProfile.name + "'s Inventory", "#ffffff", game.WIDTH / 2, game.HEIGHT / 2 - 165, 100, -1);
        lblInvName.customText.parentGroup = game.getUI.parentGroup.positive4;
        this.openInventoryObjects.push(lblInvName);

        var lblInvPlayer = new CustomSprite(game.getPlayer.className, (game.WIDTH / 2 - 350 / 2) + 25, (game.HEIGHT / 2) - 120, 96, 96);
        lblInvPlayer.customSprite.parentGroup = game.getUI.parentGroup.positive4;
        this.openInventoryObjects.push(lblInvPlayer);


        var lblInvName = new CustomText("txtHealthStat", "Max Health: " + playerStats.health, "#ffffff", game.WIDTH / 2, game.HEIGHT / 2 - 115, 85, -1);
        lblInvName.customText.parentGroup = game.getUI.parentGroup.positive4;
        this.openInventoryObjects.push(lblInvName);

        var lblInvName = new CustomText("txtManaStat", "Max Mana: " + playerStats.mana, "#ffffff", game.WIDTH / 2 + 100, game.HEIGHT / 2 - 115, 85, -1);
        lblInvName.customText.parentGroup = game.getUI.parentGroup.positive4;
        this.openInventoryObjects.push(lblInvName);

        var lblInvName = new CustomText("txtSpeedStat", "Speed: " + playerStats.speed, "#ffffff", game.WIDTH / 2, game.HEIGHT / 2 - 90, 85, -1);
        lblInvName.customText.parentGroup = game.getUI.parentGroup.positive4;
        this.openInventoryObjects.push(lblInvName);

        var lblInvName = new CustomText("txtDexStat", "Dexterity: " + playerStats.dex, "#ffffff", game.WIDTH / 2 + 100, game.HEIGHT / 2 - 90, 85, -1);
        lblInvName.customText.parentGroup = game.getUI.parentGroup.positive4;
        this.openInventoryObjects.push(lblInvName);

        //Display our items
        for (var i = 0; i < this.items.length; i++) {

            if (this.items[i] !== undefined)
                game.stage.addChild(this.items[i].sprite);
        }
    }

    closeInventory() {
        this.windowOpen = false;

        //Stops dragged items
        this.onMouseRelease();

        for (var i = 0; i < this.openInventoryObjects.length; i++)
            this.openInventoryObjects[i].kill();
        this.openInventoryObjects = [];

        for (var i = 0; i < this.items.length - 5; i++)
            if (this.items[i] !== undefined)
                game.stage.removeChild(this.items[i].sprite);

        //Remove our tooltip.
        if (this.tooltip !== undefined) {
            this.tooltip.kill();
            this.tooltip = undefined;
        }
    }

    //Includes the overlay.
    close() {
        this.closeInventory();

        //Kill the overlay not included in a normal window.
        for (var i = 0; i < this.overlayObjects.length; i++)
            if (this.overlayObjects[i] !== undefined)
                this.overlayObjects[i].kill();
        this.overlayObjects = [];

        for (var i = 0; i < this.items.length; i++)
            if (this.items[i] !== undefined)
                this.items[i].kill();
        this.items = [];

    }


    update() {
        if (this.windowOpen) {
            this.dragItem();
            this.onHover();
        }
    }
}