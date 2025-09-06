import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Avatar } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import axios from 'axios'

const UserProfile = () => {

    const [user, setUser] = useState(null)

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.get("http://localhost:3000/users/userprofile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data.user)
            console.log(res.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const removeMovie = async (imdbId) => {
        try {
            const token = localStorage.getItem("token")
            await axios.post(
                "http://localhost:3000/movies/removemovies", {
                imdbId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setUser(prev => ({
                ...prev,
                savedMovies: prev.savedMovies.filter(m => m.imdbId !== imdbId)
            }))
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <Box sx={{ maxWidth: "100%", maxHeight: "100vh", mx: "auto", mt: 4, backgroundColor: "#dfe1e0ff", borderRadius: 3, overflowY: "auto" }}>
            {user && (
                <>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 2, justifyContent: 'center' }}>
                        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, gap: 2 }}>
                                <Avatar
                                    src={user.profilePhoto ? `http://localhost:3000${user.profilePhoto}` : ""}
                                    alt={user.name}
                                    sx={{
                                        width: 100,
                                        height: 100
                                    }}>
                                </Avatar>
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant="body1" sx={{ fontFamily: "'Raleway', cursive", }}>Name : {user.name}</Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "'Raleway', cursive", }}>Email : {user.email}</Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "'Raleway', cursive", }}>No of Movies : {user.savedMovies ? user.savedMovies.length : 0}</Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Box >

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 2 }}>
                        {user.savedMovies.map((movie) => (
                            <Card
                                key={movie._id}
                                sx={{ width: 250, backgroundColor: "#d6dcd9ff", borderRadius: 3, cursor: "pointer" }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 1, color: 'green' }}>
                                    <IconButton
                                        sx={{
                                            bgcolor: '#ea2966ff',
                                            color: 'white',
                                            width: 30,
                                            height: 30,
                                            "&:hover": {
                                                bgcolor: "darkgreen"
                                            },
                                            p: 0
                                        }}
                                        onClick={() => removeMovie(movie.imdbId)}
                                    ><RemoveIcon fontSize='small' /></IconButton> {/*onClick={(e) => { e.stopPropagation(); handleMovieSave(movie) }}*/}
                                </Box>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    sx={{ objectFit: "contain", mt: 2 }}
                                    image={movie.poster}
                                    alt={movie.title}
                                />
                                <CardContent>
                                    <Typography
                                        id="movie-details"
                                        varient="h6"
                                        align='center'
                                        sx={{ fontFamily: "'Raleway', cursive", }}
                                    >
                                        {movie.title}
                                    </Typography>
                                    {/* <Typography variant="body2" align='center' sx={{ mb: 2 }}>{movie.genre}</Typography>
                            <Typography variant="body2">{movie.description}</Typography> */}

                                </CardContent>
                            </Card>
                        ))}
                    </Box >
                </>
            )}

        </Box >
    )
}

export default UserProfile