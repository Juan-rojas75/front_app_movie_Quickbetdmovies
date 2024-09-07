"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "@/lib/api/api-movies"; // Necesitas crear esta función para obtener los detalles de la película
import Rating from "@/components/common/rating";
import Image from "next/image";

export default function MovieDetails() {
  const router = useSearchParams();
  const id = router.get("id");
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (id) {
      const loadMovieDetails = async () => {
        try {
          const data = await fetchMovieDetails(id);
          console.log(data);
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
                  </div>
                  <div className="flex flex-row gap-2 flex-wrap">
                    {movieDetails.genres.map((item, index) => (
                    <div
                        key={index}
                        className="p-2 cursor-pointer text-yellow-600 border border-yellow-600 rounded-lg"
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
