import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState } from 'react';
import Alert from './components/Alert';
// import About from './components/About';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#151616';
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  }

  return (
    <>
      {/* <BrowserRouter> */}
      <Navbar title='TxtConverter' aboutText='About' mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className='container'>
        <TextForm showAlert={showAlert} title='Enter the text below:' mode={mode} />
        {/* <Routes>
            <Route exact path="/" element={<TextForm showAlert={showAlert} title='Enter the text below:' mode={mode} />} />
            <Route exact path="/about" element={<About />} />
          </Routes> */}
      </div>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
