import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login"
import Registertion from "./pages/Registertion";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="navbar">
                    <Link to="/createpost">Create A Post</Link>
                    <Link to="/">Home</Link>
                    <Link to="/registertion">Registertion</Link>
                    <Link to="/login">Login</Link>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/createpost" element={<CreatePost />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registertion" element={<Registertion />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
