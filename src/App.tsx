import { HashRouter, Routes, Route, BrowserRouter } from 'react-router-dom';
import UserInformationProvider from "./store/Login-context";
import Navbar from "./components/Navbar/Navbar";
import LogIn from "./components/Pages/LogIn";
import SignUp from "./components/Pages/SignUp";
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import Services from "./components/File/Services";
import './css/App.css';

function App() {
  const isProduction = window.location.hostname !== 'localhost'; // Or use another method to check

  return (
    <UserInformationProvider>
      <Navbar />
      {isProduction ? (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </HashRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      )}
    </UserInformationProvider>
  );
}

export default App;
