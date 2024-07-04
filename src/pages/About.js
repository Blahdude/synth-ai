import React from "react";
import { NavBar } from "../Components/NavBar";
import '../Styles/About.css'
import { Footer } from "../Components/Footer";

// https://app.haikei.app/
// super cool svg dividers

export const About = () => {

  return (
    <div className="flex flex-col bg-cyan-700">
      <NavBar />
      <h1 className='py-20 m-auto text-gray-200 text-6xl'>About</h1>
      <img src='../Images/current_synth_photo.png' className='w-2/3 mx-auto'></img>

      <h1 className="paragraph-text mr-36">This App aims to create a web based synth created using Tone.js and React. It uses two Tone PolySynths acting as indavidual oscillators whith three wave types to choose from. Next the two oscillators can be adjusted in the Mixer section to change the precise tuning of an oscillator and its indavidual volume. There is then a lowpass filter and and low frequency oscillator (LFO) thats oscillates the cutoff of the filter. Then comes and Amp evnvelope which full ADSR controll. (The envelope is connected at the end of the chain after the filter and volume nodes so this Amp envelope doesn't act like a real Amp envelope but is close enough for this project) There is then a small preset bank that can hold nine presets that can be stored and overwritten.** A tiny sequencer to record sequences and then play them back. And a hold function that will hold the notes that you play until you release the hold button. Lastly there is an on screen keyboard that you can play with the click of your mouse. but there is also usb Midi support! (Currently the Midi is a work in progress but is still useable to have some fun messing around.) All this together makes for a fun little project that you can use to make some really cool Synth sounds!</h1>

      <div className="spacer layer1"></div>

      <div className="bg-pink-600 flex flex-col">
        <h1 className='py-20 m-auto text-gray-200 text-6xl -mt-16'>Inspiration</h1>

        {/* <img src="./Images/personal-synth-photo-nb.png"></img> */}
        <img src="./Images/personal-synth-photo.jpg" className='rounded-full w-2/3 m-auto border-solid border-2 border-slate-400'></img>

        <h2 className="paragraph-text mr-36">change the precise tuning of an oscillator and its indavidual volume. There is then a lowpass filter and and low frequency oscillator (LFO) thats oscillates the cutoff of the filter. Then comes and Amp evnvelope which full ADSR controll. (The envelope is connected at the end of the chain after the filter and volume nodes so this Amp envelope doesn't act like a real Amp envelope but is close enough for this project) There is then a small preset bank that can hchange the precise tuning of an oscillator and its indavidual volume. There is then a lowpass filter and and low frequency oscillator (LFO) thats oscillates the cutoff of the filter. Then comes and Amp evnvelope which full ADSR controll. (The envelope is connected at the end of the chain after the filter and volume nodes so this Amp envelope doesn't act like a real Amp envelope but is close enough for this project) There is then a small preset bank that can h</h2>


      </div>

      <div className="flex flex-col bg-sky-950">
        <div className="spacer layer2"></div>
        <h1 className="py-20 m-auto text-gray-200 text-6xl -mt-28">In Depth Look</h1>

        <div className="flex flex-row">
          <img src="../Images/OscSelectors.png" className="w-72 h-72 rounded-lg paragraph-text"></img>
          <h2 className="paragraph-text mr-36">This Synth has two oscillators where you can select between three wave types for each of the two oscillators. The three wave types provide different tones, and mixing and matching them with different filter and envelope settings allows for a world of customization.</h2>
        </div>

        <div className="spacer-2 layer3"></div>

        <div className="flex flex-row">
          <img src="../Images/mixer-filter-lfo.png" className="rounded-lg paragraph-text h-full"></img>
          <h2 className="paragraph-text mr-36">This section of the synth sports three modules which each have their unique purpose. The most obvious being the Mixer section which allows you to detune each oscillator and change the volume of each oscillator indavidually. Next is the Filter. The filter in this synth is a lowpass filter. This means that the filter progressively cuts off the low end of the frequency. The higher the value the more open the filter and the lower the value the more closed the filter becomes. Lastly is the LFO which stands for low frequency oscillator. This module oscillaties the filter back and forth to give a feeling of movement in the sound that you create.</h2>
        </div>

        <div className="spacer-2 layer4"></div>

        <div className="flex flex-row">
          <img src="../Images/amp-envelope.png" className="rounded-lg paragraph-text h-full"></img>
          <h2 className="paragraph-text mr-36">The Amp Envelope is how you add movement to the oscilators. Without the Amp Envelope your oscilators would be very stale as they would just turn on and off as you press the keys. The Envelope gives you from fast plucky sounds, to large swelling sounds. This is done with the four stage ADSR (Attack Decay Sustain Release) Attack determins how long it takes for your oscilators to reach max volume. The decay only activates after the Attack has finished and it determins how long it takes to get to your Sustain level. Sustain in simple terms determines how loud your oscillators will be. Finally is the Release which determines how long it takes for your oscillators to fade out when you release a key.
          </h2>
        </div>

        <div className="spacer-2 layer5"></div>

        <div className="flex flex-row">
          <img src="../Images/preset-sequencer-hold.png" className="rounded-lg paragraph-text h-full"></img>
          <h2 className="paragraph-text mr-36">This final section sports a preset bank, a sequencer, and a hold function. The Preset Bank holds nine premade patches for you to explore with a tiny screen to diplay which preset you have active. Next is the Sequencer with a record button, a play button, and a stop button. Start recording the sequnce by pressing the record button. You will know the sequence is recording when the light next to the recording button is active. You record your sequnce by simply just playing keys on the keyboard. To play the sequence just press the play button and when you are done just press the stop button. Lastly is the hold button which when active holds the notes that you play until you press the hold button again.</h2>
        </div>


      </div>
      <div className='pt-32 bg-sky-950'></div>
      <Footer />
    </div>
    
  )
}