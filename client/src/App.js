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
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
    });
    useEffect(() => {
        axios
            .get("http://localhost:3001/auth/auth", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({ ...authState, status: false });
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        status: true,
                    });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ username: "", id: 0, status: false });
    };
    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <BrowserRouter>
                    <div className="navbar">
                        <div className="links">
                            {!authState.status ? (
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/registertion">Registertion</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/">Home</Link>
                                    <Link to="/createpost">Create A Post</Link>
                                </>
                            )}
                        </div>
                        <div className="loggedInContainer">
                            <h1>{authState.username}</h1>
                            {authState.status && (
                                <button onClick={logout}>logout</button>
                            )}
                        </div>
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
                        <Route path="/changepassword" element={<ChangePassword />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
