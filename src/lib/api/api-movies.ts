import axios from 'axios';

export async function fetchPopularMovies(page = 1) {
  const response = await axios.get(`http://localhost:3000/api/v1/movies/popular/${page}`);
  // if (!response.data.ok) {
  //   throw new Error("Failed to fetch popular movies");
  // }
  return response.data;
}

export async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/movies/details/${id}`);
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