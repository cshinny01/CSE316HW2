import jsTPS_Transaction from "../common/jsTPS.js"

export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, deleteIndex, song) {
        super();
        this.app = initApp;
        this.deleteIndex = deleteIndex;
        this.song = this.app.getSong(deleteIndex);
    }

    doTransaction() {
        this.app.deleteSong(this.deleteIndex);
    }
    
    undoTransaction() {
        this.app.addSongAtIndex(this.song, this.deleteIndex);
        console.log("moved song")
    }
}