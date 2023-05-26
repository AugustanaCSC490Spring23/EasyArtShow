import './App.css';
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
  Navigate
} from "react-router-dom";
import React from 'react';

import Login from './screens/host/authentication/login';
// import SignUp from './screens/host/authentication/signup';
import MainPage from './screens/mainpage';
import Dashboard from './components/Dashboard/dashboard';
import ContactUs from './screens/contact/contactUs';
import WaitingRoom from './components/Room/WaitingRoom/waitingroom';
import CreateRoom from './components/Room/CreateRoom/createroom';
import HostRoom from './screens/host/hostroom';
import JoinRoom from './screens/participant/joinroom';
import UploadPicRoom from './screens/participant/uploadPicRoom';
import UploadWithAI from './screens/participant/uploadWithAI';
import DevNote from './screens/devnote';
import Map from './components/Map';
import PageNotFound from './screens/pageNotFound';
import About from './screens/about/about';
import QRCodeComponent from './components/QRCodeComponent';
import SlideShow from './components/Room/SlideShow/SlideShow';
import Demo3D from './components/Room/Demo3D/Demo3D.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/waitingroom/:id" element={<WaitingRoom />} />
            <Route path="/createroom" element={<CreateRoom />} />
            <Route path="/hostroom" element={<HostRoom />} />
            <Route path="/joinroom" element={<JoinRoom />} />
            <Route path="/uploadpicroom/:id" element={<UploadPicRoom />} />
            <Route path="/uploadwithai/:id" element={<UploadWithAI />} />
            <Route path="/devnote" element={<DevNote />} />
            <Route path="/map" element={<Map />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/qrcode/:id" element={<QRCodeComponent />} />
            <Route path="/slideshow/:id" element={<SlideShow/>} />
            <Route path="/demo3d" element={<Demo3D/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
