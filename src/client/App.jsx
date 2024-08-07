import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import EquipmentPage from "./components/EquipmentPage/EquipmentPage";
import CampgroundPage from "./components/CampgroundPage/CampgroundPage";
import Login from "./components/Login/Login";
import AccountPage from "./components/AccountPage/AccountPage";
import MealPage from "./components/MealPage/MealPage";
import CampgroundList from "./components/CampgroundList/CampgroundList"
import TripPage from "./components/TripPage/TripPage";
import TripHistory from "./components/TripHistory/TripHistory";
import EditUser from "./components/AccountPage/EditUser";
import NewCampground from "./components/NewCampground/NewCampground";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token) //delete when website finished
  
  return (
    <div className="App">
      <NavBar />
      
      <Routes>
        <Route path="/" element={<EquipmentPage />} />
        <Route path="/campgrounds" element={<CampgroundList />} />
        <Route path="/campgrounds/new/post" element={<NewCampground />} />
        <Route path="/campgrounds/:id" element={<CampgroundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/edit" element={<EditUser />} />
        <Route path="/meal/:id" element={<MealPage />} />
        <Route path="/trip/history" element={<TripHistory />} />
        <Route path="/trip/:id" element={<TripPage />} />
      </Routes>
    </div>
  )
};

export default App;