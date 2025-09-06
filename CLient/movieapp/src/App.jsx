import { BrowserRouter, Routes, Route } from "react-router-dom"
import MovieList from "./Movie/MovieList"
import Register from "./Auth/Register"
import Login from "./Auth/Login"
import UserProfile from "./Movie/UserProfile"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/movies" element={<MovieList />}></Route>
        <Route path="/userprofile" element={<UserProfile />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
