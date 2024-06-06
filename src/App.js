import logo from './logo.svg';
import './Styles/App.css';
import {useEffect, useRef, useState} from 'react'
import { OscSelector } from './Components/OscSelector';
import { CircleSlider } from "react-circle-slider"
// import { KnobHeadless } from 'react-knob-headless';
import * as Tone from "tone";
import { KeyBoard } from './Components/KeyBoard';
import { Sequencer } from './Components/Sequencer';
import { Envelope } from './Components/Evnvelope';
import { Sequence } from 'tone';

function App() {

  // hooks
  const [osc1Wave, setOsc1Wave] = useState("sine")
  const [osc2Wave, setOsc2Wave] = useState("sine")
  const [volume , setVolume] = useState({volume1: -12, volume2: -12})

  // envelope NIGHTMARE NEED TO FIX THIS IS TEMPORARILY UGLY AND HORRIBLE!!!!!
  const [ampEnvState, setAmpEnvState] = useState({attack: 2, decay: 0.2, sustain: 0.5, release: 0.1})
  
  let ampEnvv = new Tone.Envelope({attack: 2, decay: 0.2, sustain: 0.5, release: 0.1})
  const [ampEnv, setAmpEnv] = useState(ampEnvv)
  // const [ampEnv, setAmpEnv] = useState(new Tone.Envelope({
  //   attack: ampEnvState.attack,
  //   decay: ampEnvState.decay,
  //   sustain: ampEnvState.sustain,
  //   release: ampEnvState.release
  // }))

  console.log(ampEnv.attack)

  // useEffect(() => {
  //   ampEnv = new Tone.Envelope({attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.1})
  //   console.log('ran')
  // }, [ampEnvState])
  // sequence hooks
  const [ledState, setLedState] = useState("led led-red")
  const [sequenceRecording, setSequenceRecording] = useState(false)
  const [sequence , setSequence] = useState([])

  // oscillator 1
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: osc1Wave,
    }
  })
  // // oscillator 2
  const synth2 = new Tone.PolySynth(Tone.Synth ,{
    oscillator: {
      type: osc2Wave
    }
  })

  // const ampEnv = new Tone.Envelope({
  //   attack: 1,
  //   decay: 1,
  //   sustain: 1,
  //   release: 1
  // })

  const gainNode = new Tone.Gain().toDestination()
  ampEnv.connect(gainNode.gain)

  // connect volume for indavidual oscilators 
  const osc1Volume = new Tone.Volume(volume.volume1)
  const osc2Volume = new Tone.Volume(volume.volume2)
  
  synth.chain(osc1Volume, gainNode)
  synth2.chain(osc2Volume, gainNode)

  // handling click and release of the keyboard 
  const handleClick = (event) => {
    if (sequenceRecording) {
      setSequence(prevSequence => ([...prevSequence, event.target.value]));
    }
    else {
      ampEnv.triggerAttack()
      synth.triggerAttack(event.target.value)
      synth2.triggerAttack(event.target.value)
    }
  }
  const handleRelease = (event) => {
    ampEnv.triggerRelease()
    synth.triggerRelease(event.target.value)
    synth2.triggerRelease(event.target.value)
  }

  //  
  const changeVolume = (name, value) => {
    setVolume(prevVolume => (
      {
        ...prevVolume,
        [name]: value
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
    ampEnv.triggerAttack()
  }

  const handleAmpEnvChange = (name, value)  => {
    setAmpEnvState(prevAmpEvnState => (
      {
        ...prevAmpEvnState,
        [name]: value
      }
    ))
    // After AmpEnvState is Changed update the AmpEnv to the new values
    setAmpEnv(new Tone.Envelope({attack: ampEnvState.attack, decay: ampEnvState.decay, sustain: ampEnvState.sustain, release: ampEnvState.release}))
  }

  console.log(ampEnvState)

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
          <fieldset className='synth-module justify-items-center grid'>
            <legend className='font-semibold'>Volume</legend>
            {/* volume 1 */}
            <CircleSlider max={30} min={-50} showTooltip={true} value={volume.volume1} onChange={(value) => changeVolume("volume1", value)} size={100} knobRadius={11} circleWidth={3} progressWidth={5}/>
            {/* volume 2 */}
            <CircleSlider max={30} min={-50} showTooltip={true} value={volume.volume2} onChange={(value) => changeVolume("volume2", value)} size={100} knobRadius={11} circleWidth={3} progressWidth={5}/>
          </fieldset>

          {/* AMP ENVELOPE MODULE */}
          <div>
            <Envelope attack={ampEnvState.attack} decay={ampEnvState.decay} sustain={ampEnvState.sustain} release={ampEnvState.release} handleAmpEnvChange={handleAmpEnvChange}/>
            {/* <Envelope attack={ampEnvState.attack} decay={ampEnvState.decay} sustain={ampEnvState.sustain} release={ampEnvState.release} handleAmpEnvChange={handleAmpEnvChange}/> */}
          </div>


        {/* end osc and volume */}
        </div>

                  
          {/* create emoty space ??? */}
          <div className='px-72'>
            buh
          </div>

        <Sequencer ledState={ledState} handleRecClick={handleRecClick} handlePlayClick={handlePlayClick}/>

        {/* KEYBOARD */}
        <KeyBoard handleClick={handleClick} handleRelease={handleRelease} />
      </fieldset>
      {/* <CircleSlider min={0.1} max={15} showTooltip={true} value={ampEnvState.attack} onChange={(value) => handleAmpEnvChange("attack", value)} stepSize={0.5}/> */}
      <div className='flex flex-wrap'>
        <img src={"../Images/buh.gif"} className='opacity-0 hover:opacity-100 transition-all duration-1000'></img>
        <img src={"../Images/buhhh.gif"} className='opacity-0 hover:opacity-100 transition-all duration-1000'></img>
        {/* <img src={"../Images/cat.gif"}></img> */}
        <img src={"../Images/funny-cat.gif"} className='opacity-0 hover:opacity-100 transition-all duration-1000'></img>
        <img src={"../Images/buh_upside_down.gif"} className='opacity-0 hover:opacity-100 transition-all duration-1000'></img>
        <img src={"../Images/catwaa.gif"} className='opacity-0 hover:opacity-100 transition-all duration-1000'></img>
        <img src={"../Images/crazycat.gif"} className='opacity-0 hover:opacity-100 transition-all duration-1000'></img>
        <img src={"../Images/buh2.gif"} className='opacity-0 hover:opacity-100 transition-all duration-1000'></img>
      </div>
    </div>
  );
}

export default App;
