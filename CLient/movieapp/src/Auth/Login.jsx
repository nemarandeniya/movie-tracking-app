import React, { useState } from 'react'
import { TextField, Box, Typography, IconButton, Button, InputAdornment, Link as MuiLink } from '@mui/material'
import { Visibility, VisibilityOff, } from "@mui/icons-material";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleTogglepassword = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/users/login", loginData, {
                headers: { "Content-Type": "application/json" }
            })
            if (response.data.success) {
                console.log(response);

                alert("Login successful")
                localStorage.setItem("token", response.data.token)
                navigate("/movies")
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
                }}>Welcome back
                </Typography>
                <Typography variant="h7" mb={4} align='left' mt={1} sx={{
                    fontFamily: "'Raleway', cursive",
                    color: "#6d6f6eff"
                }}>Please enter your details
                </Typography>
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
                    placeholder="Enter Your Password"
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
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: "#FCF8DD", color: "#5D688A", border: 'black' }}
                >
                    Sign in
                </Button>

                <Typography variant="body2" mb={4} align='left' mt={4} sx={{
                    fontFamily: "'Raleway', cursive",
                    color: "#6d6f6eff"
                }}>
                    Don't have an account? <MuiLink component={Link} to="/register" sx={{ color: "#5d6ea0ff" }}>Sign up</MuiLink>
                </Typography>
            </Box>
        </Box>
    )
}

export default Login