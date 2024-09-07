"use client";
import { useState } from "react";
import FilterableList from "../common/FilterableList";
// import ButtonTheme from "./theme";

export default function Sidebar({onsearchData}) {
  const [ setSelectedItem] = useState(null);
  const Genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  const handleItemSelected = (item) => {
    setSelectedItem(item);
    onsearchData(item);
  };
  return (
    <div className="text-base h-screen">
      <nav className="flex flex-col gap-4 px-4 py-5 bg-[#262626] h-screen items-center text-white ">
        {/* Search */}
        <div className="flex flex-col gap-2">
          <h1 className="text-sm font-semibold dark:text-red-300">Search</h1>
          <div>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Keywords"
              className="bg-[#1C1C1C] h-10 pl-5 rounded-t-sm border-b border-white outline-none"
            />
          </div>
        </div>
        {/* Genres */}
        <FilterableList
          title={'Genre'}
          items={Genres}
          onItemSelected={handleItemSelected}
        ></FilterableList>
      </nav>
      {/* <ButtonTheme></ButtonTheme> */}
    </div>
  );
}
