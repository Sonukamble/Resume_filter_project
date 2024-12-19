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

  return (
    <UserInformationProvider>

      <Navbar />
      <Router basename="/Resume_filter_project">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </Router>
    </UserInformationProvider>
  )
}

export default App
