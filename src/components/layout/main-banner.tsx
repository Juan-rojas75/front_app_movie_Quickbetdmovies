import Image from "next/image";
import Rating from "../common/rating";

export default function Mainbanner(dataMovie: any) {
  return (
    <div className="w-full">
      <div
        className="relative bg-cover bg-center h-[400px] flex items-end"
        style={{
          backgroundImage: `url(${
            "https://image.tmdb.org/t/p/w500" +
            dataMovie.dataMovie.backdrop_path
          })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

        <div className="relative flex flex-row gap-10 justify-between z-10 p-8 w-full items-end text-white">
          <div className="max-w-2xl items-end">
            <h1 className="text-2xl font-bold mb-4">
              {dataMovie.dataMovie.original_title}
            </h1>
            <p className="text-base text-wrap">{dataMovie.dataMovie.overview}</p>
          </div>
          <div className="flex items-center">
            <Rating total={dataMovie.dataMovie.vote_average} thickness={3} size={70}/>
          </div>
        </div>
      </div>
    </div>
  );
}
