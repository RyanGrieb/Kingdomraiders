import game from "index";

export default class CustomWindow {

    constructor(name) {
        //We need a name since webpack renames our classes
        this.name = name;
        this.attatchedUI = [];
    }

    open() {
        //.. Called by the subclasses
    }

    close() {
        for (var i = 0; i < this.attatchedUI.length; i++) {

            //Compares our attachedUI to the ones running in gameUI & deletes tehm
            for (var j = 0; j < game.getUI.uiObjects.length; j++) {
                if (game.getUI.uiObjects[j] === this.attatchedUI[i]) {
                    game.getUI.uiObjects[j].kill();
                    game.getUI.uiObjects.splice(j, 1);
                }
            }

            //Since this whole object is removed, we can stop here..
            //this.attatchedUI[i].kill();
        }

        this.attatchedUI = [];
    }

    setParentGroup(parentGroup) {
        this.parentGroup = parentGroup;
    }

    addUI(uiObj) {
        if (this.parentGroup !== undefined)
            uiObj.setParentGroup(this.parentGroup);

        this.attatchedUI.push(uiObj);
        game.getUI.uiObjects.push(uiObj);
    }
}