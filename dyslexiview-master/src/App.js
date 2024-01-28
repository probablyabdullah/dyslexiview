import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Input } from "./components/Input";
import { Footer2 } from "./components/Footer2";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Footer />
      <Footer2 />
    </div>
  );
}

export default App;
