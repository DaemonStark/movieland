import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

// Get your own free api key from - https://www.omdbapi.com/apiKey.aspx and place it in .env file
// with REACT_APP_OMDB_API_KEY=your_api_key

const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const API_URL = 'http://www.omdbapi.com?apikey=' + OMDB_API_KEY;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data  = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies();
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={(  ) => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }

            
        </div>
    );

}

export default App;