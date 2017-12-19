import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
    <div>
        <header className="header-border">
            <Link to="/">
                <h1 className="homepage-header">IMDB - Wannabe Movie Catalog</h1>
            </Link>
        </header>
        <main className="homepage">
            <h2 className="homepage-subtitle">
            Welcome to yet another movie database! This is just one of the many already existing ones on the great web.
            </h2>
            <Link className="movies-link" to="/movies">Check out our list of movies</Link>
        </main>
    </div>
);

export default Home;
