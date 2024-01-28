import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/banner3.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';

const scrollToFooter = () => {
  const footer = document.getElementById('footer');
  footer.scrollIntoView({ behavior: 'smooth' });
};

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(400); // Set a fixed delta value for stable animation
  const toRotate = ["Reading Problems!", "Understanding Problems!"];

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(100); // Adjust delta for faster deletion
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(100); // Adjust delta for faster deletion
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(400); // Set delta back to original value
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <div className="animate__animated animate__fadeIn">
              <span className="tagline">Reading. Made Easy.</span>
              <h1>
                {`We're here to solve your `}
                <span
                  className="txt-rotate"
                  dataPeriod="50"
                  data-rotate='[ "Reading Problems!", "Understanding Problems" ]'
                >
                  <span className="wrap">{text}</span>
                </span>
              </h1>
              <p>
                An end-to-end solution for one & all with learning difficulties
                related to reading. We help you read easier & understand better.
                And we also provide alternative solutions to reading, such as
                Text-to-Speech (TTS). We're a team from PES University, EC
                Campus, and we're here for you!
              </p>
              <button onClick={() => scrollToFooter()}>
          Discover More <ArrowRightCircle size={25} />
        </button>
            </div>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <div className="animate__animated animate__zoomIn">
              <img src={headerImg} alt="Header Img" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
