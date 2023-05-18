import React, {useEffect, useState} from 'react'
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { auth } from '../../backend/firebase';

import Login from '../../screens/host/authentication/login';
import HostRoom from '../../screens/host/hostroom';

const Dashboard = ({user}) => {
    // const auth = getAuth();
    const [userInfo, setUser] = useState(null);
    
    // console.log(auth.currentUser)
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
    }, []);

    return (
      <>
        { userInfo ? <HostRoom user={userInfo}/> : <Login />}
      </>
    );
  }
  
export default Dashboard;