
import axios from "axios"


const getMovies = async (req, res) => {
    try {
        const search = req.query.s || "avengers";//looks for the query parameter s in the request URL

        const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${search}`)
        // console.log(movies);
        const movies = response.data.Search || [];

        return res.status(200).json({ success: true, movies })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, error: "get movies server error" })
    }
}

const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${id}`)
        console.log(response);

        return res.status(200).json({ success: true, movie: response.data })

    } catch (error) {
        return res.status(500).json({ success: false, error: "get movie data server error" })
    }
}

const addMoviesToUser = async (req, res) => {
    try {
        const { imdbID, title, poster } = req.body

        const imdbId = imdbID


        const existingmovie = req.user.savedMovies.find(m => m.imdbId === imdbId)
        if (existingmovie) {
            return res.status(400).json({ success: false, message: "Movie already saved" })
        }

        //add
        req.user.savedMovies.push({ imdbId, title, poster })
        await req.user.save()

        res.status(200).json({ success: true, user: req.user });

    } catch (error) {
        res.status(500).json({ success: false, error: "Could not save movie" });
    }
}

const removeMoviesFromUser = async (req, res) => {
    try {
        const { imdbId } = req.body;
        console.log("Remove movie body:", req.body);
        req.user.savedMovies = req.user.savedMovies.filter(m => m.imdbId !== imdbId)
        await req.user.save()

        res.json({ success: true, message: "Movie removed", user: req.user })
    } catch (error) {
        res.status(500).json({ success: false, error: "Could not remove movie" })
    }
}



export { getMovies, getMovieDetails, addMoviesToUser, removeMoviesFromUser }