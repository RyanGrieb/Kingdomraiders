const AssetsEnum = {

    list: {
        //UI
        BUTTON: { path: "assets/images/ui/button.png" },
        BUTTON2: { path: "assets/images/ui/button2.png" },
        TITLE_IMAGE: { path: "assets/images/ui/titleimage.png" },
        GRAYMENU: { path: "assets/images/ui/graymenu.png" },
        CHATBOX: { path: "assets/images/ui/chatbox.png" },
        TEXTBOX_HIGHLIGHT: { path: "assets/images/ui/txtboxhighlight.png" },

        //PLAYER
        DEFAULT_PLAYER: { path: "assets/images/player/player.png" },

        //TILE
        TILE_ERROR: { path: "assets/images/tile/error.png" },
        TILE_GRASS: { path: "assets/images/tile/grass.png" },
        TILE_GRASS2: { path: "assets/images/tile/grass2.png" },
        TILE_FLOOR: { path: "assets/images/tile/floor.png" },
        TILE_PATH: { path: "assets/images/tile/path.png" },
        TILE_LIGHTPATH: { path: "assets/images/tile/lightpath.png" },

        TILE_WALLBOTTOM: { path: "assets/images/tile/wallbottom.png" },
        TILE_WALLBOTTOMLEFT: { path: "assets/images/tile/wallbottomleft.png" },
        TILE_WALLBOTTOMRIGHT: { path: "assets/images/tile/wallbottomright.png" },
        TILE_WALLLEFT: { path: "assets/images/tile/wallleft.png" },
        TILE_WALLRIGHT: { path: "assets/images/tile/wallright.png" },
        TILE_WALLTOP: { path: "assets/images/tile/walltop.png" },
        TILE_WALLTOPLEFT: { path: "assets/images/tile/walltopleft.png" },
        TILE_WALLTOPRIGHT: { path: "assets/images/tile/walltopright.png" },

        //ENTITY

        //Monster
        MONSTER_DEMON: { path: "assets/images/monster/demon.png" },

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