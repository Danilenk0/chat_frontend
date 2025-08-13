import React from 'react';
import './App.scss';
import { Routes, Route, useLocation} from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import "boxicons";
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
