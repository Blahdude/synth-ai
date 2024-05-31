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
  const [osc1Wave, setOsc1Wave] = useState("sine")
  const [osc2Wave, setOsc2Wave] = useState("sine")
  const [volume , setVolume] = useState({volume1: -12, volume2: -12})
  // sequence hooks
  const [ledState, setLedState] = useState("led led-red")
  const [sequenceRecording, setSequenceRecording] = useState(false)
  const [sequence , setSequence] = useState([])

  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: osc1Wave,
    }
  })

  const synth2 = new Tone.PolySynth(Tone.Synth ,{
    oscillator: {
      type: osc2Wave
    }
  })

  // connect volume for indavidual oscilators 
  const osc1Volume = new Tone.Volume(volume.volume1).toDestination()
  const osc2Volume = new Tone.Volume(volume.volume2).toDestination()
  synth.connect(osc1Volume)
  synth2.connect(osc2Volume)

  const handleClick = (event) => {
    if (sequenceRecording) {
      setSequence(prevSequence => ([...prevSequence, event.target.value]));
    }
    else {
      synth.triggerAttack(event.target.value)
      synth2.triggerAttack(event.target.value)
    }
  }
  
  const handleRelease = (event) => {
    synth.triggerRelease(event.target.value)
    synth2.triggerRelease(event.target.value)
  }

  // annoyingly need two of these since the circle slider has no id to distinguish the difference between multiple sliders
  const changeVolume1 = (event) => {
    setVolume(prevVolume =>(
      {
        ...prevVolume,
        volume1: event
      }
    ))
  }
  const changeVolume2 = (event) => {
    setVolume(prevVolume =>(
      {
        ...prevVolume,
        volume2: event
      }
    ))
  }

  // you should merge these into one function and keep the osc waves in one object in useState
  const changeOsc1Wave = (event) => {
    setOsc1Wave(event.target.value)
  }

  const changeOsc2Wave = (event) => {
    setOsc2Wave(event.target.value)
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
          <div>
            <OscSelector oscNum={1} handleClick={changeOsc1Wave} oscWave={osc1Wave}/>
            <OscSelector oscNum={2} handleClick={changeOsc2Wave} oscWave={osc2Wave}/>
          </div>

          {/* VOLUME MODULE */}
          <fieldset className='synth-module'>
            <legend className='font-semibold'>Volume</legend>
            {/* volume 1 */}
            <CircleSlider max={30} min={-50} showTooltip={true} value={volume.volume1} onChange={changeVolume1} size={100} knobRadius={11} circleWidth={3} progressWidth={5}/>
            {/* volume 2 */}
            <CircleSlider max={30} min={-50} showTooltip={true} value={volume.volume2} onChange={changeVolume2} size={100} knobRadius={11} circleWidth={3} progressWidth={5}/>
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
