"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fectMovieDesFav, fectMovieFav, fetchMovieDetails } from "@/lib/api/api-movies"; // Necesitas crear esta función para obtener los detalles de la película
import Rating from "@/components/common/rating";
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store/store';
import Image from "next/image";

export default function MovieDetails() {
  const router = useSearchParams();
  const id = router.get("id");
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (id) {
      const loadMovieDetails = async () => {
        try {
          const data = await fetchMovieDetails(id);
          setMovieDetails(data);
        } catch (error) {
          console.error("Error fetching movie details:", error);
          setError("Error fetching movie details. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      loadMovieDetails();
    }
  }, [id]);

  const handleFav = async (dataMovie , fav) => {
    setIsLoading(true)
    try {
      if (fav) {
        await fectMovieFav(dataMovie,user);
        movieDetails.fav = true
        setMovieDetails(movieDetails)
      }
      else{
        await fectMovieDesFav(dataMovie.id_movie);
        movieDetails.fav = false
        setMovieDetails(movieDetails)
      }

      
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Error fetching movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="">
      {movieDetails ? (
        <>
          <div className="w-full">
            <div
              className="relative bg-cover bg-center h-[400px] flex"
              style={{
                backgroundImage: `url(${
                  "https://image.tmdb.org/t/p/w500" + movieDetails.backdrop_path
                })`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

              <div className="absolute flex flex-row gap-32 z-10 px-14 py-8 w-full text-white">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path
                  }
                  alt={movieDetails.original_title}
                  height={100}
                  width={180}
                ></Image>
                <div className="flex flex-col gap-3 max-w-2xl">
                  <h1 className="text-4xl font-bold mb-4">
                    {movieDetails.original_title}
                  </h1>
                  <div className="flex flex-row justify-between">
                    <span className="text-xs">{movieDetails.release_date}</span>
                    {/* <span className="text-xs">{movieDetails.runtime/60}:{movieDetails.runtime/ - (movieDetails.runtime/60)}</span> */}
                  </div>
                  <p className="text-base text-wrap">{movieDetails.overview}</p>
                  <div className="flex flex-row justify-between items-center">
                    <Rating
                      total={movieDetails.vote_average}
                      thickness={3}
                      size={70}
                    />
                    {/* Almacenar favoritos */}
                    {!movieDetails.fav ? (
                      <button onClick={() => handleFav(movieDetails , true)} className="rounded-full hover:shadow-xl hover:shadow-yellow-800/70">
                        <span className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725"
                            />
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <button onClick={() => handleFav(movieDetails , false)} className="rounded-full hover:shadow-xl hover:shadow-yellow-800/70">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125"
                            />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="flex flex-row gap-2 flex-wrap">
                    {movieDetails.genres.map((item, index) => (
                      <div
                        key={index}
                        className="p-2 text-yellow-600 border border-yellow-600 rounded-lg"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No movie details found.</p>
      )}
    </div>
  );
}
