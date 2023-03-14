 import React from 'react'
 import Navbar from '../components/Navbar/Navbar';
 import { useState } from "react";
 function About() {
  const [comment, setComment]=useState("");
  const onChangeHandler =(e)=>{
    setComment(e.target.value);
  };

     return (
       <div className='container'>
         <Navbar/>
         About
         <div>
         <h3>Comment</h3>
         <textarea
          value = {comment}
          onChange={onChangeHandler}
          className="input_box"
         
         />
         <button>submit</button>
         </div>         
       </div>
     );
   }
  
 export default About;