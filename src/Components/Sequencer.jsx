import React from "react";
import { useState } from "react";

export const Sequencer = (props) => {
  const [ledState, setLedState] = useState("led led-red")
  
  const handleClick = () => { 
    setLedState(prevLedState => prevLedState === "led led-red" ? "led led-red-on" : "led led-red")

  }

  console.log(ledState)

  return (
    <div className="flex mb-1">
      <div className={ledState}>
      </div>
      <button onClick={handleClick}>Toggle Light</button>
    </div>
  )
}