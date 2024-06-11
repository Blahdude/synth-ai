import './Styles/App.css';
import {useEffect, useRef, useState} from 'react'
import { OscSelector } from './Components/OscSelector';
import { CircleSlider } from "react-circle-slider"
// import { KnobHeadless } from 'react-knob-headless';
import * as Tone from "tone";
import { KeyBoard } from './Components/KeyBoard';
import { Sequencer } from './Components/Sequencer';
import { Envelope } from './Components/Evnvelope';
import runMidi from './Midi';

function App() {

  // hooks
  const [osc1Wave, setOsc1Wave] = useState("sine")
  const [osc2Wave, setOsc2Wave] = useState("sine")
  const [volume , setVolume] = useState({volume1: -12, volume2: -12})
  const [filterValue, setFilterValue] = useState(1500)
  const [lfoRate, setLfoRate] = useState(0)

  // envelope NIGHTMARE NEED TO FIX THIS IS TEMPORARILY UGLY AND HORRIBLE!!!!!
  const [ampEnvState, setAmpEnvState] = useState({attack: 2, decay: 0.2, sustain: 0.5, release: 0.1})
  
  let ampEnvv = new Tone.Envelope({attack: 2, decay: 0.2, sustain: 0.5, release: 0.1})
  const [ampEnv, setAmpEnv] = useState(ampEnvv)

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
  const filter = new Tone.Filter(filterValue, "lowpass")
  // filter with connected lfo
  const autoFilter = new Tone.AutoFilter(`${lfoRate}n`).start()

  const gainNode = new Tone.Gain().toDestination()
  ampEnv.connect(gainNode.gain)

  // connect volume for indavidual oscilators 
  const osc1Volume = new Tone.Volume(volume.volume1)
  const osc2Volume = new Tone.Volume(volume.volume2)
  
  synth.chain(filter, autoFilter, osc1Volume, gainNode)
  synth2.chain(filter, autoFilter, osc2Volume, gainNode)

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

  const handleFilterChange = (event) => {
    setFilterValue(event)
  }

  const handleLfoChange = (event) => {
    setLfoRate(event)
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

  // Init Midi once
  useEffect(() => {
    runMidi()
  }, [])
  // listent for noteon event from midi.js
  window.addEventListener('noteon', (event) => {
    const { command, note, velocity, noteName } = event.detail;
    // console.log(`Note On: ${noteName} (Note: ${note}, Velocity: ${velocity})`);

    ampEnv.triggerAttack()
    synth.triggerAttack(noteName)
    synth2.triggerAttack(noteName)
  });
  // listen for noteoff event from midi.js
  window.addEventListener('noteoff', (event) => {
    const { command, note, velocity, noteName } = event.detail;
    // console.log(`Note Off: ${noteName} (Note: ${note}, Velocity: ${velocity})`);
    
    ampEnv.triggerRelease()
    synth.triggerRelease(noteName)
    synth2.triggerRelease(noteName)
  });

  return (
    <div className="App">
      <div className='textured-background rounded-xl pb-3'>

      {/* SYNTH BODY */}
      <fieldset className='synth-body '> 
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
            <CircleSlider max={30} min={-50} showTooltip={true} value={volume.volume1} onChange={(value) => changeVolume("volume1", value)} size={100} knobRadius={6} circleWidth={8} progressWidth={8} tooltipColor={"black"} progressColor={"#d13459"}/>
            <h3 className='m-auto'>Osc 1</h3>
            {/* volume 2 */}
            <CircleSlider max={30} min={-50} showTooltip={true} value={volume.volume2} onChange={(value) => changeVolume("volume2", value)} size={100} knobRadius={6} circleWidth={8} progressWidth={8} tooltipColor={"black"} progressColor={"#d13459"}/>
            <h3 className='m-auto'>Osc 2</h3>
          </fieldset>

          {/* Filter  and LFO */}
          <div className='ml-3'>
            {/* Filter module */}
            <fieldset className='synth-module flex'>
              <legend>Filter</legend>
              <div className='m-auto'>
                <CircleSlider value={filterValue} onChange={handleFilterChange} min={100} max={4000} showTooltip={true} stepSize={10} size={100} knobRadius={6} circleWidth={8} progressWidth={8} progressColor={"#302a2c"} tooltipColor={"black"}/>
              </div>
            </fieldset>

            {/* LFO module */}
            <fieldset className='synth-module flex'>
              <legend>LFO</legend>
              <div className='m-auto'>
                <CircleSlider value={lfoRate} onChange={handleLfoChange} min={0} max={20} showTooltip={true} stepSize={1} size={100} knobRadius={6} circleWidth={8} progressWidth={8} progressColor={"#4073db"} tooltipColor={"black"}/>
              </div>
            </fieldset>
          </div>

          {/* AMP ENVELOPE AND LFO MODULES */}
          <div className='ml-3'>
            {/* envelope does not have a fieldset surrounding it since its already created in the Envelope component. this is incase there is another filter envelope made */}
            <Envelope attack={ampEnvState.attack} decay={ampEnvState.decay} sustain={ampEnvState.sustain} release={ampEnvState.release} handleAmpEnvChange={handleAmpEnvChange}/>
            {/* <Envelope attack={ampEnvState.attack} decay={ampEnvState.decay} sustain={ampEnvState.sustain} release={ampEnvState.release} handleAmpEnvChange={handleAmpEnvChange}/> */}


          {/* end Amp envelope and lfo div */}
          </div>


        {/* end osc and volume div */}
        </div>

        <Sequencer ledState={ledState} handleRecClick={handleRecClick} handlePlayClick={handlePlayClick}/>

        {/* KEYBOARD */}
        <KeyBoard handleClick={handleClick} handleRelease={handleRelease} />
      </fieldset>

      {/* end synth texture background div */}
      </div>


      <div className='flex flex-wrap'>
        <img src={"../Images/buh.gif"} className='cat-gif'></img>
        <img src={"../Images/buhhh.gif"} className='cat-gif'></img>
        <img src={"../Images/funny-cat.gif"} className='cat-gif'></img>
        <img src={"../Images/buh_upside_down.gif"} className='cat-gif'></img>
        <img src={"../Images/catwaa.gif"} className='cat-gif'></img>
        <img src={"../Images/crazycat.gif"} className='cat-gif'></img>
        <img src={"../Images/buh2.gif"} className='cat-gif'></img>
        <img src={"../Images/plink.gif"} className='cat-gif'></img>
        <img src={"../Images/screamingcat.gif"} className='cat-gif'></img>
        <img src={"../Images/happycat.gif"} className='cat-gif'></img>
        <img src={"../Images/cat explode.gif"} className='cat-gif'></img>
        <img src={"../Images/huhcat.gif"} className='cat-gif'></img>
        <img src={"../Images/cateating.gif"} className='cat-gif'></img>
        <img src={"../Images/catBOOM.gif"} className='cat-gif'></img>
      </div>
    </div>
  );
}

export default App;
