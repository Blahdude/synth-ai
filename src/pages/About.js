import React from "react";
import { NavBar } from "../Components/NavBar";
import '../Styles/About.css'

// https://app.haikei.app/
// super cool svg dividers

export const About = () => {

  return (
    <div className="flex flex-col bg-cyan-700">
      <NavBar />
      <h1 className='pt-28 py-12 m-auto text-gray-200 text-6xl'>About</h1>
      <img src='../Images/current_synth_photo.png' className='w-1/2 mx-auto'></img>

      <h1 className="paragraph-text mr-36">This App aims to create a web-based synth created using Tone.js and React. It uses two Tone PolySynths acting as individual oscillators with three wave types to choose from. Next, the two oscillators can be adjusted in the Mixer section to change the precise tuning of an oscillator and its own individual volume. There is then a lowpass filter and and low frequency oscillator (LFO) that oscillates the cutoff of the filter. Then comes an Amp envelope which has full ADSR control. (The envelope is connected at the end of the chain after the filter and volume nodes so this Amp envelope doesn't act like a real Amp envelope but is close enough for this project) There is then a small preset bank that can hold nine presets a tiny sequencer to record sequences and then play them back, and a hold function that will hold the notes that you play until you release the hold button. Lastly, there is an on-screen keyboard that you can play with the click of your mouse. but there is also USB Midi support! (Currently, the Midi is a work in progress but is still useable to have some fun messing around.) All this together makes for a fun little project that you can use to make some really cool synth sounds!</h1>

      <div className="spacer layer1"></div>

      <div className="bg-pink-600 flex flex-col">
        <h1 className='py-20 m-auto text-gray-200 text-6xl -mt-16'>Inspiration</h1>

        <img src="./Images/personal-synth-photo.jpg" className='rounded-full w-2/3 m-auto border-solid border-2 border-slate-400'></img>

        <h2 className="paragraph-text mr-36">The inspiration to create this app comes from my own Korg Minilogue that I have at home. I was not able to get an internship for the summer so I decided to grow my programming skills by learning full stack development, and this is my first real step into that world. I decided that I wanted to create a web based synth so when I was deciding whether I wanted to get a synth or not I used some web synths just to get the general idea of what the instrument was and how it played. And I thought it would be really cool if I could create my own!</h2>


      </div>

      <div className="flex flex-col bg-sky-950">
        <div className="spacer layer2"></div>
        <h1 className="py-20 m-auto text-gray-200 text-6xl -mt-28">In Depth Look</h1>

        <div className="info-container">
          <img src="../Images/OscSelectors.png" className="w-72 h-full rounded-lg paragraph-text"></img>
          <h2 className="paragraph-text mr-36">This Synth has two oscillators where you can select between three wave types for each of the two oscillators. The three wave types provide different tones, and mixing and matching them with different filter and envelope settings allows for a world of customization.</h2>
        </div>

        <div className="spacer-2 layer3"></div>

        <div className="info-container">
          <img src="../Images/mixer-filter-lfo.png" className="rounded-lg paragraph-text h-full"></img>
          <h2 className="paragraph-text mr-36">This section of the synth sports three modules which each have their unique purpose. The most obvious being the Mixer section which allows you to detune each oscillator and change the volume of each oscillator individually. Next is the Filter. The filter in this synth is a low pass filter. This means that the filter progressively cuts off the low end of the frequency. The higher the value the more open the filter and the lower the value the more closed the filter becomes. Lastly is the LFO which stands for low frequency oscillator. This module oscillates the filter back and forth to give a feeling of movement in the sound that you create.
          </h2>
        </div>

        <div className="spacer-2 layer4"></div>

        <div className="info-container">
          <img src="../Images/amp-envelope.png" className="rounded-lg paragraph-text h-full"></img>
          <h2 className="paragraph-text mr-36">The Amp Envelope is how you add movement to the oscillators. Without the Amp Envelope your oscillators would be very stale as they would just turn on and off as you press the keys. The Envelope gives you from fast plucky sounds, to large swelling sounds. This is done with the four stage ADSR (Attack Decay Sustain Release) Attack determines how long it takes for your oscillators to reach max volume. The decay only activates after the Attack has finished and it determines how long it takes to get to your Sustain level. Sustain in simple terms determines how loud your oscillators will be. Finally is the Release which determines how long it takes for your oscillators to fade out when you release a key.
          </h2>
        </div>

        <div className="spacer-2 layer5"></div>

        <div className="info-container">
          <img src="../Images/preset-sequencer-hold.png" className="rounded-lg paragraph-text h-full"></img>
          <h2 className="paragraph-text mr-36">This final section sports a preset bank, a sequencer, and a hold function. The Preset Bank holds nine premade patches for you to explore with a tiny screen to display which preset you have active. Next is the Sequencer with a record button, a play button, and a stop button. Start recording the sequence by pressing the record button. You will know the sequence is recording when the light next to the recording button is active. You record your sequence by simply just playing keys on the keyboard. To play the sequence just press the play button and when you are done just press the stop button. Lastly is the hold button which when active holds the notes that you play until you press the hold button again.
          </h2>
        </div>


      </div>
      <div className='pt-32 bg-sky-950'></div>
    </div>
    
  )
}