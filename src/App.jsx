import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import "./assets/css/App.css";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  async function fetchMovies(movie) {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=78e73324&s=${movie}`
    );
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  }

  async function fetchMovieDetails(movie) {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=78e73324&t=${movie}`
    );
    const data = await response.json();
    // console.log(data);
    if (data.imdbID) {
      setMovieDetails(data);
    } else {
      setMovieDetails([]);
    }
  }

  useEffect(() => {
    fetchMovies(search === "" ? "Open" : search);
  }, [search]);

  function handleOnCLick(movie) {
    // console.log(movie);
    fetchMovieDetails(movie.Title);
    setShow(!show);
  }
  return (
    <>
      <div className="container" style={show?{"height":"100vh","overflow-y":"hidden"} : {}}>
        <div className="row">
          <div className="col">
            <h1>M-Flix</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          {/* {console.log(movies)}; */}
          {movies.map((movie, index) => {
            return (
              <div
                key={index}
                className="col"
                onClick={() => {
                  handleOnCLick(movie);
                }}
              >
                <h1>{movie.Title}</h1>
                <h3>Type : {movie.Type}</h3>
                <h3>Year : {movie.Year}</h3>
                <div className="poster">
                  <img src={movie.Poster}></img>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="modal-container"
        style={show ? { display: "block" } : { display: "none" }}
      >
        <div className="card">
          {console.log(movieDetails)}
          <div className="close-btn" onClick={()=>{setShow(!show)}}><GrClose/></div>
          <div className="left">
            <img src={movieDetails.Poster}></img>
          </div>
          <div className="right">
            <h1>Title : <span>{movieDetails.Title}</span></h1>
            <h1>Year : <span>{movieDetails.Year}</span></h1>
            <h1>Director : <span>{movieDetails.Director}</span></h1>
            <h1>Writer : <span>{movieDetails.Writer}</span></h1>
            <h1>Metascore : <span>{movieDetails.Metascore}</span></h1>
            <h1>Genere : <span>{movieDetails.Genre}</span></h1>
            <h1>Plot : <span>{movieDetails.Plot}</span></h1>
            <h1>Box-Office : <span>{movieDetails.BoxOffice}</span></h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
