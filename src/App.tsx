import UserInformationProvider from "./store/Login-context";
import Services from "./components/File/Services";
import Navbar from "./components/Navbar/Navbar"
import LogIn from "./components/Pages/LogIn";
import SignUp from "./components/Pages/SignUp";
import './css/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";

function App() {
  // const FastAPI = process.env.REACT_APP_API_URL;

  return (
    <UserInformationProvider>

      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </Router>
      <!-- verify-admitad: "7a742f58bb" -->
    </UserInformationProvider>
  )
}

export default App
