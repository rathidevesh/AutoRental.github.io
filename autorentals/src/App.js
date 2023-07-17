import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Addcar from './components/Addcar';
import { useState } from 'react';
import NoteState from './context/notes/NoteState';
import Notes from './components/Notes';
import BookingCar from './components/BookingCar';
import History from './components/History';
// import './App.css'; 

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="appcontainer">
            <Routes>
              <Route path="/home" element={<Home showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route path="/addcar" element={<Addcar />} />
              <Route path="/SeeCar" element={<Notes />} />
              <Route path="/booking/:id" element={<BookingCar />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
