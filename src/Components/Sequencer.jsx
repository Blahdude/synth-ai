import React from "react";
import { useState } from "react";
import '../Styles/Sequencer.css'

export const Sequencer = (props) => {
  // const [ledState, setLedState] = useState("led led-red")
  
  // const handleClick = () => { 
  //   setLedState(prevLedState => prevLedState === "led led-red" ? "led led-red-on" : "led led-red")
  // }

  return (
    <div className="flex mb-1">
      <div className={props.ledState}>
      </div>
      <button className='sequencer-button' onClick={props.handleRecClick}>Rec</button>
      <button className="sequencer-button" onClick={props.handlePlayClick}>Play</button>
      <button className="sequencer-button" onClick={props.handleStopClick}>Stop</button>
    </div>
  )
}