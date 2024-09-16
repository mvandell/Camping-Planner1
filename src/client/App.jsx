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
import EditCampground from "./components/CampgroundPage/EditCampground";
import NewCampground from "./components/CampgroundPage/NewCampground";
import EditTrip from "./components/TripPage/EditTrip";
import NewTrip from "./components/TripHistory/NewTrip";
import Homepage from "./components/Homepage/Homepage";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token) //delete when website finished
  
  return (
    <div className="App">
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/campgrounds" element={<CampgroundList />} />
        <Route path="/campgrounds/new/post" element={<NewCampground />} />
        <Route path="/campgrounds/:id/edit" element={<EditCampground />} />
        <Route path="/campground/:id" element={<CampgroundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/edit" element={<EditUser />} />
        <Route path="/meal/:id" element={<MealPage />} />
        <Route path="/trip/history" element={<TripHistory />} />
        <Route path="/trip/new" element={<NewTrip />} />
        <Route path="/trip/:id/edit" element={<EditTrip />} />
        <Route path="/trip/:id" element={<TripPage />} />
      </Routes>
    </div>
  )
};

export default App;