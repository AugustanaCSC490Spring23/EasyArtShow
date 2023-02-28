import React, {useEffect, useState} from 'react'
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";

import Login from './authentication/login';
import HostRoom from './hostroom';

const Dashboard = ({user}) => {
    const auth = getAuth();
    const [userInfo, setUser] = useState(null);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
    }, []);

    return (
      <div>
        { userInfo ? <HostRoom user={userInfo}/> : <Login />}
      </div>
    );
  }
  
export default Dashboard;