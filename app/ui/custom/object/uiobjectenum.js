const UIObjectEnum = {

    list: {
        BUTTON: { path: "assets/images/ui/button.png" },
        BUTTON2: { path: "assets/images/ui/button2.png" },
        TITLEIMAGE: { path: "assets/images/ui/titleimage.png" },
        GRAYMENU: { path: "assets/images/ui/graymenu.png" },
        CHATBOX: { path: "assets/images/ui/chatbox.png" },
        TEXTBOXHIGHLIGHT: { path: "assets/images/ui/txtboxhighlight.png" }

    },

    getUIObjectFromName(inputtedName) {
        for (var name in UIObjectEnum.list) {
            var obj = UIObjectEnum.list[name];

            if (inputtedName == name)
                return obj;
        }

        return null;
    }
}

export default UIObjectEnum;