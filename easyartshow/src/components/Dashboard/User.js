import React, { useEffect, useRef } from "react";
import { getAuth } from '@firebase/auth';
import Typed from 'typed.js'
import './User.css';

const WelcomeUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const el = useRef(null);
    const typed = useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                user.displayName
            ],
            typeSpeed: 100,
            backSpeed: 80,
            backDelay: 1500,
            loop: true
        };

        typed.current = new Typed(el.current, options);

        return () => {
            typed.current.destroy();
        }
    })

    return (
        <div className="text-wrapper">
            <h1 className="headtext__major">Welcome back,</h1>
            <h1 className="headtext__major"><span className="multiText" ref={el}></span></h1>
        </div>
    )
}

export default WelcomeUser;