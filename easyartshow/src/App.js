import './App.css';
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

import Login from './screens/host/authentication/login';
import SignUp from './screens/host/authentication/signup';
import MainPage from './screens/mainpage';
import Dashboard from './screens/host/dashboard';
import WaitingRoom from './screens/host/waitingroom';
import CreateRoom from './screens/host/createroom';
import HostRoom from './screens/host/hostroom';
import JoinRoom from './screens/participant/joinroom';
import UploadPicRoom from './screens/participant/uploadPicRoom';
import DevNote from './screens/devnote';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/waitingroom" element={<WaitingRoom />} />
            <Route path="/createroom" element={<CreateRoom />} />
            <Route path="/hostroom" element={<HostRoom />} />
            <Route path="/joinroom" element={<JoinRoom />} />
            <Route path="/uploadpicroom" element={<UploadPicRoom />} />
            <Route path="/devnote" element={<DevNote />} />
            <Route path="/map" element={<Map />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
