import './App.css';
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

import Login from './screens/host/authentication/login';
import MainPage from './screens/mainpage';
import Dashboard from './screens/host/dashboard';
import WaitingRoom from './screens/host/waitingroom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/waitingroom" element={<WaitingRoom />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
