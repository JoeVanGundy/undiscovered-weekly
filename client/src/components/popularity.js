import React from 'react'; // get the React object from the react module


class Popularity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: {}
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(){
        
    }

    componentDidMount() {
        // this.getUsersPlaylist()
    }

    render() {

        return (
            <div >
                <div class="card text-white bg-dark mb-3">
                    <div class="card-header">
                        <h3>How mainstream would you like your playlist?</h3>
                    </div>
                    <div class="card-body">
                        <div class="btn-group btn-group-toggle" data-toggle="buttons" >
                            <label class="btn btn-secondary active">
                                <input type="radio" name="options" id="option1" autocomplete="off" onChange={this.handleSelect}/>
                                Not Mainstream
                            </label>
                            <label class="btn btn-secondary">
                                <input type="radio" name="options" id="option2" autocomplete="off" onChange={this.handleSelect}/>
                                Somewhere in the middle
                            </label>
                            <label class="btn btn-secondary">
                                <input type="radio" name="options" id="option3" autocomplete="off" onChange={this.handleSelect}/>
                                Mainstream
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popularity