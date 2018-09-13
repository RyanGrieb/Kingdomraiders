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
        TILE_FLOOR: { path: "assets/images/tile/floor.png" },



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