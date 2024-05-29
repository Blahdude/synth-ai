import logo from './logo.svg';
import './App.css';
import {useEffect, useRef, useState} from 'react'
import { OscSelector } from './Components/OscSelector';
import { CircleSlider } from "react-circle-slider"
import * as Tone from "tone";
import { KeyBoard } from './Components/KeyBoard';

function App() {

  // hooks
  const [oscWave, setOscWave] = useState("sawtooth")
  const [volume , setVolume] = useState(-12)

  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: oscWave,
    }
  })

  const masterVolume = new Tone.Volume(volume).toDestination()
  synth.connect(masterVolume)

  const handleClick = (event) => {
    synth.triggerAttack(event.target.value)
  }
  
  const handleRelease = (event) => {
    // console.log(event.target.value)
    synth.triggerRelease(event.target.value)
  }

  const changeVolume = (event) => {
    setVolume(event)
  }

  const changeWave = (event) => {
    setOscWave(event.target.value)
  }

  return (
    <div className="App">
      <fieldset className='synth-body'> 
        {/* SYNTH BODY */}
        <legend className='legend-title'>Super Swag Synth</legend>
        <OscSelector oscNum={1} handleClick={changeWave} oscWave={oscWave}/>

        {/* VOLUME MODULE */}
        <fieldset className='synth-module'>
          <legend className='font-semibold'>Volume</legend>
          <CircleSlider max={30} min={-50} showTooltip={true} value={volume} onChange={changeVolume} size={100} knobRadius={11} circleWidth={3} progressWidth={5}/>
        </fieldset>

        {/* KEYBOARD */}
        <KeyBoard handleClick={handleClick} handleRelease={handleRelease}/>
      </fieldset>
    </div>
  );
}

export default App;
