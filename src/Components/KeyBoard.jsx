import React from "react";
import '../Styles/KeyBoard.css'

export const KeyBoard = (props) => {
  return (
    <div className='keyboard-container'>
      {/* 3RD OCTAVE */}
      <button className='white-key' value="C3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>C3</button>

      <button className="black-key" value="Db3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "38px"}}>Db3</button>

      <button className='white-key' value="D3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>D3</button>

      <button className="black-key" value="Eb3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "93px"}}>Eb3</button>

      <button className='white-key' value="E3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>E3</button>

      <button className='white-key' value="F3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>F4</button>

      <button className="black-key" value="Gb3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "200px"}}>Gb3</button>

      <button className='white-key' value="G3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>G3</button>

      <button className="black-key" value="Ab3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "253px"}}>Ab3</button>

      <button className='white-key' value="A3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>A3</button>

      <button className="black-key" value="Bb3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "307px"}}>Bb3</button>

      <button className='white-key' value="B3" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>B3</button>


      {/* 4TH OCTAVE  (added 375.2 to all black keys) */}
      <button className='white-key' value="C4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>C4</button>

      <button className="black-key" value="Db4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "412.2px"}}>Db4</button>

      <button className='white-key' value="D4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>D4</button>

      <button className="black-key" value="Eb4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "466.2px"}}>Eb4</button>

      <button className='white-key' value="E4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>E4</button>

      <button className='white-key' value="F4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>F4</button>

      <button className="black-key" value="Gb4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "574.2px"}}>Gb4</button>

      <button className='white-key' value="G4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>G4</button>

      <button className="black-key" value="Ab4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "627.2px"}}>Ab4</button>

      <button className='white-key' value="A4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>A4</button>

      <button className="black-key" value="Bb4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "681.2px"}}>Bb4</button>

      <button className='white-key' value="B4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>B4</button>


    </div>
  )
}