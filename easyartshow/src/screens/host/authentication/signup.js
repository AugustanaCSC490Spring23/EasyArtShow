import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import app from '../../../backend/firebase';

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  const auth = getAuth(app);
  const register= ()=>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
    alert("Successfully created account");
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
   
    alert(errorCode);
   });


  }
 
    return (
      <div className="auth-form-container">
        Sign up
        <form className = "signupForm" >
        {/* <form className = "signupForm" onSubmit={handleSubmit}></form> */}
          {/* <label htmlFor="name"> Full name</label> */}
          {/* <input value = {name} name = "name" id = "name" placeholder="Full Name" /> */}
          <label htmlFor= "email">email</label>
          {/* <input value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id ="email" name ="email" /> */}
          { <input type="email" onChange={(e) => setEmail(e.target.value)}  placeholder="youremail@gmail.com"/> }
          <label htmlFor= "password">password</label>
          {/* <input value = {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******" id ="password" name ="password" /> */}
          { <input type="password" onChange={(e) => setPassword(e.target.value)}  placeholder="******"  /> }
          <button onClick={register} > Submit</button>    
        </form>
        <button onClick={() => navigate("/login")}> Login</button>
      </div>
     
    );
}
 
 
export default SignUp;
