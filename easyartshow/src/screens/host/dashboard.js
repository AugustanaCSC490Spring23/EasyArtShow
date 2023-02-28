import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";

import Login from './authentication/login';
import HostRoom from './hostroom';

const Dashboard = ({user}) => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [userInfo, setUser] = useState(null);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
    }, []);

    const logout = () => {
      signOut(auth).then(() => {
        console.log("Sign-out successful.");
      }).catch((error) => {
        console.log(error.message)
      });
    } 

    return (
      <div>
        { userInfo ? <HostRoom user={userInfo}/> : <Login />}
      </div>
    );
  }
  
export default Dashboard;