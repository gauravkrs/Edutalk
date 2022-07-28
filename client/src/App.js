
import Main from './Main'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
function App() {
  const params = useLocation()
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    if (params.pathname == "/auth") {
      setVisible(false)
    } else setVisible(true)
  }, [params])
  return (
    <div className="App">
      <Navbar />
      <Main />
      {visible && <Footer />}
    </div>
  );
}

export default App;
