import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AudioPlayer from 'E:/Project Docs/web-dev-projects-main/web-dev-projects-main/personal-portfolio/src/AudioPlayer.js';
import AudioPlayer2 from 'E:/Project Docs/web-dev-projects-main/web-dev-projects-main/personal-portfolio/src/AudioPlayer2.js';
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = ({ onFileSelected }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [file, setFile] = useState();
  const [message, setMessage] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [originalSound, setOriginalSound] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
  const [summarizedSound, setSummarizedSound] = useState('');
  const [error, setError] = useState('');
  // const audioSource = 'D:/textSimpli/web-app/frontend/src/1.wav';

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', selectedFile);

    setFile(URL.createObjectURL(selectedFile));

    fetch('http://localhost:5000/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setOriginalText(data.original_text); 
          setOriginalSound(data.original_sound);// Set the extracted text to the message state
          setSummarizedText(data.summarized_text);
          setSummarizedSound(data.summary_sound);
          setError('');
        } else {
          setOriginalText('');
          setOriginalSound('');
          setSummarizedText('');
          setSummarizedSound('');
          setError('Error: ' + (data.error || 'Unknown error'));
        }
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
        setError('Error: Network error');
        setOriginalText('');
        setOriginalSound('');
        setSummarizedText('');
        setSummarizedSound('');
      });
  }


  return (
    <footer className="footer" id="footer">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="newsletter-bx wow slideInUp">
              <Row>
                <Col lg={12} md={6} xl={5}>
                  <h3>Provide your textual input<br />Or upload a file!</h3>
                </Col>
                <Col md={6} xl={7}>
                  <form>
                    <div className="new-email-bx">
                      <input type="file" onChange={handleChange} className="new-email-bx-button"  />
                    </div>
                  </form>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  {file && <h4><b><u>Selected Image:</u></b></h4>}
                  {file && <img src={file} alt="Selected" style={{ width: '300px' }} />}
                  </Col>
                  <Col size={50}>
                  {originalText && <h4><b><u>Extracted Text:</u></b></h4>}
                  {originalText && <h5>{originalText}</h5>}
                  {summarizedText && <h4><b><u>Summarized Text:</u></b></h4>}
                  {summarizedText && <h5>{summarizedText}</h5>}
                  </Col>
                  <Row>
                    <Col>
                    {summarizedSound && (
                    <div>
                    <h4><b><u>Summarized Sound:</u></b></h4>
                    <AudioPlayer>
                    {/* Include content for AudioPlayer component here */}
                    </AudioPlayer>
                    </div>
                    )}
                    </Col>
                    <Col>
                    {originalSound && (
                    <div>
                    <h4><b><u>Original Sound:</u></b></h4>
                    <AudioPlayer2>
                    {/* Include content for AudioPlayer component here */}
                    </AudioPlayer2>
                    </div>
                    )}
                    </Col>
                  </Row>
                </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
