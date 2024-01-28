import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.png";

export const Footer2 = () => {
  return (
    <footer className="footer2">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
          <img src={logo} alt="Logo" style={{ width: '30%', height: 'auto' }} />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end" style={{ paddingTop: '20px' }}>
            <p>Dyslexiview. A team from PES University, EC Campus.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}