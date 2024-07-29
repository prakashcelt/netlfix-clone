// import { useEffect, useRef, useState } from "react";
// import { useContentStore } from "../store/content";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { SMALL_IMG_BASE_URL } from "../utils/constants";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

// const MovieSlider = ({ category }) => {
//   const { contentType } = useContentStore();
//   const [content, setContent] = useState([]);
//   const [showArrows, setShowArrows] = useState(false);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const sliderRef = useRef(null);

//   const formattedCategoryName =
//     category.replaceAll("_", " ")[0].toUpperCase() +
//     category.replaceAll("_", " ").slice(1);
//   const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

//   useEffect(() => {
//     const getContent = async () => {
//       const res = await axios.get(`/api/v1/${contentType}/${category}`);
//       setContent(res.data.content);
//     };

//     getContent();
//   }, [contentType, category]);

//   const scrollLeft = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({
//         left: -sliderRef.current.offsetWidth,
//         behavior: "smooth",
//       });
//     }
//   };
//   const scrollRight = () => {
//     sliderRef.current.scrollBy({
//       left: sliderRef.current.offsetWidth,
//       behavior: "smooth",
//     });
//   };
//   const handleFav = async (movie) => {
//     setIsFavorited(!isFavorited);

//     const res = await axios.post(`/api/v1/movie/favmovie/${movie}`);
//     console.log(res.data);
//     console.log(movie);
//   };

//   return (
//     <div
//       className="bg-black text-white relative px-5 md:px-20"
//       onMouseEnter={() => setShowArrows(true)}
//       onMouseLeave={() => setShowArrows(false)}
//     >
//       <h2 className="mb-4 text-2xl font-bold">
//         {formattedCategoryName} {formattedContentType}
//       </h2>

//       <div
//         className="flex space-x-4 overflow-x-scroll scrollbar-hide"
//         ref={sliderRef}
//       >
//         {content.map((item) => (
//           <Link
//             to={`/watch/${item.id}`}
//             className="min-w-[250px] relative group"
//             key={item.id}
//           >
//             <div className="rounded-lg overflow-hidden relative">
//               <div
//                 className="z-20 absolute"
//                 onClick={() => handleFav(item.title || item.name)}
//               >
//                 {isFavorited ? (
//                   <MdFavorite className="text-red-500" />
//                 ) : (
//                   <MdFavoriteBorder />
//                 )}
//               </div>

//               <img
//                 src={SMALL_IMG_BASE_URL + item.backdrop_path}
//                 alt="Movie image"
//                 className="transition-transform duration-300 ease-in-out group-hover:scale-125 z-10"
//               />
//             </div>
//             <p className="mt-2 text-center">{item.title || item.name}</p>
//           </Link>
//         ))}
//       </div>

//       {showArrows && (
//         <>
//           <button
//             className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
//             size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
//             "
//             onClick={scrollLeft}
//           >
//             <ChevronLeft size={24} />
//           </button>

//           <button
//             className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
//             size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
//             "
//             onClick={scrollRight}
//           >
//             <ChevronRight size={24} />
//           </button>
//         </>
//       )}
//     </div>
//   );
// };
// export default MovieSlider;



//divider
import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const [favorites, setFavorites] = useState({});

  const sliderRef = useRef(null);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };

    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleFav = async (movie) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [movie.id]: !prevFavorites[movie.id],
    }));
  
    try {
      const res = await axios.post(`/api/v1/movie/favmovie`, { movie });
      console.log(res.data);
      console.log(movie);
    } catch (error) {
      console.error("Failed to update favorite", error);
    }
  };

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content.map((item) => (
          <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
            <div className="rounded-lg overflow-hidden relative">
              <div
                className="z-20 absolute top-2 right-2"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the Link click
                  handleFav(item);
                }}
              >
                {favorites[item.id] ? (
                  <MdFavorite className="text-red-500" />
                ) : (
                  <MdFavoriteBorder />
                )}
              </div>

              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt="Movie image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125 z-10"
              />
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;


