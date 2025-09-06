import express from "express"
import { getMovies, getMovieDetails, addMoviesToUser, removeMoviesFromUser } from "../controller/movieController.js"
import verifyUser from '../middleware/authMiddleware.js'

const router = express.Router()

/* READ */
router.get('/', verifyUser, getMovies)
router.get('/:id', verifyUser, getMovieDetails)
router.post('/addmovies', verifyUser, addMoviesToUser)
router.post('/removemovies', verifyUser, removeMoviesFromUser)


export default router