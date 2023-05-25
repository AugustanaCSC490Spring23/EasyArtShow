import React from "react";

import { Link } from "react-router-dom";
import "./about.css";
function About() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to='./mainpage.js'>Home</Link></li>
            <li><Link to= "./ContactUs.js">Contact Us</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="intro">
          <h1>About Us</h1>
          <p>We are a team of four who have a passion for the arts. 
            Our goal is to create a platform where artists can showcase their work and 
            connect with art enthusiasts from all around the world.</p>
        </section>
        <section className="mission-vision-values">
          <h2>Mission and Vision</h2>
          <div className="mvv-section">
            {/* <h3>Mission</h3> */}
            <p>Our mission is to empower artists by providing them with a platform 
              to showcase their work and connect with art enthusiasts worldwide.</p>
           {/* </div>
           <div className="mvv-section"> */}
            {/* <h3>Vision</h3> */}
            <p>Our vision is to become the go-to platform for discovering and 
              promoting emerging artists from around the world.</p>
          </div>
          <div className="mvv-section">
            <h3>Values</h3>
            <ul>
              <li>Passion for the arts</li>
              <li>Creativity and innovation</li>
              <li>Diversity and inclusivity</li>
              <li>Collaboration and community</li>
            </ul>
          </div>
        </section>
      </main>
      <footer>
        <nav>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </nav>
        <p>&copy; 2023 Art Showcase. All rights reserved.</p>
      </footer>
    </div>
  );

 
 
  // return(

  //       <div className ="container">
  //         <div className = "article">
  //           <div className ="title">
  //             <h1> About Us</h1>
  //           </div>
  //           <div className ="content">
  //             <h3>
  //                It is an art web app
  //             </h3>
  //             <br/>
  //             <br/>
  //            <p> The art show ap is developed to make sharing of art easy </p>
  //           </div>
  //           <br/>
  //           <br/>
  //           <div className= "comment">
  //             <p> Leave a comment</p>
  //             <form className=" comment-form">
  //                <input type="text" placeholder="Name"/>
  //                <input type="email" placeholder="Email"/>
  //                <input type="text" placeholder="Website"/>
  //                <textarea rows="10" placeholder="Write you comment"></textarea>
  //                <button type="submit">Post comment</button>

  //             </form>     
  //           </div>

  //         </div>

  //       </div>

  // );
    

}
export default About;
