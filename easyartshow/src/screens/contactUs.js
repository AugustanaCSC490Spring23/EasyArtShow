import "./contact";
import emailjs from "@emailjs/browser";
import { reload } from "@firebase/auth";
import { useState} from "react";
import React, { useRef } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const form = useRef();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "user_name") {
      setName(value);
    } else if (name === "user_email") {
      setEmail(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || message === "") {
      setSubmitStatus("Please provide name, email, and message.");
      return;
    }

    emailjs
      .sendForm(
        "service_occqw05",
        "template_78t35zq",
        form.current,
        "ipPar3JPCaGQGW8t_"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setName("");
          setEmail("");
          setMessage("");
          setSubmitStatus("Thank you for your message!");
          reload();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="body">
      <header>
          <nav>
          <ul>
            <li><Link to='./mainpage.js'>Home</Link></li>
          </ul>
        </nav>
        </header>
      <div className="contact-container">
        <div class="title">
          <h1>Contact Us</h1>
          <p>
            Have a question, suggestion, or just want to get in touch with us?
            We'd love to hear from you!
          </p>
          <p>Thank you for reaching out to us!</p>
        </div>

        <div class="left-side">
          <div class="address details">
        
            
            <FaMapMarkerAlt className="iconMap"  size={35}/>
          
            <div class="topic" >Address</div>
            <div class="text-one">Rock Island, IL</div>
            <div class="text-two">US</div>
          </div>
          <br></br>
          <div class="phone details">
           
            <FaPhoneAlt className="iconPhone"  size={35}/>
            <div class="topic">Phone</div>
            <div class="text-one">+1(309)-9893-5647</div>
          </div>
          <br></br>
          <div class="email details">
          
            <FaEnvelope className="iconEmail"  size={35}/>
            <div class="topic">Email</div>
            <div class="text-one">easyartshow01@gmail.com</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="right-side">
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              name="user_name"
              className={name === "" && submitStatus ? "invalid" : ""}
            />
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              name="user_email"
              className={email === "" && submitStatus ? "invalid" : ""}
            />
            <label>Message</label>
            <textarea
              value={message}
              onChange={handleInputChange}
              // type="message"
              name="message"
              className={message === "" && submitStatus ? "invalid" : ""}
            />
            <p className="validation-msg">{submitStatus}</p>
            <input
              type="submit"
              value={submitStatus  === "Thank you for your message!" ? "Sent" : "Send"}
              className={submitStatus ? "success" : ""}
              style={{
                backgroundColor:
                  submitStatus === "Thank you for your message!" ? "green" : "",
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
export default ContactUs;
