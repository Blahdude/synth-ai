import React from "react";

export const KeyBoard = (props) => {
  return (
    <div className='keyboard-container'>
      <button className='white-key' value="C4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>C4</button>

      <button className="black-key" value="Db4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "38px"}}>Db4</button>

      <button className='white-key' value="D4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>D4</button>

      <button className="black-key" value="Eb4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "94px"}}>Eb4</button>

      <button className='white-key' value="E4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>E4</button>

      <button className='white-key' value="F4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>F4</button>

      <button className="black-key" value="Gb4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "200px"}}>Gb4</button>

      <button className='white-key' value="G4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>G4</button>

      <button className="black-key" value="Ab4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "255px"}}>Ab4</button>

      <button className='white-key' value="A4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>A4</button>

      <button className="black-key" value="Bb4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease} style={{left: "310px"}}>Bb4</button>

      <button className='white-key' value="B4" onMouseDown={props.handleClick} onMouseUp={props.handleRelease}>B4</button>


    </div>
  )
}