import React, { Component } from 'react';
import Recommendations from './components/recommendations'
import Popularity from './components/popularity'
import Genres from './components/genres';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "670b1531e1d74e8c97c3c81aaa6fc9b0";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-top-read",
  "playlist-modify-public"
];

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";


class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      token: null,
			loggedIn: token ? true : false,
			selectedGenres: [],
			usersFavoriteGenres: [],
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
				"world-music"]
    }
    // this.handleChange = this.handleChange.bind(this);
    this.onGenreCheck = this.onGenreCheck.bind(this);
		// this.onPlaylistSelect = this.onPlaylistSelect.bind(this);
		// this.updateRecommendations = this.updateRecommendations.bind(this);
		// this.replacePlaylist = this.replacePlaylist.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ maxPopularity: event.target.value });
  // }

  onGenreCheck(event) {
    if (this.state.selectedGenres.length > 4) {
      event.target.checked = false
    }
    if (event.target.checked) {
      this.setState({
        selectedGenres: [...this.state.selectedGenres, event.target.id]
      })
    } else {
      this.setState({
        selectedGenres: this.state.selectedGenres.filter((_, i) => i !== this.state.selectedGenres.indexOf(event.target.id))
      });
    }
  }


  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }



  getUsersPlaylist() {
    spotifyApi.getUserPlaylists()
      .then((response) => {
      })
	}
	
	getUsersTopGenres() {
		var availableGenres = this.state.availableGenres
		return spotifyApi.getMyTopArtists({ limit: 50 })
			.then((response) => {
				var dict = {}
				response.items.forEach(function (artist) {
					artist.genres.forEach(function (genre) {
						genre = genre.replace(" ", "-")
						var res = genre.split("-");
						res.forEach(function (subGenre) {
							if (availableGenres.includes(subGenre)) {
								if (!(subGenre in dict)) {
									dict[subGenre] = 1
								} else {
									dict[subGenre]++
								}
							}
						})
					})
				});

				var result = Object.keys(dict).sort(function (a, b) {
					return dict[b] - dict[a];
				})
				this.setState({ usersFavoriteGenres: result.slice(0, 5).join(",") })
				return result.slice(0, 5).join(",")
			})
	}



  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      spotifyApi.setAccessToken(_token);
      // Set token
      this.setState({
        token: _token
      });
		}
		this.getUsersTopGenres()
		.then((response) => {
			console.log(response)
		})
  }

  render() {
    return (
      <div class="container" className="App">
        {!this.state.token &&
          <div class="text-white bg-dark mb-3">
            <a className="btn btn--login App-link" href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>
              Login to Spotify
              </a>
          </div>
        }
        {this.state.token &&
          <div>
						<Genres genres={this.state.availableGenres} handleGenreCheck={this.onGenreCheck} favoriteGenres={this.state.usersFavoriteGenres} />
						<Popularity />
						{/* <Recommendations spotifyApi={spotifyApi} selectedGenres={this.state.selectedGenres} usersFavoriteGenres={this.state.usersFavoriteGenres}/> */}
          </div>
        }
      </div>
    );
  }
}

export default App;