import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="col-11 col-md-3 mb-3 mt-5">
      <div className="card bg-black h-100">
        <img
          src={movie.Poster}
          className="card-img-top img-fluid movie-img text-info"
          alt="movie-img"
        />
        <div className="card-body">
          <h3 className="card-title fs-5 text-light text-uppercase">
            {movie.Type}
          </h3>
          <h5 className="card-title fs-4 text-info">{movie.Title}</h5>
        </div>
        <div className="card-footer">
          <small className="text-light fs-4">{movie.Year}</small>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
