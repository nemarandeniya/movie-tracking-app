import express from "express"
import { getMovies, getMovieDetails  /*, addMovie, upload, getMovieById, updateMovie, deleteMovie */ } from "../controller/movieController.js"

const router = express.Router()

/* READ */
router.get('/', getMovies)
router.get('/:id', getMovieDetails)
// router.post('/add', upload.single('poster'), addMovie)
// router.get("/:id", getMovieById)
// router.put("/:id", updateMovie)
// router.delete("/:id", deleteMovie)

export default router