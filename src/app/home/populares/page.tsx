"use client";
import { useState, useEffect } from "react";
import Card from "@/components/common/Card";
import Mainbanner from "@/components/layout/main-banner";
import Sidebar from "@/components/layout/side-bar";
import { fetchPopularMovies } from "@/lib/api/api-movies";

export default function Popular() {
  const [allMovies, setAllMovies] = useState(null); // Estado para todas las películas
  const [filteredMovies, setFilteredMovies] = useState(null); // Estado para películas filtradas
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores

  const loadMovies = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPopularMovies(page);
      setAllMovies(data); // Guardar todas las películas obtenidas
      setFilteredMovies(data); // Inicialmente, todas las películas son las filtradas
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Error fetching movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(currentPage);
  }, [currentPage]);

  // Filtrar por género
  const handleItemSelected = (item) => {
    if (!allMovies) return; // Si no hay películas, salir

    // Filtrar las películas que contienen el género específico
    const newData = allMovies.results.filter((movie) =>
      movie.genre_ids.includes(item)
    );

    setFilteredMovies({ ...allMovies, results: newData }); // Actualizar las películas filtradas
  };

  if (isLoading) {
    return (
      <div role="fixed z-10 status">
        {/* Indicador de carga */}
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      {allMovies && <Mainbanner dataMovie={allMovies.results[0]} />}
      <section className="flex flex-row w-full bg-[#454545]">
        <Sidebar onsearchData={handleItemSelected} />
        <article>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
                className={`px-4 py-2 rounded ${
                    filteredMovies === allMovies
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                disabled={filteredMovies === allMovies}
                onClick={() => loadMovies(currentPage)}
                >
                Refrescar
                </button>
            <button
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white"
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>

            <span className="text-white font-semibold">Page {currentPage}</span>

            <button
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
          <div className="flex flex-row gap-5 flex-wrap p-10">
            {filteredMovies &&
              filteredMovies.results.map((movie) => (
                <div key={movie.id}>
                  <Card cardInfo={movie} />
                </div>
              ))}
          </div>
        </article>
      </section>
    </>
  );
}
