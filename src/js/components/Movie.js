/* eslint react/prop-types: off */
import React from "react";

export default class Movie extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {};
    }

    render() {
        const {
            title, description, picture,
        } = this.props;

        const moviePoster = !picture ? "../assets/default-movie-poster.png" : picture;
        return (
            <div className="movie-container">
                <img className="movie-poster" src={ moviePoster } alt="poster" />
                <div className="movie-details">
                    <h2 className="movie-title">{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        );
    }
}
