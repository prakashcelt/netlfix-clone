import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    // console.log(randomMovie)
    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
// export async function postFavMovie(req, res) {
//   const { id } = req.body.movie;

//   try {
//     // Check if the movie is already in the user's favorites
//     let user = await User.findById(req.user._id);

//     const isFavorite = user.fav.some((favMovie) => favMovie.movie === id);

//     if (isFavorite) {
//       // If it's already a favorite, remove it
//       user = await User.findByIdAndUpdate(
//         req.user._id,
//         { $pull: { fav: { movie: id } } },
//         { new: true }
//       );
//     } else {
//       // Otherwise, add it
//       user = await User.findByIdAndUpdate(
//         req.user._id,
//         { $push: { fav: { movie: id } } },
//         { new: true }
//       );
//     }

//     res.status(200).json({ success: true, content: user.fav });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }



// export async function getFavMovie(req, res) {
// 	try {
// 		res.status(200).json({ success: true, content: req.user.fav });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }
export async function postFavMovie(req, res) {const { movie } = req.body;
const { id } = movie;
try {
  let user = await User.findById(req.user._id);
  const isFavorite = user.fav.some((favMovie) => favMovie.movie.id === id);

  if (isFavorite) {
    user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { fav: { movie: id } } },
      { new: true }
    );
  } else {
    user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { fav: { movie } } },
      { new: true }
    );
  }

  res.status(200).json({ success: true, content: user.fav });
} catch (error) {
  res.status(500).json({ success: false, message: "Internal Server Error" });
}
}

// Get favorites
export async function getFavMovies(req, res) {
  try {
    let user = await User.findById(req.user._id).populate('fav.movie');
    res.status(200).json({ success: true, content: user.fav });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
