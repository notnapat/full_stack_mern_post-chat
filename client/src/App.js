import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registertion from "./pages/Registertion";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [authState, setAuthState] = useState(false);
    useEffect(() => {
        axios
            .get("http://localhost:3001/auth/auth", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((Response) => {
                if (Response.data.error) {
                    setAuthState(false);
                } else {
                    setAuthState(true);
                }
            });
    }, []);
    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <BrowserRouter>
                    <div className="navbar">
                        <Link to="/createpost">Create A Post</Link>
                        <Link to="/">Home</Link>
                        {!authState && (
                            <>
                                <Link to="/registertion">Registertion</Link>
                                <Link to="/login">Login</Link>
                            </>
                        )}
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/createpost" element={<CreatePost />} />
                        <Route path="/post/:id" element={<Post />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/registertion"
                            element={<Registertion />}
                        />
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
