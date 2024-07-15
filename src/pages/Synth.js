import '../Styles/App.css';
import * as Tone from "tone";
import {useEffect, useRef, useState} from 'react'
import { OscSelector } from '../Components/OscSelector';
import { CircleSlider } from "react-circle-slider"
import { KeyBoard } from '../Components/KeyBoard';
import { Sequencer } from '../Components/Sequencer';
import { Envelope } from '../Components/Evnvelope';
import { PresetBank } from '../Components/PresetBank';
import { NavBar } from '../Components/NavBar';
import { presetsBank } from '../TempPresetStorage';
import ChatBox from '../Components/ChatBox';
import runMidi from '../Midi';


export const Synth = () => {

  // hooks
  // const [osc, setOsc] = useState({osc1: {wave: "sawtooth", detune: 0, volume: -12}, osc2: {wave: "sawtooth", detune: 0, volume: -12}})
  const [osc1, setOsc1] = useState({wave: "sawtooth", detune: 0, volume: -10})
  const [osc2, setOsc2] = useState({wave: "sawtooth", detune: 0, volume: -10})
  const [filterValue, setFilterValue] = useState(1500)
  const [lfoRate, setLfoRate] = useState(0)

  const [holdState, setHoldState] = useState(false)
  const heldNotesArray = useRef([])

  // envelope NIGHTMARE NEED TO FIX THIS IS TEMPORARILY UGLY AND HORRIBLE!!!!!
  const [ampEnvState, setAmpEnvState] = useState({attack: 0.1, decay: 1, sustain: 1, release: 0.1})

  // handle change for osc1 and osc2 state varables
  const handleOscChange = (osc, type, value) => {
    if (osc == "osc1"){
      setOsc1(prevOsc => ({
        ...prevOsc,
        [type]: value
      }))
    }
    else{
      setOsc2(prevOsc => ({
        ...prevOsc,
        [type]: value
      }))
    }
  }

  const handleUserInput = (input) => {
    const params = input.split(';').reduce((acc, param) => {
      const [key, value] = param.split(':').map(s => s.trim());
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});
  
    if (params.wave1) {
      setOsc1(prevOsc => ({
        ...prevOsc,
        wave: params.wave1
      }));
    }
  
    if (params.detune1) {
      setOsc1(prevOsc => ({
        ...prevOsc,
        detune: parseFloat(params.detune1)
      }));
    }
  
    if (params.volume1) {
      setOsc1(prevOsc => ({
        ...prevOsc,
        volume: parseFloat(params.volume1)
      }));
    }
  
    if (params.wave2) {
      setOsc2(prevOsc => ({
        ...prevOsc,
        wave: params.wave2
      }));
    }
  
    if (params.detune2) {
      setOsc2(prevOsc => ({
        ...prevOsc,
        detune: parseFloat(params.detune2)
      }));
    }
  
    if (params.volume2) {
      setOsc2(prevOsc => ({
        ...prevOsc,
        volume: parseFloat(params.volume2)
      }));
    }
  
    if (params.filter) {
      setFilterValue(parseFloat(params.filter));
    }
  
    if (params.lfo) {
      setLfoRate(parseFloat(params.lfo));
    }
  
    if (params.attack) {
      setAmpEnvState(prevState => ({
        ...prevState,
        attack: parseFloat(params.attack)
      }));
    }
  
    if (params.decay) {
      setAmpEnvState(prevState => ({
        ...prevState,
        decay: parseFloat(params.decay)
      }));
    }
  
    if (params.sustain) {
      setAmpEnvState(prevState => ({
        ...prevState,
        sustain: parseFloat(params.sustain)
      }));
    }
  
    if (params.release) {
      setAmpEnvState(prevState => ({
        ...prevState,
        release: parseFloat(params.release)
      }));
    }
  
    console.log(params);
  };
  
  // Add this function where you have other hooks and functions in the Synth component
  
  let ampEnvv = new Tone.Envelope({attack: 0.1, decay: 1, sustain: 1, release: 0.1})
  const [ampEnv, setAmpEnv] = useState(ampEnvv)

  // sequence hooks
  const [ledState, setLedState] = useState("led led-red")
  const [sequenceRecording, setSequenceRecording] = useState(false)
  const [sequence , setSequence] = useState([])

  const [preset, setPreset] = useState(0)

  // oscillator 1
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: osc1.wave,
      detune: osc1.detune
    }
  })
  // // oscillator 2
  const synth2 = new Tone.PolySynth(Tone.Synth ,{
    oscillator: {
      type: osc2.wave,
      detune: osc2.detune
    }
  })

  const filter = new Tone.Filter(filterValue, "lowpass")
  // filter with connected lfo
  const autoFilter = new Tone.AutoFilter(`${lfoRate}n`).start()

  const gainNode = new Tone.Gain().toDestination()
  ampEnv.connect(gainNode.gain)

  // connect volume for indavidual oscilators 
  const osc1Volume = new Tone.Volume(osc1.volume)
  const osc2Volume = new Tone.Volume(osc2.volume)
  
  synth.chain(filter, autoFilter, osc1Volume, gainNode)
  synth2.chain(filter, autoFilter, osc2Volume, gainNode)

  const analyzer = new Tone.Analyser('fft', 2048)
  gainNode.connect(analyzer)




  // keep track of how many notes are playing for envelope release
  var notesCurrentlyPlaying = useRef(0)
  // handling click and release of the keyboard 
  const handlePlayNote = (event) => {
    if (sequenceRecording) {
      setSequence(prevSequence => ([...prevSequence, event]));
    }
    else {
      ampEnv.triggerAttack()
      synth.triggerAttack(event)
      synth2.triggerAttack(event)

      notesCurrentlyPlaying += 1
    }
  }
  
  const handleReleaseNote = (event) => {
    // iff hold state is off release if not dont release notes
    if (!holdState){
      synth.triggerRelease(event)
      synth2.triggerRelease(event)

      notesCurrentlyPlaying  -= 1
      
      // if there are no notes left playing then trigger the release
      if (notesCurrentlyPlaying <= 0) {
        ampEnv.triggerRelease()
      }
    }
    else {
      // push the held note to the array so it can be released when the hold button is toggled again
      heldNotesArray.current.push(event)
    }
  }
  
  const handleHoldStateChange = () => {
    // if hold is currently false which means you are now turning hold on
    // set hold to true and do nothing else.
    // notes wont be released in the handleReleaseNote function

    // else hold state is on and you are enow turning it off
    // set hold state to false. and then run handleRelease again and it should release the note
    if (!holdState) {
      setHoldState(true)
    }
    else{
      setHoldState(false)
      handleReleaseNotesHeld(heldNotesArray.current)
    }
  }

  // release all notes that are contained in the heldNotes Array then empty it once they are released
  const handleReleaseNotesHeld = (notesArray) => {
    ampEnv.triggerRelease()
    notesArray.forEach(element => {
      synth.triggerRelease(element)
      synth2.triggerRelease(element)
    });
    heldNotesArray.current = []
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

  let seq;
  const handlePlayClick = () => {
    seq = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, 0.1, time);
      // subdivisions are given as subarrays
    }, sequence).start(0);
    Tone.Transport.start();
    ampEnv.triggerAttack()
  }

  const handleStopClick = () => {
    if (seq) {
      Tone.Transport.stop()
      seq.stop()
      seq.dispose()
      seq = null
    }
  }

  const handleAmpEnvChange = (name, value)  => {
    setAmpEnvState(prevAmpEvnState => (
      {
        ...prevAmpEvnState,
        [name]: value
      }
    ))
  }

  // Needed because of issue with preset bank
  // preset bank would lag and update one behind the current selected preset
  useEffect(() => {
    setAmpEnv(new Tone.Envelope({attack: ampEnvState.attack, decay: ampEnvState.decay, sustain: ampEnvState.sustain, release: ampEnvState.release}))
  }, [ampEnvState])

  // Init Midi once
  useEffect(() => {
    runMidi()

    // listent for noteon event from midi.js
    window.addEventListener('noteon', (event) => {
      const { command, note, velocity, noteName } = event.detail;
  
      handlePlayNote(noteName)
    });

    // listen for noteoff event from midi.js
    window.addEventListener('noteoff', (event) => {
      const { command, note, velocity, noteName } = event.detail;

      handleReleaseNote(noteName)
    });
  }, [])
  
  const selectPreset = (value) => {
    setPreset(value.target.value)

    const bankKey = `preset_${value.target.value}`
    const selectedPreset = presetsBank[bankKey]

    // if preset is not defined return to avoid runtime error
    if (selectedPreset === undefined){ return }

    setOsc1(selectedPreset.osc1)
    setOsc2(selectedPreset.osc2)

    setAmpEnvState(selectedPreset.ampEnvState)

    setFilterValue(selectedPreset.filterValue)
    setLfoRate(selectedPreset.lfoRate)
  }

  return (
    <div className="App bg-sky-700 flex">
      <NavBar />

      <div className='textured-background rounded-xl m-auto p-20 mt-40'>

      {/* SYNTH BODY */}
      <fieldset className='synth-body '> 
        <legend className='legend-title'>Super Swag Synth</legend>

        {/* container of osc mixer filter and lfo */}
        <div className='flex'>
          <div>
            <OscSelector oscNum={1} handleClick={(value) => handleOscChange("osc1", "wave", value.target.value)} oscWave={osc1.wave}/>
            <OscSelector oscNum={2} handleClick={(value) => handleOscChange("osc2", "wave", value.target.value)} oscWave={osc2.wave}/>
          </div>

          {/* Mixer MODULE */}
          <fieldset className='synth-module flex flex-row ml-3'>
            <legend className='font-semibold'>Mixer</legend>
            {/* detune div */}
            <div className='flex flex-col'>
              <CircleSlider max={400} min={-400} showTooltip={true} value={osc1.detune} onChange={(value) => handleOscChange("osc1", "detune", value)} size={100} knobRadius={6} circleWidth={8} progressWidth={8} tooltipColor={"black"} progressColor={"#d13459"}/>
              <h3 className='m-auto'>Detune 1</h3>
              {/* volume 2 */}
              <CircleSlider max={400} min={-400} showTooltip={true} value={osc2.detune} onChange={(value) => handleOscChange("osc2", "detune", value)} size={100} knobRadius={6} circleWidth={8} progressWidth={8} tooltipColor={"black"} progressColor={"#d13459"}/>
              <h3 className='m-auto'>Detune 2</h3>
            </div>

            <div className='flex flex-col'>
              {/* volume 1 */}
              <CircleSlider max={30} min={-50} showTooltip={true} value={osc1.volume} onChange={(value) => handleOscChange("osc1", "volume", value)} size={100} knobRadius={6} circleWidth={8} progressWidth={8} tooltipColor={"black"} progressColor={"#d13459"}/>
              <h3 className='m-auto'>Volume 1</h3>
              {/* volume 2 */}
              <CircleSlider max={30} min={-50} showTooltip={true} value={osc2.volume} onChange={(value) => handleOscChange("osc2", "volume", value)} size={100} knobRadius={6} circleWidth={8} progressWidth={8} tooltipColor={"black"} progressColor={"#d13459"}/>
              <h3 className='m-auto'>Volume 2</h3>
            </div>

          </fieldset>

          {/* Filter and LFO */}
          <div className='ml-3'>
            {/* Filter module */}
            <fieldset className='synth-module flex'>
              <legend>Filter</legend>
              <div className='m-auto'>
                <CircleSlider value={filterValue} onChange={handleFilterChange} min={100} max={4000} showTooltip={true} stepSize={10} size={100} knobRadius={6} circleWidth={8} progressWidth={8} progressColor={"#302a2c"} tooltipColor={"black"} showPercentage={false}/>
              </div>
            </fieldset>

            {/* LFO module */}
            <fieldset className='synth-module flex mt-1'>
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

            <PresetBank preset={preset} handleClick={(value) => selectPreset(value)}/>

            <div className='flex flex-row mb-3 mt-3 justify-between'>
              <Sequencer ledState={ledState} handleRecClick={handleRecClick} handlePlayClick={handlePlayClick} handleStopClick={handleStopClick}/>

              <button className={`${holdState ? 'bg-red-400' : 'bg-gray-400'} rounded-md px-3 border-solid border-black border-2 ml-16 transition-all duration-200 mr-24`} onClick={handleHoldStateChange}>HOLD</button>
            </div>         
          {/* end Amp envelope and lfo div */}
          </div>
        {/* end osc mixer filter and lfo div */}
        </div>

        {/* KEYBOARD */}
        <div className='flex mt-2'>
          <KeyBoard handleClick={(event) => handlePlayNote(event.target.value)} handleRelease={(event) => handleReleaseNote(event.target.value)} />
        </div>
      </fieldset>
      {/* end synth texture background div */}
      <ChatBox handleUserInput={handleUserInput}/>
      </div>
    </div>
  );
}
