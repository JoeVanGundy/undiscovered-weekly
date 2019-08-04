import React from 'react'; // get the React object from the react module


class Playlists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: {}
        }
        this.changeSelect = this.changeSelect.bind(this);
    }

    componentDidMount() {
        this.getUsersPlaylist()
    }

    getUsersPlaylist() {
        this.props.spotifyApi.getUserPlaylists()
            .then((response) => {
                this.setState({ playlists: response });
            })
    }

    changeSelect(event){
        this.props.onPlaylistSelect(event);
    }

    render() {
        var playlists = []
        if (this.state.playlists.items !== undefined) {
            playlists = Object.keys(this.state.playlists.items).map(key =>
                <option id={this.state.playlists.items[key].id}>{this.state.playlists.items[key].name}</option>
            )
        }
        return (
            <div class="card text-white bg-dark mb-3">
                <div class="card-header">
                    <h4>Where you like to save your playlist?</h4>
                </div>
                <div class="card-body">
                    <div class="input-group" style={{width: "50%", marginRight: "auto", marginLeft: "auto"}}>
                        <select class="custom-select" onChange={this.changeSelect}>
                            <option disabled selected value>Choose Playlist</option>
                            {playlists}
                        </select>
                        <div class="input-group-append">
                            <button class="btn btn-secondary" type="button">Save Playlist</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Playlists