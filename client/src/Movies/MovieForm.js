// Import Modules
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export default function MovieForm(props) {
  //* Initial state of data
  const initialState = {
    director: "",
    metascore: 0,
    stars: [],
    title: "",
  };

  //* State to manage form data
  const [movieData, setMovieData] = useState(initialState);

  //* Set the params variable
  const params = useParams();

  //* Set the route historey obj
  const history = useHistory();

  //* Function to handle field change and update state
  const handleChange = (e) => {
    const newData = {
      ...movieData,
      [e.target.name]: e.target.value,
    };

    setMovieData(newData);
  };

  //* Function to handle form submission
  const handleSubmission = (e) => {
    e.preventDefault();

    const apiURL = `http://localhost:5000/api/movies/${params.id}`;

    axios
      .put(apiURL, movieData)
      .then((res) => {
        console.log(res);
        props.getMovieList();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //* Function to get the data IF we have a path parameter
  useEffect(() => {
    const apiURL = `http://localhost:5000/api/movies/${params.id}`;

    axios
      .get(apiURL)
      .then((res) => {
        setMovieData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return (
    <div className='movie-form'>
      <form onSubmit={handleSubmission}>
        <label htmlFor='title'>
          Title
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Title'
            onChange={handleChange}
            value={movieData.title}
          />
        </label>

        <label htmlFor='director'>
          Director
          <input
            type='text'
            name='director'
            id='director'
            placeholder='Director'
            onChange={handleChange}
            value={movieData.director}
          />
        </label>

        <label htmlFor='metascore'>
          Metascore
          <input
            type='number'
            name='metascore'
            id='metascore'
            placeholder='Metascore'
            onChange={handleChange}
            value={movieData.metascore}
          />
        </label>

        <div className='stars'>
          {movieData.stars.map((star, index) => {
            const starId = Date.now() + index * 2;

            return (
              <div className='star' key={starId}>
                {star}
              </div>
            );
          })}
        </div>

        <button>{props.isEdit ? "Edit Movie" : "Add Movie"}</button>
      </form>
    </div>
  );
}
