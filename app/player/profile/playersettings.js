export default class PlayerSettings {

    constructor() {

        //Organize and sort later
        this.settings = [];

        this.settings.push({ name: "asyncChunkLoading", isOn: true });
        this.settings.push({ name: "chunkDebug", isOn: false });
    }

    toggleSetting(name) {
        for (var i = 0; i < this.settings.length; i++)
            if (this.settings[i].name === name)
                this.settings[i].isOn = !this.settings[i].isOn;

    }

    getSetting(name) {
        for (var i = 0; i < this.settings.length; i++)
            if (this.settings[i].name === name)
                return this.settings[i].isOn;

        return false;
    }
}