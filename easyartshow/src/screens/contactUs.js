import React from "react";
//import "./style.css";
import Contact from './screens/Contact';
 import { Route} from "react-router-dom";
import ValidateForm from "./ValidateForm";
function ContactUs() {
  // const nameInput = document.getElementById("name");
  // const email = document.getElementById("email");
  // const message = document.getElementById("message");
  // const success = document.getElementById("success");
  // const errorNodes = document.querySelectorAll(".error");

  // function validateForm() {
  //   clearMessages();
    
  //   let error = false;
  //   if (nameInput.value.length < 1) {
  //     errorNodes[0].innerText = "Write your name";
  //     nameInput.classList.add("error-border");
  //     error = true;
  //   }
  //   if (!emailIsValid(email.value)) {
  //     errorNodes[1].innerText = "Invalid Email";
  //     email.classList.add("error-border");
  //     error = true;
  //   }
  //   if (message.value.length < 1) {
  //     errorNodes[2].innerText = "Please enter message";
  //     message.classList.add("error-border");
  //     error = true;

  //   }
  //   if (!error) {
  //     success.innerText = "Success";
  //   }
    
  // }

  // function clearMessages() {
  //   for (let i = 0; i < errorNodes.length; i++) {
  //     errorNodes[i].innerText = "";
  //   }
  //   success.innerText = " ";
  //   nameInput.classList.remove("error-border");
  //   email.classList.remove("error-border");
  //   message.classList.remove("error-border");
  // }
  // function emailIsValid() {
  //   let pattern = /\S+@\S+\.\S+/;
  //   return pattern.test(email);
  // }
  //  const handleSubmit=(event)=>{
    
  //   event.preventDefault();
  //   validateForm();
  
  // }
  return (

    <div id="overlay">

      <form onSubmit={event=>event.preventDefault()&& ValidateForm()}>

        <h1> Contact US</h1>

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Your name" />
        <small className="error"></small>

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" placeholder="Your email" />
        <small className="error"></small>

        <label htmlFor="message">Message:</label>
        <textarea id="message" placeholder="Your message" rows="6"></textarea>
        <small className="error"></small>

        <div className="center">
          <input type="submit" value="Send Message" />
          <p id="success"></p>
        </div>
      </form>
      <script src={ValidateForm.js}></script>
    </div>

  );
}
export default ContactUs;



