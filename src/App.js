import React from "react";

function App() {
  const [movieData, setMovieData] = React.useState([]);
  const [selectedGenre, setSelectedGenre] = React.useState("All Movies");
  const [selectedPage, setSelectedPage] = React.useState(1);
  const [selectTableHeading, setSelectTableHeading] = React.useState("asc");

  const pageSize = 4;

  //fetching Data
  const fetchData = async () => {
    const response = await fetch("movies.json");
    const userData = await response.json();
    setMovieData(userData);
  };

  //To fetch the data and render it when ever refresh
  React.useEffect(() => {
    fetchData();
  }, []);

  //selected option to save the state
  const handleSelectedGenre = (genre) => {
    setSelectedGenre(genre);
  };

  //to filtered the moives on the basis of selected Genre
  const genreFilteredMovies =
    selectedGenre === "All Movies"
      ? movieData
      : movieData.filter((movie) => {
          return movie.Genre === selectedGenre ? true : false;
        });

  //to delete the moives from data
  const deleteMoive = (id) => {
    const tempData = movieData.filter((value) => {
      return id !== value.id;
    });
    setMovieData(tempData);
  };

  //
  const selectedPageNumber = (pageNumber) => {
    setSelectedPage(pageNumber);
  };

  const getPages = () => {
    const totalPages = Math.ceil(genreFilteredMovies.length / pageSize);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages();

  // displaying numbers of pages according to numbers of movies
  const startIndex = selectedPage * pageSize - pageSize;
  const endIndex = selectedPage * pageSize - 1;

  const paginatedMovies = genreFilteredMovies.filter((_movie, index) => {
    if (index >= startIndex && index <= endIndex) {
      return true;
    }

    return false;
  });

  const sortMovies = (heading) => {
    console.log(heading);
    selectTableHeading === "asc"
      ? setSelectTableHeading("des")
      : setSelectTableHeading("asc");

    getHeading(selectTableHeading, heading);
  };

  const getHeading = (selectTableHeading, heading) => {
    if (heading === "Title") {
      selectTableHeading === "asc"
        ? genreFilteredMovies.sort((preMovie, nextMovie) =>
            preMovie.Title > nextMovie.Title ? 1 : -1
          )
        : genreFilteredMovies.sort((preMovie, nextMovie) =>
            preMovie.Title < nextMovie.Title ? 1 : -1
          );
      return;
    } else if (heading === "Genre") {
      selectTableHeading === "asc"
        ? genreFilteredMovies.sort((preMovie, nextMovie) =>
            preMovie.Genre > nextMovie.Genre ? 1 : -1
          )
        : genreFilteredMovies.sort((preMovie, nextMovie) =>
            preMovie.Genre < nextMovie.Genre ? 1 : -1
          );
      return;
    } else if (heading === "Stock") {
      selectTableHeading === "asc"
        ? genreFilteredMovies.sort((preMovie, nextMovie) =>
            preMovie.Metascore > nextMovie.Metascore ? 1 : -1
          )
        : genreFilteredMovies.sort((preMovie, nextMovie) =>
            preMovie.Metascore < nextMovie.Metascore ? 1 : -1
          );
      return;
    } else if (heading === "Rate") {
      selectTableHeading === "asc"
        ? genreFilteredMovies.sort((preMovie, nextMovie) =>
            preMovie.imdbRating > nextMovie.imdbRating ? 1 : -1
          )
        : genreFilteredMovies.sort((preMovie, nextMovie) =>
            preMovie.imdbRating < nextMovie.imdbRating ? 1 : -1
          );
      return;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <ul className="list-group mt-4">
            <li
              className={
                selectedGenre === "All Movies"
                  ? "list-group-item active"
                  : "list-group-item "
              }
              onClick={() => {
                handleSelectedGenre("All Movies");
              }}
            >
              All Movies
            </li>
            <li
              className={
                selectedGenre === "Action"
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => {
                handleSelectedGenre("Action");
              }}
            >
              Action
            </li>
            <li
              className={
                selectedGenre === "Comedy"
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => {
                handleSelectedGenre("Comedy");
              }}
            >
              Comedy
            </li>
            <li
              className={
                selectedGenre === "Thriller"
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => {
                handleSelectedGenre("Thriller");
              }}
            >
              Thriller
            </li>
          </ul>
        </div>
        <div className="col">
          <p className="mt-4"> Showing {genreFilteredMovies.length} moives</p>
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => sortMovies("Title")}>Title</th>
                <th onClick={() => sortMovies("Genre")}>Genre</th>
                <th onClick={() => sortMovies("Stock")}>Stock</th>
                <th onClick={() => sortMovies("Rate")}>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedMovies.map((value, index) => {
                return (
                  <tr>
                    <td>{value.Title}</td>
                    <td>{value.Genre}</td>
                    <td>{value.Metascore}</td>
                    <td>{value.imdbRating}</td>
                    <td>
                      <i className="fa fa-heart" aria-hidden="true"></i>
                      <i className="fa fa-heart-o" aria-hidden="true"></i>
                    </td>
                    <td>
                      <button
                        className=" btn btn-danger"
                        onClick={() => deleteMoive(value.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="nav">
            <ul className="pagination">
              {pages.map((value) => {
                return (
                  <li
                    className={
                      selectedPage === value ? "page-item active" : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      onClick={() => selectedPageNumber(value)}
                    >
                      {value}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
