import React from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
function ContactUs() {
  return (
    <Container className="contact">
      <Row className="mb-5 mt-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">Contact Us</h1>
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5" className="mb-5">
          <h3> Get in touch</h3>
          <address>
            <strong>Email : artShow@gmail.com.com</strong>
            <br />
            <br />
            <p>
              <strong>Phone : +1 xxx xxx xxxx</strong>
            </p>
          </address>
        </Col>
        <Col lg="7">
          <form className="contact__form">
            <Row>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  required
                />
              </Col>
              <Col lg="6">
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
              <Col lg="12" className="form-group">
                <button className="btn ac_btn" type="submit">
                  Send
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
export default ContactUs;
