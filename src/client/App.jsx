import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import EquipmentPage from "./components/EquipmentPage/EquipmentPage";
import CampgroundList from "./components/CampgroundList/CampgroundList";
import CampgroundPage from "./components/CampgroundPage/CampgroundPage";
import Login from "./components/Login/Login";
import AccountPage from "./components/AccountPage/AccountPage";
import MealPage from "./components/MealPage/MealPage";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token) //delete when website finished

  return (
    <div className="App">
      <NavBar />
      
      <Routes>
        <Route path="/" element={<EquipmentPage />} />
        <Route path="/campgrounds" element={<CampgroundList />} />
        <Route path="/campgrounds/:id" element={<CampgroundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/meal/:id" element={<MealPage />} />
      </Routes>
    </div>
  )
};

export default App;