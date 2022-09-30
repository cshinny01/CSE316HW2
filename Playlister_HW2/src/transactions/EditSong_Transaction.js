import jsTPS_Transaction from "../common/jsTPS.js"

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, editIndex, t, a, y, oldT, oldA, oldY) {
        super();
        this.app = initApp;
        this.editIndex = editIndex;
        this.t = document.getElementById("title-song").value;
        this.a = document.getElementById("artist-song").value;
        this.y = document.getElementById("youtube-song").value;
        this.oldT = this.app.getSong(editIndex).title;
        this.oldA = this.app.getSong(editIndex).artist;
        this.oldY = this.app.getSong(editIndex).youTubeId;

    }

    doTransaction() {
        this.app.editSong(this.editIndex, this.t, this.a, this.y);
    }
    
    undoTransaction() {
        this.app.editSong(this.editIndex, this.oldT, this.oldA, this.oldY);
    }
}