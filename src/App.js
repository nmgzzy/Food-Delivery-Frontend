import React from "react";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/Signup";
// import Trolley from "./Trolley";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <p>hello</p>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/signup">signup</Link></li>
          <li><Link to="/login">login</Link></li>
        </ul>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
