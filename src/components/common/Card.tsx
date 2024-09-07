import Image from "next/image";
import Rating from "./rating";
import Link from "next/link";

export default function Card(cardInfo) {
  return (
    <Link href={`/home/moviedetails/?id=${encodeURIComponent(cardInfo.cardInfo.id)}`}>
      <div className="rounded-lg max-w-56">
        <Image
          src={
            "https://image.tmdb.org/t/p/w500" + cardInfo.cardInfo.poster_path
          }
          alt={cardInfo.cardInfo.title}
          width={200}
          height={50}
          className="w-full rounded-t-lg"
        ></Image>
        <div className="flex flex-col gap-2 bg-[#262626] text-white max-w-56 h-40s pt-1 px-2 pb-2 rounded-b-lg">
          <h1 className="text-sm font-semibold truncate">
            {cardInfo.cardInfo.title}
          </h1>
          <span className="text-xs w-full max-w-56">
            {cardInfo.cardInfo.release_date}
          </span>
          <div className="flex flex-row justify-between px-4 pt-4">
            <div className="flex flex-col gap-4 justify-center">
              <span>Rating</span>
              <Rating
                total={cardInfo.cardInfo.vote_average}
                thickness={3}
                size={50}
              />
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <span>Favorites</span>
              <button className="flex flex-row justify-center items-center">
                {cardInfo.cardInfo.id > 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 432 392"
                  >
                    <path
                      fill="currentColor"
                      d="m213 391l-31-28q-42-38-62-56.5T72 258t-40.5-49t-22-43.5T0 117q0-49 34-83t83-34q58 0 96 45q38-45 96-45q50 0 84 34t34 83q0 24-10 48.5T395 209t-40.5 49t-48 48.5T244 364z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
