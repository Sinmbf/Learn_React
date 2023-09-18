import { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
import "./App.css";
import MovieCard from "./MovieCard.jsx";

//45ba8dc => API Key

const API_URL = "http://www.omdbapi.com?apikey=45ba8dc";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Superman");
  }, []);
  return (
    <div className="container">
      <div className="text-center">
        <h1 className="text-warning">Movie Land</h1>
      </div>
      {/* Row 1 */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="d-flex">
            <input
              id="search"
              type="text"
              className="form-control"
              placeholder="Search your favorite movies"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value) }}></input>
            <img className="search-icon" src={SearchIcon} alt="searchIcon" onClick={() => searchMovies(searchTerm)} />
          </div>
        </div>

      </div>
      {/* Row 2 */}
      {
        movies?.length > 0 ? (
          <div className="row justify-content-center">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          </div>
        ) : (
          <div className="alert alert-danger mt-4" role="alert">
            <strong>No movies available!</strong>
          </div>
        )
      }
    </div>
  );
};

export default App;
