import axios from 'axios';
// const urlApi_ = "https://backend-app-movie-quickbetdmovies.onrender.com"
const urlApi_ = "http://localhost:4000"
export async function fetchPopularMovies(page = 1) {
  const response = await axios.get(`${urlApi_}/api/v1/movies/popular/${page}`);
  // if (!response.data.ok) {
  //   throw new Error("Failed to fetch popular movies");
  // }
  return response.data;
}

export async function fetchMovieFavs(username) {
  try {
    const response = await fetch(`${urlApi_}/api/v1/movies/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

export async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`${urlApi_}/api/v1/movies/details/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}