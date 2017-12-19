/* eslint react/prop-types: off */
import React from "react";
import { Link } from "react-router-dom";
import { loadJson } from "../utilities/utils";
import Rating from "./Rating";
import { apiPut } from "../utilities/Api";

const path = "http://localhost:3030/movies";
const userId = "vjtepj04w5"; // no login functionality yet

export default class MovieDetails extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            movie: {},
            hidden: true,
            ratings: Array( 11 ).fill( false ),
        };

        this.rateMovie = this.rateMovie.bind( this );
        this.showRatePopup = this.showRatePopup.bind( this );
        this.fillStars = this.fillStars.bind( this );
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        return loadJson( `${ path }/${ id }/getMovie` )
            .then( result => {
                const { payload: movie } = result;

                this.setState( {
                    movie,
                } );
            } )
            .catch( error => console.log( error ) );
    }

    rateMovie( rating ) {
        if ( rating !== 0 ) {
            const { movie } = this.state;
            const { id } = movie;

            const url = `http://localhost:3030/users/${ userId }/rateMovie/${ id }`;
            const data = {
                rating,
            };

            apiPut( url, data )
                .then( res => {
                    this.setState( { movie: res } );
                }, ( err ) => {
                    console.log( err.message );
                } );
        }
    }

    showRatePopup() {
        this.setState( {
            hidden: false,
        } );
    }

    fillStars( starIndex ) {
        const { ratings, hidden } = this.state;

        if ( !hidden ) {
            const updatedRatings = ratings.map( ( star, index ) =>
                ( index === 0 && index !== starIndex ? false : ( index <= starIndex ) ) );

            this.setState( { ratings: updatedRatings } );
        }
    }

    emptyStars() {
        const { ratings } = this.state;
        const updatedRatings = ratings.map( () => false );

        this.setState( { hidden: true, ratings: updatedRatings } );
    }

    render() {
        const { hidden, ratings } = this.state;
        const {
            title, description, picture, averageRating, director, categories, cast, releaseDate,
        } = this.state.movie;

        const titleAndYear = !releaseDate ? title
            : `${ title } (${ new Date( releaseDate ).getFullYear() })`;

        const moviePoster = !picture ? "../assets/default-movie-poster.png" : picture;
        return (
            <div>
                <header className="header-border">
                    <Link to="/">
                        <h1 className="homepage-header">IMDB - Wannabe Movie Catalog</h1>
                    </Link>
                </header>
                <div className="movie-page">
                    <img className="movie-page-poster" src={ moviePoster } alt="poster" />
                    <div className="movie-page-info">
                        <div className="movie-info-top">
                            <h2 className="movie-title">
                                {titleAndYear}
                            </h2>

                            <Rating
                                hidden={ hidden }
                                ratingStars={ ratings }
                                onClickHandler={ this.showRatePopup }
                                onMouseLeaveHandler={ () => this.emptyStars() }
                                onMouseOverPopup={ this.fillStars }
                                onFocusPopup={ this.fillStars }
                                onClickStar={ this.rateMovie }
                                rating={ averageRating }
                            />

                        </div>
                        <div className="movie-page-info-content">
                            <p>{description}</p>
                            <h3>Categories: <span> { categories }</span></h3>
                            <h3>Director: <span> { director }</span></h3>
                            <h3>Cast:
                                <span> { cast && cast.length === 0 ?
                                    cast.join( ", " ) : "" }
                                </span>
                            </h3>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
