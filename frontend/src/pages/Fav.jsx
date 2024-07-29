import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";

export default function Fav() {
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const getFav = async () => {
      try {
        const res = await axios.get("/api/v1/movie/fav");
        setFav(res.data.content);
      } catch (error) {
        setFav([]);
      }
    };
    getFav();
  }, []);

  const handleDelete = async (movieId) => {
    try {
      await axios.post(`/api/v1/movie/favmovie`, { movie: { id: movieId } });
      setFav((prevFav) =>
        prevFav.filter((movie) => movie.movie.id !== movieId)
      );
    } catch (error) {
      console.error("Failed to delete favorite movie", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Favorite Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fav.map((entry) => (
            <div
              key={entry.movie.id}
              className="bg-gray-800 p-4 rounded flex items-start"
            >
              <img
                src={`${SMALL_IMG_BASE_URL}${entry.movie.poster_path}`}
                alt="Movie poster"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col flex-grow">
                <span className="text-white text-lg">{entry.movie.title}</span>
                <p className="text-gray-400">{entry.movie.overview}</p>
              </div>
              <button
                className="ml-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                onClick={() => handleDelete(entry.movie.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
