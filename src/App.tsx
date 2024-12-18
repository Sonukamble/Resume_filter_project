import UserInformationProvider from "./store/Login-context";
import Services from "./components/File/Services";
import Navbar from "./components/Navbar/Navbar"
import LogIn from "./components/Pages/LogIn";
import SignUp from "./components/Pages/SignUp";
import './css/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Define the router
// const router = createBrowserRouter(
//   [
//     {
//       path: "/Resume_filter_project",
//       element: <App />, // Use App as the root element
//       children: [
//         { path: "", element: <Home /> }, // Default route
//         { path: "about", element: <About /> },
//         { path: "services", element: <Services /> },
//         { path: "login", element: <LogIn /> },
//         { path: "signup", element: <SignUp /> },
//       ],
//     },
//   ],
//   {
//     basename: "/Resume_filter_project", // Set the base name for deployment on subdirectory
//   }
// );

function App() {
  // const FastAPI = process.env.REACT_APP_API_URL;

  return (
    <UserInformationProvider>

      <Navbar />
      {/* <RouterProvider router={router} /> */}
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
