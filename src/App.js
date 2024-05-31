import logo from './logo.svg';
import './Styles/App.css';
import {useEffect, useRef, useState} from 'react'
import { OscSelector } from './Components/OscSelector';
import { CircleSlider } from "react-circle-slider"
import * as Tone from "tone";
import { KeyBoard } from './Components/KeyBoard';
import { Sequencer } from './Components/Sequencer';
import { Sequence } from 'tone';

function App() {

  // hooks
  const [oscWave, setOscWave] = useState("sine")
  const [volume , setVolume] = useState(-12)
  // sequence hooks
  const [ledState, setLedState] = useState("led led-red")
  const [sequenceRecording, setSequenceRecording] = useState(false)
  const [sequence , setSequence] = useState([])

  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: oscWave,
    }
  })

  const masterVolume = new Tone.Volume(volume).toDestination()
  synth.connect(masterVolume)

  const handleClick = (event) => {
    if (sequenceRecording) {
      setSequence(prevSequence => ([...prevSequence, event.target.value]));
    }
    else {
      synth.triggerAttack(event.target.value)
    }
  }
  
  const handleRelease = (event) => {
    synth.triggerRelease(event.target.value)
  }

  const changeVolume = (event) => {
    setVolume(event)
  }

  const changeWave = (event) => {
    setOscWave(event.target.value)
  }

  // handle click of record sequence button 
  // change sequenceRecording false/true
  // if the reccoring button was untoggled then now toggled, reset the sequence
  const handleRecClick = () => {
    // if turing rec on set init sequence to empty array
    if (sequenceRecording == false) {
      setSequence([])
    }
    // change led on or off
    setLedState(prevLedState => prevLedState === "led led-red" ? "led led-red-on" : "led led-red")
    // change true/false hook
    setSequenceRecording(prevSequenceRecording => !prevSequenceRecording)
  }

  const handlePlayClick = () => {
    const seq = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, 0.1, time);
      // subdivisions are given as subarrays
    }, sequence).start(0);
    Tone.Transport.start();
  }


  return (
    <div className="App">
      {/* SYNTH BODY */}
      <fieldset className='synth-body'> 
        <legend className='legend-title'>Super Swag Synth</legend>

        {/* container of osc and volume */}
        <div className='flex'>
          <OscSelector oscNum={1} handleClick={changeWave} oscWave={oscWave}/>

          {/* VOLUME MODULE */}
          <fieldset className='synth-module'>
            <legend className='font-semibold'>Volume</legend>
            <CircleSlider max={30} min={-50} showTooltip={true} value={volume} onChange={changeVolume} size={100} knobRadius={11} circleWidth={3} progressWidth={5}/>
          </fieldset>

        {/* end osc and volume */}
        </div>

                  
          {/* create emoty space ??? */}
          <div className='px-72'>
            empty space!
          </div>

        <Sequencer ledState={ledState} handleRecClick={handleRecClick} handlePlayClick={handlePlayClick}/>

        {/* KEYBOARD */}
        <KeyBoard handleClick={handleClick} handleRelease={handleRelease}/>
      </fieldset>
    </div>
  );
}

export default App;
