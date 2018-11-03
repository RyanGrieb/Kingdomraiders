const AssetsEnum = {

    list: {
        //UI
        BUTTON: { path: "assets/images/ui/button.png" },
        BUTTON2: { path: "assets/images/ui/button2.png" },
        TITLE_IMAGE: { path: "assets/images/ui/titleimage.png" },
        GRAYMENU: { path: "assets/images/ui/graymenu.png" },
        CHATBOX: { path: "assets/images/ui/chatbox.png" },
        TEXTBOX_HIGHLIGHT: { path: "assets/images/ui/txtboxhighlight.png" },

        INVENTORY_OVERLAY: { path: "assets/images/ui/inventoryOverlay.png" },
        INVENTORY_BACKGROUND: { path: "assets/images/ui/playerInventory.png" },
        PLAYER_HEALTHBAR: { path: "assets/images/ui/healthbarBackground.png" },
        PLAYER_MANABAR: { path: "assets/images/ui/manabar.png" },


        //PLAYER
        DEFAULT_PLAYER: { path: "assets/images/player/player.png" },

        //ITEM
        ITEM_BASIC_SWORD: { path: "assets/images/item/basicsword.png" },
        ITEM_BASIC_CHESTPLATE: { path: "assets/images/item/basicchestplate.png" },
        ITEM_BASIC_SHIELD: { path: "assets/images/item/basicshield.png" },
        ITEM_BASIC_RING: { path: "assets/images/item/basicring.png" },
        ITEM_BASIC_AMULET: { path: "assets/images/item/basicamulet.png" },

        //TILE
        TILE_ERROR: { path: "assets/images/tile/error.png" },
        TILE_GRASS: { path: "assets/images/tile/grass.png" },
        TILE_GRASS2: { path: "assets/images/tile/grass2.png" },
        TILE_FLOOR: { path: "assets/images/tile/floor.png" },
        TILE_PATH: { path: "assets/images/tile/path.png" },
        TILE_LIGHTPATH: { path: "assets/images/tile/lightpath.png" },

        TILE_TREE: { path: "assets/images/tile/tree.png" },
        TILE_BIGTREE: { path: "assets/images/tile/treebig.png" },
        TILE_BIGTREE2: { path: "assets/images/tile/treebig2.png" },
        TILE_STATUE: { path: "assets/images/tile/statue.png" },
        TILE_BRUSH: { path: "assets/images/tile/brush.png" },
        TILE_YELLOWFLOWER: { path: "assets/images/tile/yellowflower.png" },


        TILE_WALLBOTTOM: { path: "assets/images/tile/wallbottom.png" },
        TILE_WALLBOTTOMLEFT: { path: "assets/images/tile/wallbottomleft.png" },
        TILE_WALLBOTTOMRIGHT: { path: "assets/images/tile/wallbottomright.png" },
        TILE_WALLLEFT: { path: "assets/images/tile/wallleft.png" },
        TILE_WALLRIGHT: { path: "assets/images/tile/wallright.png" },
        TILE_WALLTOP: { path: "assets/images/tile/walltop.png" },
        TILE_WALLTOPLEFT: { path: "assets/images/tile/walltopleft.png" },
        TILE_WALLTOPRIGHT: { path: "assets/images/tile/walltopright.png" },

        TILE_WOODWALLBOTTOM: { path: "assets/images/tile/woodwallbottom.png" },
        TILE_WOODWALLBOTTOMLEFT: { path: "assets/images/tile/woodwallbottomleft.png" },
        TILE_WOODWALLBOTTOMRIGHT: { path: "assets/images/tile/woodwallbottomright.png" },
        TILE_WOODWALLTOPLEFT: { path: "assets/images/tile/woodwalltopleft.png" },
        TILE_WOODWALLTOPRIGHT: { path: "assets/images/tile/woodwalltopright.png" },
        TILE_WOODWALLSIDE: {path: "assets/images/tile/woodwallside.png"},
        //ENTITY

        //Monster
        MONSTER_DEMON: { path: "assets/images/monster/demon.png" },

        //Projectile
        PROJECTILE_BASIC: {path: "assets/images/projectile/basic.png"},
        PROJECTILE_BASIC2: {path: "assets/images/projectile/basic2.png"},

        //SOUNDS
        SOUND_BUTTONCLICK: { path: "assets/sound/buttonclick.mp3" },

    },

    getObjectFromName(inputtedName) {
        for (var name in AssetsEnum.list) {
            var obj = AssetsEnum.list[name];

            if (inputtedName == name)
                return obj;
        }

        return null;
    }
}

export default AssetsEnum;