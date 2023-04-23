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
import Dashboard from './screens/host/dashboard';
import WaitingRoom from './screens/host/waitingroom';
import CreateRoom from './screens/host/createroom';
import HostRoom from './screens/host/hostroom';
import JoinRoom from './screens/participant/joinroom';
import UploadPicRoom from './screens/participant/uploadPicRoom';
import DevNote from './screens/devnote';
import Map from './components/Map';
import ThreeDView from './components/ThreeDView';
import PageNotFound from './screens/pageNotFound';
import ContactUs from './screens/contactUs';
import About from './screens/about';
import QRCodeComponent from './components/QRCodeComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/waitingroom/:id" element={<WaitingRoom />} />
            <Route path="/createroom" element={<CreateRoom />} />
            <Route path="/hostroom" element={<HostRoom />} />
            <Route path="/joinroom" element={<JoinRoom />} />
            <Route path="/uploadpicroom/:id" element={<UploadPicRoom />} />
            <Route path="/devnote" element={<DevNote />} />
            <Route path="/map" element={<Map />} />
            <Route path="/threedview" element={<ThreeDView />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/About" element={<About />} />
            <Route path="/qrcode/:id" element={<QRCodeComponent />} />
            <Route path="/threedview" element={<ThreeDView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
