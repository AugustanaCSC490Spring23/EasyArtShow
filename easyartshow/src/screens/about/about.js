import React from "react";

import { Link } from "react-router-dom";
import "./about.css";

function About() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/ContactUs">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="intro">
          <h1>About Us</h1>
          <p>
            We are a team of four who have a passion for the arts. Our goal is
            to create a platform where artists can showcase their work and
            connect with art enthusiasts from all around the world.
          </p>
        </section>
        <section className="mission-vision-values">
          <div className="mv-section">
            <h2>Mission and Vision</h2>
            <p>
              Our mission is to empower artists by providing them with a
              platform to showcase their work and connect with art enthusiasts
              worldwide.
            </p>
            <p>
              Our vision is to become the go-to platform for discovering and
              promoting emerging artists from around the world.
            </p>
          </div>
          <div className="v-section">
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
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </nav>
        <p>&copy; 2023 Art Showcase. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default About;
