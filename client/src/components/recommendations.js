import React from 'react';
import Playlists from './playlists';

class Recommendations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendations: [],
            topTracks: [],
            topArtists: [],
            chosenPlaylist: "",
            availableGenres: [
                "acoustic",
                "afrobeat",
                "alt-rock",
                "alternative",
                "ambient",
                "anime",
                "black-metal",
                "bluegrass",
                "blues",
                "bossanova",
                "brazil",
                "breakbeat",
                "british",
                "cantopop",
                "chicago-house",
                "children",
                "chill",
                "classical",
                "club",
                "comedy",
                "country",
                "dance",
                "dancehall",
                "death-metal",
                "deep-house",
                "detroit-techno",
                "disco",
                "disney",
                "drum-and-bass",
                "dub",
                "dubstep",
                "edm",
                "electro",
                "electronic",
                "emo",
                "folk",
                "forro",
                "french",
                "funk",
                "garage",
                "german",
                "gospel",
                "goth",
                "grindcore",
                "groove",
                "grunge",
                "guitar",
                "happy",
                "hard-rock",
                "hardcore",
                "hardstyle",
                "heavy-metal",
                "hip-hop",
                "holidays",
                "honky-tonk",
                "house",
                "idm",
                "indian",
                "indie",
                "indie-pop",
                "industrial",
                "iranian",
                "j-dance",
                "j-idol",
                "j-pop",
                "j-rock",
                "jazz",
                "k-pop",
                "kids",
                "latin",
                "latino",
                "malay",
                "mandopop",
                "metal",
                "metal-misc",
                "metalcore",
                "minimal-techno",
                "movies",
                "mpb",
                "new-age",
                "new-release",
                "opera",
                "pagode",
                "party",
                "philippines-opm",
                "piano",
                "pop",
                "pop-film",
                "post-dubstep",
                "power-pop",
                "progressive-house",
                "psych-rock",
                "punk",
                "punk-rock",
                "r-n-b",
                "rainy-day",
                "reggae",
                "reggaeton",
                "road-trip",
                "rock",
                "rock-n-roll",
                "rockabilly",
                "romance",
                "sad",
                "salsa",
                "samba",
                "sertanejo",
                "show-tunes",
                "singer-songwriter",
                "ska",
                "sleep",
                "songwriter",
                "soul",
                "soundtracks",
                "spanish",
                "study",
                "summer",
                "swedish",
                "synth-pop",
                "tango",
                "techno",
                "trance",
                "trip-hop",
                "turkish",
                "work-out",
                "world-music"],
        }
        this.updateRecommendations = this.updateRecommendations.bind(this);
        this.onPlaylistSelect = this.onPlaylistSelect.bind(this);
        this.replacePlaylist = this.replacePlaylist.bind(this);
        this.getUsersPlaylist = this.getUsersPlaylist.bind(this);
        this.selectCreatedPlaylist = this.selectCreatedPlaylist.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }


    getUsersPlaylist() {
        this.props.spotifyApi.getUserPlaylists()
            .then((response) => {
        })
    }


    onPlaylistSelect(event) {
        this.setState({ chosenPlaylist: event.target.options[event.target.selectedIndex].id });
    }

    selectCreatedPlaylist(playlist) {
        this.setState({ chosenPlaylist: playlist });
    }

    // Replace all the existing tracks in the playlist with the new recommendations
    replacePlaylist(recommendations) {
        this.props.spotifyApi.replaceTracksInPlaylist(this.state.chosenPlaylist, this.getTrackUris(recommendations))
            .then((response) => {
            });
    }


    getSelectedGenres() {
        if (this.props.selectedGenres.length != 0) {
            return this.props.selectedGenres.join(',')
        } else {
            return this.props.usersFavoriteGenress
        }
    }

    // Returns track recommendations from genres
    getRecommendationsFromGenres() {
        var promises = []
        for (var i = 0; i < 5; i++) {
            promises.push(this.props.spotifyApi.getRecommendations({ seed_genres: this.getSelectedGenres(), max_popularity: 100, limit: 100 }));
        }
        return Promise.all(promises)
    }




    // Returns track recommendations from genres
    getRecommendationsFromGenres() {
        var promises = []
        for (var i = 0; i < 5; i++) {
            promises.push(this.props.spotifyApi.getRecommendations({ seed_genres: this.getSelectedGenres(), max_popularity: 100, limit: 100 }));
        }
        return Promise.all(promises)
    }

    getArtistsFromRecommendations(recommendations) {
        var artists = []
        recommendations.forEach(function (recommendation) {
            artists.push(recommendation.artists[0].id)
        });
        let uniqueArtists = [...new Set(artists)];
        return uniqueArtists
    }

    // Return the top tracks for multiple artists
    getArtistsTopTracks(unpopularArtists) {
        var promises = [];
        unpopularArtists.map((artist, i) => {
            promises.push(this.props.spotifyApi.getArtistTopTracks(artist.id, 'US'));
        })
        return Promise.all(promises)
    }

    getArtistsFromRecommendations(recommendations) {
        var artists = []
        recommendations.forEach(function (recommendation) {
            artists.push(recommendation.artists[0].id)
        });
        let uniqueArtists = [...new Set(artists)];
        return uniqueArtists
    }

    // Get list of artists with popularity less than the popularity variable
    getUnpopularArtists(artists, popularity) {
        const numberOfRecommendations = 30;
        var unpopularArtists = []
        artists.forEach(function (artist) {
            if (artist.popularity < popularity) {
                unpopularArtists.push(artist)
            }
        });
        unpopularArtists.length = numberOfRecommendations
        return unpopularArtists
    }

    getArtists(artists) {
        var promises = []
        var i, j, temparray, chunk = 50;
        for (i = 0, j = artists.length; i < j; i += chunk) {
            temparray = artists.slice(i, i + chunk);
            promises.push(this.props.spotifyApi.getArtists(temparray))
        }
        return Promise.all(promises)
    }



    // Return the top track from multiple artists top tracks
    getTopTrackFromArtistsTopTracks(artistsTopTracks) {
        var artistsTopTrack = []
        artistsTopTracks.forEach(function (artistTopTracks) {
            if (artistTopTracks.tracks.length > 0) {
                artistsTopTrack.push(artistTopTracks.tracks[0])
            }
        });
        return artistsTopTrack
    }


    flatten(object, type) {
        var flat = [];
        for (var i = 0; i < object.length; i++) {
            if (type === 'tracks') {
                flat = flat.concat(object[i].tracks);
            } else {
                flat = flat.concat(object[i].artists);
            }
        }
        return flat
    }

    // Returns the uris of the tracks to be put in the playlist
    getTrackUris() {
        var trackUris = []
        this.state.recommendations.forEach(function (track) {
            trackUris.push(track.uri)
        });
        return trackUris
    }

    updateRecommendations() {
        this.getRecommendationsFromGenres()
            .then((response) => {
                var uniqueArtists = this.getArtistsFromRecommendations(JSON.parse(JSON.stringify(this.flatten(response, 'tracks'))))
                return this.getArtists(uniqueArtists)
            })
            .then((response) => {
                var unpopularArtists = this.getUnpopularArtists(JSON.parse(JSON.stringify(this.flatten(response, 'artists'))), this.props.maxPopularity)
                return this.getArtistsTopTracks(unpopularArtists)
            })
            .then((response) => {
                var recommendations = this.getTopTrackFromArtistsTopTracks(response)
                this.setState({ recommendations: recommendations })
            })
    }

    componentDidMount() {
        this.updateRecommendations()
    }

    render() {
        return (
            <div>
                <div class="card text-white bg-dark mb-3">
                    <div class="card-body">
                        <button type="button" className="btn btn-secondary" onClick={() => this.updateRecommendations()}>
                            Get New Recommendations
                        </button>
                        <table class="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Artist</th>
                                    <th>Title</th>
                                    <th>Album</th>
                                    <th>Top Track Popularity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.recommendations.map((recommendation, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{recommendation.artists[0].name}</td>
                                        <td>{recommendation.name}</td>
                                        <td>{recommendation.album.name}</td>
                                        <td>{recommendation.popularity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Playlists spotifyApi={this.props.spotifyApi} onPlaylistSelect={this.onPlaylistSelect} replacePlaylist={this.replacePlaylist} selectCreatedPlaylist={this.selectCreatedPlaylist} chosenPlaylist={this.state.chosenPlaylist} />
            </div>
            
        );
    }
}

export default Recommendations
