import React from "react";
import { useState } from "react";

export const OscSelector = (props) => {


  return (
    <fieldset className="border-solid border-2 w-48 border-black rounded-lg bg-gray-300 px-3 py-2 drop-shadow-2xl mr-3">
      <legend className="font-semibold">Osc {props.oscNum}</legend>
      <div className="flex flex-col">
        <input 
          type="radio" // sets to radio type button
          id="sawtooth" // id of sawtooth so i can connect htmlFor
          name="wave" // name so i can select value
          value="sawtooth" // value to change the state
          onChange={props.handleClick}
          className="hidden peer" // hides button and sets it as a peer
          checked={props.oscWave === "sawtooth"} // check to see if the value is currently checked 
        ></input>
        <label 
          htmlFor="sawtooth" 
          className={`${props.oscWave === 'sawtooth' ? 'bg-red-700' : 'bg-red-500'} px-4 rounded-md text-white transition-all text-center mb-1 cursor-pointer`}>
          Sawtooth 〽️
        </label>
        <br />

        <input 
          type="radio"
          id="sine"
          name="wave"
          value="sine"
          onChange={props.handleClick}
          checked={props.oscWave === "sine"}
          className="hidden peer"
        ></input>
        <label 
          htmlFor="sine" 
          className={`${props.oscWave === 'sine' ? 'bg-red-700' : 'bg-red-500'} px-4 rounded-md text-white transition-all text-center mb-1 cursor-pointer`}>
          Sine ∿
        </label>
        <br />
        {/*  〰️ ∿ */}

        <input 
          type="radio"
          id="square"
          name="wave"
          value="square"
          onChange={props.handleClick}
          checked={props.oscWave === "square"}
          className="hidden peer"
        ></input>
        <label 
          htmlFor="square" 
          className={`${props.oscWave === 'square' ? 'bg-red-700' : 'bg-red-500'} px-4 rounded-md text-white transition-all text-center mb-1 cursor-pointer`}>
          Square _⊓_
        </label>
        <br />
      </div>
    </fieldset>
  )
}