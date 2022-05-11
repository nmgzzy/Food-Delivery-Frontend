import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { AppProviders } from "./components/AppProvider";
import Dashboard from './pages/dashboard';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Order from "./pages/Order";
import Activate from "./pages/Activate";
import Search from "./pages/Search";
import Restaurant from "./pages/Restaurant";
import RestaurantManage from "./pages/RestaurantManage";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import AdminManage from "./pages/AdminManage";
import ChangePswd from "./pages/ChangePswd";
import ForgetPswd from "./pages/ForgetPswd";

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<Order />} />
            <Route path="/activate" element={<Activate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/restaurantmanage" element={<RestaurantManage />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/adminmanage" element={<AdminManage />} />
            <Route path="/changepswd" element={<ChangePswd />} />
            <Route path="/forgetpswd" element={<ForgetPswd />} />
          </Routes>
        </div>
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
