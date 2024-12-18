import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Home from './components/Pages/Home.tsx';
import About from './components/Pages/About.tsx';
import Services from './components/File/Services.tsx';
import LogIn from './components/Pages/LogIn.tsx';
import SignUp from './components/Pages/SignUp.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
