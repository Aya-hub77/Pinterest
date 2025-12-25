import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PrivateRoute from "./Context/PrivateRoute";
import PinPage from "./Pages/PinPage";
import CreationTool from "./Pages/Creation-Tool";
import SearchPage from "./Pages/SearchPage";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  return (
   <>
   <ScrollToTop/>
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/pin/:id" element={<PrivateRoute><PinPage /></PrivateRoute>} />
      <Route path="/creation-tool" element={<PrivateRoute><CreationTool /></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
};

export default App;
