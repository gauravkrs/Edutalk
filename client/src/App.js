import Main from "./Main";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Stripep } from "./components/Payment/Stripep";
function App() {
  const params = useLocation();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (params.pathname == "/" || params.pathname == "/payment" ) {
      setVisible(true);
    } else setVisible(false);
  }, [params]);
  return (
    <div className="App">
      <Navbar/> 
      <Main />
      {visible && <Footer />}
    </div>
  );
}

export default App;
