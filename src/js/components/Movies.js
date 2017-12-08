/* eslint react/no-array-index-key: off, consistent-return: off */
import React from "react";
import Movie from "./Movie";

const path = "http://localhost:3030/movies";

export default class Movies extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            movies: [],
            filter: false,
            isLoading: false,
            searchResults: [],
        };

        this.pageNumber = 0;
        this.handlePageScroll = this.handlePageScroll.bind( this );
    }

    componentWillMount() {
        return loadJson( `${ path }/getBatch/${ this.pageNumber }` )
            .then( result => {
                const { payload: movies } = result;
                this.setState( {
                    movies,
                } );
            } )
            .catch( err => console.log( err ) );
    }

    componentDidMount() {
        window.addEventListener( "scroll", this.handlePageScroll );
    }

    componentWillUnmount() {
        window.removeEventListener( "scroll", this.handlePageScroll );
    }

    handleSearch( event ) {
        const { type, key } = event;
        if ( type === "keypress" && key !== "Enter" ) {
            return;
        }
        this.filterMovies();
    }

    filterMovies() {
        const { value } = this.searchInput;

        return loadJson( `${ path }/getAll` )
            .then( result => {
                const { payload: movies } = result;
                const matches = movies.filter( movie => {
                    const { title, description } = movie;
                    return title.toLowerCase().includes( value.toLowerCase() ) ||
                    description.toLowerCase().includes( value.toLowerCase() );
                } );

                this.setState( {
                    filter: true,
                    searchResults: matches,
                } );
            } )
            .catch( err => console.log( err ) );
    }

    displayFilteredMovies( ) {
        const { searchResults } = this.state;

        const output = searchResults.length === 0 ? (
            <div className="no-search-result">
                <h2 className="no-result-message">The search returned no results.</h2>
            </div>
        ) : displayMoviesOnRows( searchResults );

        return output;
    }

    handlePageScroll() {
        const { isLoading, movies } = this.state;

        if ( ( window.innerHeight + window.pageYOffset ) >=
        ( document.body.scrollHeight - 800 ) && !isLoading ) {
            this.pageNumber += 1;

            return loadJson( `${ path }/getBatch/${ this.pageNumber }` )
                .then( result => {
                    const { payload: nextBatch } = result;

                    if ( nextBatch.length === 0 ) {
                        return;
                    }

                    const updatedList = movies.concat( nextBatch );
                    this.setState( {
                        movies: updatedList,
                    } );
                } )
                .catch( err => console.log( err ) );
        }
    }

    render() {
        const { filter, movies } = this.state;
        return (
            <div>
                <header>
                    <a href="."><h1>IMDB - Wannabe Movie Catalog</h1></a>

                    <div className="search-bar">
                        <input
                            ref={ ( input ) => { this.searchInput = input; } }
                            type="text"
                            className="search-input"
                            placeholder="Search for a movie..."
                            onKeyPress={ ( evt ) => this.handleSearch( evt ) }
                        />
                        <button
                            className="search-button"
                            type="button"
                            onClick={ ( evt ) => this.handleSearch( evt ) }
                        >Search
                        </button>
                    </div>
                </header>

                <div className="main-content">
                    { filter ?
                        this.displayFilteredMovies( ) : displayMoviesOnRows( movies ) }
                </div>
            </div>
        );
    }
}

function joinMovies( array, groupSize ) {
    const mappedMovies = array.reduce( ( acc, current, index ) => {
        if ( index % groupSize === 0 ) {
            acc.push( [ current ] );
            return acc;
        }
        const lastArrayIndex = index - ( index % groupSize );
        const currentArray = acc[ lastArrayIndex / groupSize ];
        currentArray.push( current );
        return acc;
    }, [] );

    return mappedMovies;
}

function expandArray( array, size ) {
    for ( let i = 0; i < size; i += 1 ) {
        array.push( "filler" );
    }
}

function displayMoviesOnRows( movieList ) {
    const groupSize = 4;
    const mappedMovies = joinMovies( movieList, groupSize );

    return mappedMovies.map( ( movieRow, index ) => {
        if ( movieRow.length < groupSize ) {
            const sizeToAdd = groupSize - movieRow.length;
            expandArray( movieRow, sizeToAdd );
        }

        const modifiedMovies = movieRow.map( movie => {
            const { id } = movie;
            const output = movie === "filler" ?
                <div className="movie-container disabled" /> :
                <Movie { ...movie } key={ id } />;

            return output;
        } );

        return <div className="movie-row" key={ `row-${ index }` }>{modifiedMovies}</div>;
    } );
}

function loadJson( url ) {
    return fetch( url )
        .then( response => {
            if ( response.status === 200 ) {
                return response.json();
            }
            throw new Error( `${ response.status }: ${ response.statusText }` );
        } );
}
