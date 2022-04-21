import React from "react";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/Signup";
import Order from "./pages/Order";
import Activate from "./pages/Activate";
// import Trolley from "./Trolley";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/activate" element={<Activate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
