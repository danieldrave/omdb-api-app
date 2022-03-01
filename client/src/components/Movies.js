import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_MOVIES = gql`
  query($apiKey: String, $search: String) {
    search(apiKey: $apiKey, searchTerm: $search) {
      totalResults
      movies {
        title
        year
        imdbId
        poster
      }
    }
  }
`;

const saveMovie = (movie) => {
  let movies = localStorage.getItem(`omdb-movies`);
  if (!movies) {
    localStorage.setItem(`omdb-movies`, JSON.stringify([movie]));
    alert(`Added ${movie.title} (${movie.year}) to your collection`);
  } else { // Add to our list of movies
    movies = JSON.parse(movies);

    // Check for duplicate entries
    const duplicateEntries = movies.find(item => {
      return item.imdbId === movie.imdbId;
    });

    if (!duplicateEntries) {
      if (movies.length === 9) { // Check limited not exceeded for feature
        alert(`Sorry! You already have 9 movies in your collection. Please delete some via My Top 9`);
      } else {
        movies.push(movie);
        localStorage.setItem(`omdb-movies`, JSON.stringify(movies));
        alert(`Added ${movie.title} (${movie.year}) to your collection`);
      }
    } else {
      alert(`You already have that movie in your Top 9`);
    }
  }
}

const ApiQuery = (props) => {
  const { data, loading, error } = useQuery(GET_MOVIES, {
    variables: {
      apiKey:  process.env.REACT_APP_TANGENT_MOVIE_API_KEY,
      search: props.search,
      page: props.page,
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const response = data.search;

  return (
    <div className="App-movies__query">
      <div className="App-movies__search">
          Found { response.totalResults } movies for your search "{ props.search }"
      </div>
      <div className="App-movies__results">
        {response.movies.map(movie => (
          <div
            key={movie.imdbId}
            className="App-movie"
            onClick={() => { saveMovie(movie) }}
          >
            <div className="App-movie__overlay">
              <button>+</button>
            </div>

            <span className="App-movie__year">{ movie.year }</span>

            <img
              className="App-movie__poster"
              src={movie.poster === `N/A` ? `https://via.placeholder.com/300x420` : movie.poster}
              alt={movie.title}
              title={movie.title}
            />

            <p className="App-movie__title">
              { movie.title }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiQuery;
