import React from 'react';

class Recommendations extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="card text-white bg-dark mb-3">
                <h3 class="card-header">Recommendations</h3>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Artist</th>
                                <th>Title</th>
                                <td>Album</td>
                                <th>Top Track Popularity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.recommendations.map((recommendation) => (
                                <tr>
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
        );
    }
}

export default Recommendations
