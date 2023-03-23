import React from "react";
import "./about.css";

function About() {
 
 
  return(

        <div className ="container">
          <div className = "article">
            <div className ="title">
              <h1> About Us</h1>
            </div>
            <div className ="content">
              <h3>
                 It is an art web app
              </h3>
              <br/>
              <br/>
             <p> The art show ap is developed to make sharing of art easy </p>
            </div>
            <br/>
            <br/>
            <div className= "comment">
              <p> Leave a comment</p>
              <form className=" comment-form">
                 <input type="text" placeholder="Name"/>
                 <input type="email" placeholder="Email"/>
                 <input type="text" placeholder="Website"/>
                 <textarea rows="10" placeholder="Write you comment"></textarea>
                 <button type="submit">Post comment</button>

              </form>     
            </div>

          </div>

        </div>

  );
    

}
export default About;
