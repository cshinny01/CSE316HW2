import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        if (targetId === null){
            this.setState(prevState => ({
                isDragging: false,
                draggedTo: false
            }));
        }
        else{
            targetId = targetId.substring(target.id.indexOf("-") + 1);
            let sourceId = event.dataTransfer.getData("song");
            sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
            
            this.setState(prevState => ({
                isDragging: false,
                draggedTo: false
            }));
            // ASK THE MODEL TO MOVE THE DATA
            this.props.moveCallback(sourceId, targetId);
        }
    }
    handleDeleteSong = (event) => {
        event.stopPropagation();
        console.log(this.props.song)        
        console.log("songcard " + this.getItemNum()-1)

        this.props.deleteSongCallback(this.props.song, this.getItemNum()-1);
    }
    handleEditSong = (event) => {
        event.stopPropagation();
        this.props.editSongCallback(this.props.song, this.getItemNum()-1);
    }
    getItemNum = () => {
        return this.props.id.substring("playlist-song-".length);
    }
    render() {
        const { song, deleteSongCallback, editSongCallback} = this.props;
        let link = "https://youtube.com/watch?v=" + song.youTubeId;
        let num = this.getItemNum();
        // console.log("num: " + num);
        return (
            <div
                id={'song-' + num}
                className={"list-card unselected-list-card"}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                onDoubleClick={() => editSongCallback(song, num-1)}
                draggable="true"
            >
                {num}.
                <a href = {link} draggable={false}> {song.title} by {song.artist}</a>
                <button 
                    class="list-card-button" 
                    id={"delete-song-button" + num} 
                    type = "button"
                    onClick = {() => deleteSongCallback(song, num-1)}
                >
                    X
                </button>
            </div>
        )
    }
}