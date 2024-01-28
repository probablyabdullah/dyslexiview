import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";
import React, { useEffect } from "react";


  export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code == 200) {
      setStatus({ succes: true, message: 'Message sent successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
    
              {
                <img className={"animate__animated animate__zoomIn"} src={contactImg} alt="Contact Us"/>
              }

          </Col>
          <Col size={12} md={6}>
            
              {
                <div className={"animate__animated animate__fadeIn"}>
                <h2>See your Output!</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} className="px-1">
                      <textarea rows="20" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
    
          </Col>
        </Row>
      </Container>
    </section>
  )
}

/*  export const Contact = () => {
      const [textBoxContent, setTextBoxContent] = useState("");

      useEffect(() => {
        // Make an HTTP request to your server
        fetch("https://example.com/api/text")
          .then((response) => response.text()) // Assuming the response is plain text
          .then((data) => setTextBoxContent(data)) // Update the state with the received data
          .catch((error) => console.error("Error:", error));
      }, []); // Empty dependency array ensures this effect runs only once on component mount

      return (
        <section className="contact" id="connect">
          <Container>
            {<textarea value={textBoxContent} rows={10} cols={30} readOnly />}
          </Container>
        </section>
      );
    }
*/
