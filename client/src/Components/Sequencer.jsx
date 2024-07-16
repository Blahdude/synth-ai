import React from "react";
import '../Styles/Sequencer.css'

export const Sequencer = (props) => {
  
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