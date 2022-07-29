import React from 'react'
import Countdown from "react-countdown";
const Completionist = ({ setPage }) => {
    setPage("phone");
};
function Timer({ setPage }) {
    return (
      <div>
        <Countdown style={{ color:"royalblue"}} date={Date.now() + 30000}>
          <Completionist setPage={setPage} />
        </Countdown>
      </div>
    );
  };

export default Timer