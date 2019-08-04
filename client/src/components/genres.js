import React from 'react'; // get the React object from the react module

class Genres extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
        this.state = {
            chooseFavorite: false
        }
        this.toggleUseFavorite = this.toggleUseFavorite.bind(this);
    }

    handleCheck(event){
        this.props.handleGenreCheck(event)
    }

    isActive(name){
        return this.props.selectedGenres.includes(name) ? 'btn btn-secondary active' : 'btn btn-secondary'
    }

    toggleUseFavorite(event){
        this.setState({chooseFavorite: event.target.checked})
    }

    render() {
        return (
            <div class="card text-white bg-dark mb-3">
                <div class="card-header">
                    <h4>We determined your favorite genres are: {this.props.favoriteGenres}</h4>
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="customSwitch1" onChange={this.toggleUseFavorite} />
                        <label class="custom-control-label" for="customSwitch1">Would you like to customize your favorite genres?</label>
                    </div>
                </div>
                
                {this.state.chooseFavorite &&
                <div class="card-body">
                    <div class="btn-group-toggle" data-toggle="buttons">
                        {this.props.genres.map((genre) => (
                            // <div class="custom-control custom-checkbox custom-control-inline">
                            //     <input type="checkbox" class="custom-control-input" id={genre} onClick={this.handleCheck}></input>
                            //     <label class="custom-control-label" for={genre}>{genre}</label>
                            // </div>
                            // <div class="custom-control custom-button custom-control-inline" style={{marginTop:"5px", marginBottom:"5px"}} onClick={this.handleCheck}>
                            //     <button className={this.isActive(genre)}>{genre}</button>
                            // </div>
                            <label style={{margin:"5px"}} className={this.isActive(genre)}>
                                <input type="checkbox" class="custom-control-input" autocomplete="off" id={genre} onClick={this.handleCheck}/>{genre}
                            </label>
                        ))}
                    </div>
                </div>
                }

            </div>
        );
    }
}

export default Genres