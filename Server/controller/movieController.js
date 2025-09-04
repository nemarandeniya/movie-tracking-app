import Movie from "../models/movieModel.js";
import multer from "multer";
import path from "path"
import axios from "axios"

// const storage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         cb(null, "public/uploads")
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))//date ekata file eke name eke thiyene ext kalla wen karla aragena add krnw 
//     }
// })

// //creates the upload middleware for handling file uploads
// const upload = multer({ storage: storage })

const getMovies = async (req, res) => {
    try {
        const search = req.query.s || "avengers";//looks for the query parameter s in the request URL

        const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${search}`)
        // console.log(movies);
        const movies = response.data.Search || [];

        return res.status(200).json({ success: true, movies })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get movies server error" })
    }
}

const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${id}`)
        return res.status(200).json({ success: true, movie: response.data })

    } catch (error) {
        return res.status(500).json({ success: false, error: "get movie data server error" })
    }
}

// const addMovie = async (req, res) => {
//     try {
//         const { movieName, genre, year, description } = req.body

//         //duplicate check
//         const existing = await Movie.findOne({ title: movieName, year })
//         if (existing) {
//             return res.status(400).json({ success: false, message: "Movie already exists" })
//         }

//         //add movie
//         const newMovie = new Movie({
//             title: movieName,
//             genre,
//             year,
//             description,
//             poster: req.file ? req.file.filename : ""
//         })

//         await newMovie.save()
//         return res.status(200).json({ success: true, message: "movie added" })
//     } catch (error) {
//         console.error("Add Movie Error:", error);
//         return res.status(500).json({ success: false, error: "error in adding movie " })
//     }
// }

// const getMovieById = async (req, res) => {
//     const { id } = req.params;
//     console.log(id);

//     try {
//         const movie = await Movie.findOne({ _id: id })
//         return res.status(200).json({
//             success: true, movie: {
//                 movieName: movie.title,   // map DB field to frontend field
//                 genre: movie.genre,
//                 year: movie.year,
//                 description: movie.description,
//                 poster: movie.poster
//             }
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, error: "error in get movie" })

//     }
// }

// const updateMovie = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { movieName, genre, year, description } = req.body;
//         const updateMovie = await Movie.findByIdAndUpdate({ _id: id }, {
//             title: movieName,
//             genre,
//             year,
//             description
//         })
//         return res.status(200).json({ success: true, updateMovie })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, error: "update movie server error" })

//     }
// }

// const deleteMovie = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log("Deleting movie with id:", id);
//         await Movie.findByIdAndDelete(id)

//         return res.status(200).json({ success: true, message: "Movie Deleted SuccessFully" })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ success: false, error: "delete movie server error" })
//     }
// }

export { getMovies, getMovieDetails, /*addMovie,upload, getMovieById, updateMovie, deleteMovie */ }