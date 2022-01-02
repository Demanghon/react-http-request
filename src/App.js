import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const  fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try{
    const response = await fetch("https://swapi.py4e.com/api/films/");
    if(!response.ok){
      setIsLoading(false);
      throw new Error("An error occured during the fetching of movies!");
    }
    const data = await response.json();
    const movies = data.results.map((movie) => {
        return {
            id: movie.episode_id,
            title: movie.title,
            releaseDate: movie.release_date,
            openingText: movie.opening_crawl,
        };
      });
      setMovies(movies);
    }catch(error){
      setError(error.message);
    }finally{
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
      fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  
  return (
      <React.Fragment>
          <section>
              <button onClick={fetchMoviesHandler}>Fetch Movies</button>
          </section>
          <section>
              {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
              {!isLoading && !error && movies.length === 0 && <p>Mo movies found</p>}
              {!isLoading && error && <p>{error}</p>}
              {isLoading && <p>Movies are loading...</p>}
          </section>
      </React.Fragment>
  );
}

export default App;
