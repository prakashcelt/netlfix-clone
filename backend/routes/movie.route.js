import express from "express";
import {
  
  getFavMovies,
  getMovieDetails,
  getMoviesByCategory,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingMovie,
  postFavMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/fav", getFavMovies);

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);
router.post("/favmovie", postFavMovie);


export default router;
