// Import Modules
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";

// Import Componetnts
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";
import Header from "./components/Header";

const App = () => {
  //* Set the states for the saved list and main list
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  console.log("App.js: line 12: movieList:", movieList);

  //* Set the state for the response
  const [response, setResponse] = useState("");

  //* Function to fetch the movie list
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  //* Function to add to the Movie List
  const addToSavedList = (movie) => {
    let movieDuplicate = false;

    savedList.forEach((item) => {
      if (item.title === movie.title) {
        movieDuplicate = true;
      }
    });

    if (movieDuplicate) {
      getResponse(`The movie "${movie.title}" is already on faves!`);
    } else {
      getResponse(`The movie "${movie.title}" was added to faves!`);
      setSavedList([...savedList, movie]);
    }
  };

  //* Get the list and add some intro effects
  useEffect(() => {
    getMovieList();

    gsap.from(".top-header", { opacity: 0, y: -100, duration: 1 });
    gsap.from(".bottom-header", {
      opacity: 0,
      y: -100,
      duration: 1,
      delay: 0.5,
    });
    gsap.from("main", {
      opacity: 0,
      y: -100,
      duration: 1,
      delay: 0.5,
    });
  }, []);

  //* Set a response after submission
  const getResponse = (response) => {
    setResponse(response);
    gsap.to(".response", { height: "auto", duration: 0.5 });

    setTimeout(() => {
      gsap.to(".response", { height: 0, duration: 0.5 });
    }, 3000);
  };

  return (
    <div className='App'>
      <Header savedList={savedList} />

      <main>
        <div className='response'>
          <p>{response}</p>
        </div>

        <Route exact path='/'>
          <MovieList movies={movieList} />
        </Route>

        <Route path='/movies/:id'>
          <Movie
            addToSavedList={addToSavedList}
            getMovieList={getMovieList}
            getResponse={getResponse}
          />
        </Route>

        <Route path='/update-movie/:id'>
          <MovieForm
            isEdit={true}
            getMovieList={getMovieList}
            getResponse={getResponse}
          />
        </Route>

        <Route path='/add-movie'>
          <MovieForm isEdit={false} getMovieList={getMovieList} />
        </Route>
      </main>
    </div>
  );
};

export default App;
