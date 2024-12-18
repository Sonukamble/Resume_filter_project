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
      <Router>
        <Routes>
          <Route path="/Resume_filter_project/" element={<Home />} />
          <Route path="/Resume_filter_project/about" element={<About />} />
          <Route path="/Resume_filter_project/services" element={<Services />} />
          <Route path="/Resume_filter_project/login" element={<LogIn />} />
          <Route path="/Resume_filter_project/signup" element={<SignUp />} />

        </Routes>
      </Router>
    </UserInformationProvider>
  )
}

export default App
