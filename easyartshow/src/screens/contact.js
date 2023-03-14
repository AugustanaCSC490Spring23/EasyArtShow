import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import { Container, Row, Col } from "react-bootstrap";
import { contactConfig } from './contentt'

function Contact() {
    return (
      <div>
        <Navbar/>
        Contact
        <Container>
     
      <Row >
        <Col lg="8">
          <h1 >Contact Me</h1>
          <hr  />
        </Col>
      </Row>
      <Row >
        <Col lg="5" >
          <h3 >Get in touch</h3>
          <address>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
              {contactConfig.YOUR_EMAIL}
            </a>
            <br />gb
            <br />
            {contactConfig.hasOwnProperty("YOUR_FONE") ? (
              <p>
                <strong>Phone:</strong> {contactConfig.YOUR_FONE}
              </p>
            ) : (
              ""
            )}
          </address>
          <p>{contactConfig.description}</p>
        </Col>
        <Col lg="7" >
          <form  >
            <Row>
              <Col lg="6" >
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name" 
                  type="text"
                  required 
                />
              </Col>
              <Col lg="6" >
                <input
                  className="form-control rounded-0"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email" 
                  required 
                />
              </Col>
            </Row>
            <textarea
              className="form-control rounded-0"
              id="message"
              name="message"
              placeholder="Message"
              rows="5" 
              required
            ></textarea>
            <br />
            <Row>
              <Col lg="12" >
                <button type="submit"> 
                Send
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
      </div>
      
    );
  }
  
export default Contact;