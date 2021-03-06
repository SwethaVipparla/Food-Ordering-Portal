import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import BuyerDashboard from "./components/users/BuyerDashboard";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import MyOrders from "./components/users/MyOrders";
import Login from "./components/common/Login";
import VendorDashboard from "./components/users/VendorDashboard";

const isLoggedIn = window.localStorage.getItem("email") ? true : false;

const Layout = () => {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn}/>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="buyerdashboard" element={<BuyerDashboard />} />
          <Route path="vendordashboard" element={<VendorDashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="myorders" element={<MyOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
