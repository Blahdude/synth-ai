import React from "react";
import { CircleSlider } from "react-circle-slider"
import '../Styles/App.css'
import { useState } from "react";

export const OscSelector = (props) => {


  return (
    <fieldset className="synth-module">
      <legend className="font-semibold">Osc {props.oscNum}</legend>
      <div className="flex flex-col">
        <input 
          type="radio" // sets to radio type button
          id={`sawtooth${props.oscNum}`} // unique id
          name={`wave${props.oscNum}`} // unique name
          value="sawtooth" // value to change the state
          onChange={props.handleClick}
          className="hidden peer" // hides button and sets it as a peer
          checked={props.oscWave === "sawtooth"} // check to see if the value is currently checked 
        ></input>
        <label 
          htmlFor={`sawtooth${props.oscNum}`} 
          className={`${props.oscWave === 'sawtooth' ? 'bg-red-700' : 'bg-red-500'} px-4 rounded-md text-white transition-all text-center mb-1 cursor-pointer ring-1 ring-black`}>
          Sawtooth 〽️
        </label>
        {/* <br />  */}
        {/* Why where there ever line breaks here? */}
        <input 
          type="radio"
          id={`sine${props.oscNum}`} // unique id
          name={`wave${props.oscNum}`} // unique name
          value="sine"
          onChange={props.handleClick}
          checked={props.oscWave === "sine"}
          className="hidden peer"
        ></input>
        <label 
          htmlFor={`sine${props.oscNum}`} 
          className={`${props.oscWave === 'sine' ? 'bg-red-700' : 'bg-red-500'} px-4 rounded-md text-white transition-all text-center mb-1 cursor-pointer ring-1 ring-black`}>
          Sine ∿
        </label>
        {/* <br /> */}
        {/*  〰️ ∿ */}

        <input 
          type="radio"
          id={`square${props.oscNum}`} // unique id
          name={`wave${props.oscNum}`} // unique name
          value="square"
          onChange={props.handleClick}
          checked={props.oscWave === "square"}
          className="hidden peer"
        ></input>
        <label 
          htmlFor={`square${props.oscNum}`} 
          className={`${props.oscWave === 'square' ? 'bg-red-700' : 'bg-red-500'} px-4 rounded-md text-white transition-all text-center mb-1 cursor-pointer ring-1 ring-black`}>
          Square _⊓_
        </label>
        {/* <br /> */}
      </div>
    </fieldset>
  )
}