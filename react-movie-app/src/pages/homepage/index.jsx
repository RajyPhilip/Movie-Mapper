import { useReducer } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ThemeContext } from "../../App";
import Search from "../../components";
import FavoriteItem from "../../components/favourite-item";
import MovieItem from "../../components/movie-item";
import "../../components/movie-item/styles.css";
import './styles.css'


const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorite":
      console.log(action) ;
      return {
        ...state,
        filteredValue:action.value
      };

    default:
      return state;
  }
};
const initialState = {
  filteredValue: "",
};

const Homepage = () => {

  const {theme} = useContext(ThemeContext);
  //loading state movies state nd fav state
  const [loading, setLoading] = useState(false);
  const [Movies, setMovies] = useState([]);
  const [fav, setFav] = useState([]);
  const [apiCall, setApiCall] = useState(false);

  // use Reducer
  const [filteredState, dispatch] = useReducer(reducer, initialState);


  // save result that we recieve from api

  const getSearchData = (getdata) => {
    // keep loading true as calling api
    setLoading(true);

    //caling the api after getting form value

    async function getMovies() {
      await fetch(`http://www.omdbapi.com/?s=${getdata}&apikey=f1c62b9b`)
        .then((res) => res.json())
        .then((data) => {
          // logic
          const results = data.Search;

          if (results.length > 0) {
            setLoading(false);
            setMovies(results);
            setApiCall(true);
          }
        });
    }

    getMovies();
  };

  const addToFavorites = (getCurrentMovie) => {
    let oldFav = [...fav];
    console.log("OLD FAV",oldFav)

    const index = oldFav.findIndex(
      (item) => item.imdbID === getCurrentMovie.imdbID
    );

    if (index === -1) {
      oldFav.push(getCurrentMovie);
      setFav(oldFav);
      //saving fav in local storage
      localStorage.setItem("favorites", JSON.stringify(oldFav));
    } else {
      alert("Item is already present in Favorites");
    }
  };

  const removeFromFavorites = (getCurrentMovie) => {
    // console.log("KSKSKS",getCurrentMovie.imdbID)
    let oldFav = [...fav];
    oldFav = oldFav.filter((item) => item.imdbID !== getCurrentMovie.imdbID);

    setFav(oldFav);
    localStorage.setItem("favorites", JSON.stringify(oldFav));
  };

  useEffect(() => {
    const extractFavLocalStorage = JSON.parse(
      localStorage.getItem("favorites")
    );
    setFav(extractFavLocalStorage);
  }, []);
  console.log(filteredState, "FKSAFK");
  //filtering the fav
  // const filteredFavItems = fav.filter((item)=>{
  //   item.title.toLowerCase().includes(filteredState.filteredValue)
  // })


  const renderMovies = useCallback(()=>{
    if(Movies && Movies.length >0){
      return(
        Movies.map((item) => (
          <MovieItem
            addToFavorites={() => addToFavorites(item)}
            item={item}
          />
        ))
      )
    }
  },[Movies,addToFavorites])

  return (
    <div className="homepage">
      {
        <div className="favorites-wrapper">
          <h1 style={theme ?{color:"#12342b"}:{}} className="favorites-title">Your Favourite</h1>
          {/* <div className="search-favorites">
            <input
              onChange={(e) =>
                dispatch({ type: "filterFavorite", value: e.target.value })
              }
              value={filteredState.filteredValue}
              name="searchFavorites "
              placeholder="Search Favorites"
            />
          </div> */}
          <div className="favorites">
            {fav && fav.length > 0
              ? fav.map((item) => (
                  <FavoriteItem
                    removeFromFavorites={() => removeFromFavorites(item)}
                    item={item}
                  />
                ))
              : <h3 style={theme ?{color:"#12342b"}:{}} className="emptyfav">Search Movies below and add to Favourites</h3>}
          </div>
        </div>
      }

            <Search
        getSearchData={getSearchData}
        apiCall={apiCall}
        setApiCall={setApiCall}
      />

      {loading && <div className="loading">Loading Movies ! Please wait.</div>}

      <div className="items">
        {
          renderMovies()
        }
      </div>
    </div>
  );
};

export default Homepage;
