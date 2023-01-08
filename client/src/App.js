import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
               <Link to="/createpost">Create A Post</Link> 
               <Link to="/">Home</Link> 
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/createpost" element={<CreatePost/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
