// Import Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

// Import Components
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  //* Declare the state for the movie
  const [movie, setMovie] = useState(null);

  //* Get the params of the path
  const params = useParams();

  //* Get the history object
  const history = useHistory();

  //* Function to get the movie info form server
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  //* Function to save movie to movie list
  const saveMovie = () => {
    addToSavedList(movie);
  };

  //* When the component loads, fetch the data
  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  //* While the data is being fetched, write a message for loading
  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  //* Function to redirect to edit form
  const editMovie = () => {
    history.push(`/update-movie/${params.id}`);
  };

  //* Function to delete movie
  const deleteMovie = () => {
    const apiURL = `http://localhost:5000/api/movies/${params.id}`;

    if (window.confirm("Delete the item?")) {
      axios
        .delete(apiURL)
        .then((res) => {
          console.log(res);
          alert("Item Deleted");
          getMovieList();
          history.push(`/`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <div className='edit-button' onClick={editMovie}>
        Edit
      </div>

      <div className='edit-button' onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
