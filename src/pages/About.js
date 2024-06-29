import React from "react";
import { NavBar } from "../Components/NavBar";
import '../Styles/About.css'

// https://app.haikei.app/
// super cool svg dividers

export const About = () => {

  return (
    <div className="flex flex-col bg-cyan-700">
      <NavBar />
      <h1 className='py-20 m-auto text-gray-200 text-6xl'>About</h1>
      <img src='../Images/current_synth_photo.png' className='w-2/3 mx-auto'></img>

      <h1 className="paragraph-text mt-7 ml-10 mr-36">This App is a web based Synth created using Tone.js and React. It uses two Tone PolySynths acting as indavidual oscillators whith three wave types to choose from. Next the two oscillators can be adjusted in the Mixer section to change the precise tuning of an oscillator and its indavidual volume. There is then a lowpass filter and and low frequency oscillator (LFO) thats oscillates the cutoff of the filter. Then comes and Amp evnvelope which full ADSR controll. (The envelope is connected at the end of the chain after the filter and volume nodes so this Amp envelope doesn't act like a real Amp envelope but is close enough for this project) There is then a small preset bank that can hold nine presets that can be stored and overwritten.** A tiny sequencer to record sequences and then play them back. And a hold function that will hold the notes that you play until you release the hold button. Lastly there is an on screen keyboard that you can play with the click of your mouse. but there is also usb Midi support! (Currently the Midi is a work in progress but is still useable to have some fun messing around.) All this together makes for a fun little project that you can use to make some really cool Synth sounds!</h1>

      <div className="spacer layer1"></div>

      <div className="bg-pink-600 flex flex-col">
        <h1 className='py-20 m-auto text-gray-200 text-6xl'>Inspiration</h1>

        {/* <img src="./Images/personal-synth-photo-nb.png"></img> */}
        <img src="./Images/personal-synth-photo.jpg" className='rounded-full w-2/3 m-auto border-solid border-2 border-slate-400'></img>

        <h1 className="paragraph-text mt-7 ml-10 mr-36">change the precise tuning of an oscillator and its indavidual volume. There is then a lowpass filter and and low frequency oscillator (LFO) thats oscillates the cutoff of the filter. Then comes and Amp evnvelope which full ADSR controll. (The envelope is connected at the end of the chain after the filter and volume nodes so this Amp envelope doesn't act like a real Amp envelope but is close enough for this project) There is then a small preset bank that can hchange the precise tuning of an oscillator and its indavidual volume. There is then a lowpass filter and and low frequency oscillator (LFO) thats oscillates the cutoff of the filter. Then comes and Amp evnvelope which full ADSR controll. (The envelope is connected at the end of the chain after the filter and volume nodes so this Amp envelope doesn't act like a real Amp envelope but is close enough for this project) There is then a small preset bank that can h</h1>


      </div>

      <div className="flex flex-col bg-violet-500">
        <div className="spacer layer2"></div>
        <h1 className="py-20 m-auto text-gray-200 text-6xl">In Depth Look</h1>
      </div>

    </div>
    
  )
}