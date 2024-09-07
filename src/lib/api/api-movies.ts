'use client';
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
    const response = await fetch(`${urlApi_}/api/v1/movies?username=${username}`);
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

export async function fectMovieFav(data,user){
    const response = await fetch(`${urlApi_}/api/v1/movies/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_movie:data.id,
        poster_path:data.poster_path,
        title:data.title,
        release_date:data.release_date,
        vote_average:data.vote_average,
        fav:data.fav,
        username:user
      }),
    });


  return response
  
}
export async function fectMovieDesFav(id) {
  try {
    const response = await fetch(`${urlApi_}/api/v1/movies/${id}`,{method:"DELETE"});
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