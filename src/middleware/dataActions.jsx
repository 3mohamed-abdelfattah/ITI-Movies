import axios from 'axios';

export const fetchMovies = (pageNumber) => async (dispatch) => {
  dispatch({ type: 'FETCH_MOVIES_REQUEST' });

  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ec9e0f68699c576a9904e295326db236&page=${pageNumber}`);
    console.log(data.results);
    dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: data.results });
  } catch (error) {
    dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message });
  }
};

export const searchMovies = (search) => async (dispatch) => {
  try {
    dispatch({ type: 'SEARCH_MOVIES_REQUEST' });
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ec9e0f68699c576a9904e295326db236&query=${search}`);
    const data = await response.json();
    dispatch({ type: 'SEARCH_MOVIES_SUCCESS', payload: data.results });
  } catch (error) {
    dispatch({ type: 'SEARCH_MOVIES_FAILURE', payload: error.message });
  }
};
