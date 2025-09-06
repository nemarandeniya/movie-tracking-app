import React, { useEffect, useState } from 'react'
import { TextField, Box, Typography, Card, CardContent, CardMedia, IconButton, Button, Modal } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import axios from 'axios'

const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")
    const [selectedMovie, setSelectedMovie] = useState(null)
    const fetchMovies = async (query) => {
        try {
            const res = await axios.get(`http://localhost:3000/movies?s=${query}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            setMovies(res.data.movies)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchMovies()
    }, [])

    const handleSearch = () => {
        fetchMovies(search)
    }

    const handlemovieClick = async (imdbId) => {
        try {
            const res = await axios.get(`http://localhost:3000/movies/${imdbId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setSelectedMovie(res.data.movie)
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleMovieSave = async (movie) => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.post("http://localhost:3000/movies/addmovies", {
                imdbID: movie.imdbID,
                title: movie.Title,
                poster: movie.Poster
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })


            if (res.data.success) {
                alert("Movie saved successfully")
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <Box sx={{ maxWidth: "100%", maxHeight: "100vh", mx: "auto", mt: 4, backgroundColor: "#dfe1e0ff", borderRadius: 3, overflowY: "auto" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <Button variant="contained" sx={{ bgcolor: "#67C090", color: "white", ml: 3 }} component={Link} to="/userprofile">User Profile</Button>
            </Box>
            <Typography variant="h5" mb={2} align='center' mt={4} sx={{
                fontFamily: "'Raleway', cursive",
            }}>Movie Profile
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "center" }}>
                <TextField
                    label="Search Movies"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    onClick={handleSearch}
                    sx={{ bgcolor: "#67C090", color: "white", ml: 3 }}
                    startIcon={<SearchIcon />}>
                    Search Movie
                </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 2 }}>

                {movies.map((movie) => (
                    <Card
                        key={movie.imdbID}
                        sx={{ width: 250, backgroundColor: "#d6dcd9ff", borderRadius: 3, cursor: "pointer" }}
                        onClick={() => handlemovieClick(movie.imdbID)}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 1, color: 'green' }}>
                            <IconButton
                                sx={{
                                    bgcolor: '#29eab0ff',
                                    color: 'white',
                                    width: 30,
                                    height: 30,
                                    "&:hover": {
                                        bgcolor: "darkgreen"
                                    },
                                    p: 0
                                }}
                                onClick={(e) => { e.stopPropagation(); handleMovieSave(movie) }}><AddIcon fontSize='small' /></IconButton> {/*onClick={() => handleDelete(movie._id)}*/}
                        </Box>
                        <CardMedia
                            component="img"
                            height="200"
                            sx={{ objectFit: "contain", mt: 2 }}
                            image={movie.Poster}
                            alt={movie.Title}
                        />
                        <CardContent>
                            <Typography
                                id="movie-details"
                                varient="h6"
                                align='center'
                                sx={{ fontFamily: "'Raleway', cursive", }}
                            >
                                {movie.Title + " " + movie.Year}
                            </Typography>
                            {/* <Typography variant="body2" align='center' sx={{ mb: 2 }}>{movie.genre}</Typography>
                            <Typography variant="body2">{movie.description}</Typography> */}

                        </CardContent>
                    </Card>
                ))}
            </Box >

            {/* MODAL FOR MOVIE DETAIL */}
            {/* !!meken exact boolean value eka denwa */}
            <Modal
                open={!!selectedMovie}
                onClose={() => setSelectedMovie(null)}
                aria-labelledby="movie-details"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        bgcolor: "#d6dcd9ff",
                        borderRadius: 3,
                        boxShadow: "none",
                        // border: "none",
                        p: 4,
                    }}>
                    {selectedMovie && (
                        <>
                            <Box sx={{ display: "flex", justifyContent: "space-between", border: "none" }}>
                                <Typography id="movie-details" variant="h6">
                                    {selectedMovie.Title} ({selectedMovie.Year})
                                </Typography>
                                <IconButton onClick={() => setSelectedMovie(null)}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            <CardMedia
                                component="img"
                                height="300"
                                sx={{ objectFit: "contain", mt: 2 }}
                                image={selectedMovie.Poster}
                                alt={selectedMovie.Title}
                            />
                            <Typography sx={{ mt: 2, fontFamily: "'Raleway', cursive", }}>
                                <b>Plot:</b> {selectedMovie.Plot}
                            </Typography>
                            <Typography sx={{ mt: 2, fontFamily: "'Raleway', cursive", }}>
                                <b>Actors:</b> {selectedMovie.Actors}
                            </Typography>
                            <Typography sx={{ fontFamily: "'Raleway', cursive", }}>
                                <b>Director:</b> {selectedMovie.Director}
                            </Typography>
                            <Typography sx={{ fontFamily: "'Raleway', cursive", }}>
                                <b>Genre:</b> {selectedMovie.Genre}
                            </Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>

    )
}

export default MovieList