import React, { useState } from 'react'
import { TextField, Box, Typography, IconButton, Button, InputAdornment, Link as MuiLink } from '@mui/material'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [userData, SetUserData] = useState({})
    const navigate = useNavigate()

    const handleTogglepassword = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "profilePhoto") {
            SetUserData((prevData) => ({ ...prevData, [name]: files[0] }))
            //prevData -->before update , ...prevData--> keep old data
        } else {
            SetUserData((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userOb = new FormData()
        userOb.append("name", userData.name)
        userOb.append("email", userData.email)
        userOb.append("password", userData.password)
        if (userData.profilePhoto) {
            userOb.append("profilePhoto", userData.profilePhoto)
        }

        try {
            const response = await axios.post('http://localhost:3000/users/register', userOb)
            if (response.data.success) {
                alert("add successfully")
                navigate("/")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
                console.log(error);
            }
        }
    }


    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, backgroundColor: "#DDF4E7", borderRadius: 3 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, mx: 4, p: 2 }}>
                <Typography variant="h3" mb={2} align='left' mt={4} sx={{
                    fontFamily: "'Raleway', cursive",
                }}>Sign up
                </Typography>
                <Typography variant="h7" mb={4} align='left' mt={1} sx={{
                    fontFamily: "'Raleway', cursive",
                    color: "#6d6f6eff"
                }}>Please enter your details to create a account
                </Typography>
                <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Username"
                    margin="normal"
                    name='name'
                    placeholder="Enter Your Username"
                    onChange={handleChange}
                    sx={{ flex: 1, mt: 4 }}
                />
                <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Email"
                    placeholder="Enter Your Email"
                    name="email"
                    onChange={handleChange}
                    margin="normal"
                    sx={{ flex: 1 }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglepassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: "#67C090", color: "#5D688A" }}
                >
                    Upload Photo
                    <input type="file" name='profilePhoto' hidden onChange={handleChange} />
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: "#FCF8DD", color: "#5D688A", border: 'black' }}
                >
                    Sign up
                </Button>
                <Typography variant="body2" mb={4} align='left' mt={4} sx={{
                    fontFamily: "'Raleway', cursive",
                    color: "#6d6f6eff"
                }}>
                    Already have an account? <MuiLink component={Link} to="/" sx={{ color: "#5d6ea0ff" }}>Sign in</MuiLink>
                </Typography>
            </Box>
        </Box>
    )
}

export default Register