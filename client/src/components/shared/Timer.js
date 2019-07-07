import React, { useState, useEffect } from "react";

function Timer(props) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    function tick() {
      setDate(new Date());
    }

    let timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <small className="float-right dashboard-date">
      <span className="font-weight-bold text-crimson" id="time">{`${date.toDateString()} ${date.toLocaleTimeString()}`}</span>
    </small>
  )
}

export default Timer;