import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi"
import "./assets/css/App.css";

function App() {
  const [search,setSearch] = useState("");
  const [movies, setMovies] = useState([]);
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

  useEffect(() => {
    fetchMovies(search === "" ? "Open" : search);
  }, [search]);
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>M-Flix</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input type="text" onChange={(e)=>{setSearch(e.target.value);}}/>
        </div>
      </div>
      <div className="row">
      {console.log(movies)};
      {movies.map((movie, index) => {
        return <div key={index} className="col card">
        <h1>{movie.Title}</h1>
        <h3>Type : {movie.Type}</h3>
        <h3>Year : {movie.Year}</h3>
        <div className="poster">
        <img src={movie.Poster}></img>
        </div>
        </div>;
      })}
      </div>
    </div>
    </>
  );
}

export default App;
