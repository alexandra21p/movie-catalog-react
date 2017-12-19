/* eslint react/prop-types: off */
import React from "react";
import { Link } from "react-router-dom";

export default class Movie extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {};
    }

    render() {
        const {
            id, title, description, picture,
        } = this.props;

        const moviePoster = !picture ? "../assets/default-movie-poster.png" : picture;
        return (
            <div className="movie-container">
                <Link style={ { textDecoration: "none" } } to={ `/movies/${ id }` }>
                    <img className="movie-poster" src={ moviePoster } alt="poster" />
                    <div className="movie-details">
                        <h2 className="movie-title">{title}</h2>
                        <p>{description}</p>
                    </div>
                </Link>
            </div>

        );
    }
}
