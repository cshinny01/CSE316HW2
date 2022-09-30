import React, { Component } from 'react';

export default class EditSongModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            artist: "",
            youTubeId: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange() {
        this.forceUpdate();
    }
    render() {
        const {song, index, editSongCallback, hideEditSongModalCallback} = this.props;
        let t = "";
        let a = "";
        let y = "";
        if (song){
            t = song.title;
            a = song.artist;
            y = song.youTubeId;
        }
        return (
            <div 
                class="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='verify-delete-list-root'>
                        <div class="modal-north">
                            Edit a song
                        </div>
                        <div class="modal-center">
                            <div class="modal-title-song">
                                <label for="title-song">Title:</label>
                                <input type="text" id="title-song" name="title-song" onChange={this.handleInputChange}></input>
                            </div>
                            <div class="modal-artist-song">
                                <label for="artist-song">Artist:</label>
                                <input type="text" id="artist-song" name="artist-song" onChange={this.handleInputChange}></input>
                            </div>
                            <div class="modal-youtube-song">
                                <label for="youtube-song">YoutubeId:</label>
                                <input type="text" id="youtube-song" name="youtube-song" onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                class="modal-button" 
                                onClick={() => editSongCallback(index, t, a, y)}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                class="modal-button" 
                                onClick={hideEditSongModalCallback}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }
}