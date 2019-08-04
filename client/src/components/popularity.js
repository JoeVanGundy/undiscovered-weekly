import React from 'react'; // get the React object from the react module


class Popularity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: {},
            selectedTab: null
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event) {
        this.setState({ selectedTab: event.target.id })
        var maxPop = 50;
        switch (event.target.id) {
            case 'lowMainstream':
                maxPop = 40;
                break;
            case 'middleMainstream':
                maxPop = 60;
                break;
            case 'highMainstream':
                maxPop = 80;
                break;
            default:
                maxPop = 50;
        }
        this.props.handlePopularityChange(maxPop)
    }

    isActive(name) {
        return this.state.selectedTab === name ? 'btn btn-secondary active' : 'btn btn-secondary'
    }

    componentDidMount() {
    }

    render() {

        return (
            <div >
                <div class="card text-white bg-dark mb-3">
                    <div class="card-header">
                        <h4>How mainstream would you like your playlist?</h4>
                    </div>
                    <div class="card-body">
                        <div class="btn-group btn-group-toggle" data-toggle="buttons" onChange={this.handleSelect}>
                            <label className={this.isActive('lowMainstream')}>
                                <input type="radio" name="options" id="lowMainstream" autocomplete="off" />
                                Not Mainstream
                            </label>
                            <label className={this.isActive('middleMainstream')}>
                                <input type="radio" name="options" id="middleMainstream" autocomplete="off" />
                                Somewhere in the middle
                            </label>
                            <label className={this.isActive('highMainstream')}>
                                <input type="radio" name="options" id="highMainstream" autocomplete="off" />
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