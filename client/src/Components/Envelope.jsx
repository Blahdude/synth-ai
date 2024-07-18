import React from "react";
import { CircleSlider } from "react-circle-slider"

export const Envelope = (props) => {

  return (
    <fieldset className="synth-module flex">
      <legend className='font-semibold'>Amp Envelope</legend>
      <div className="flex flex-col">
        <CircleSlider min={0.1} max={15} showTooltip={true} value={props.attack} onChange={(value) => props.handleAmpEnvChange("attack", value)} stepSize={0.5} size={100} knobRadius={6} circleWidth={8} progressWidth={8} progressColor={"#8a0da3"} tooltipColor={"black"}/>
        <h3 className='m-auto'>Attack</h3>
      </div>
      
      <div className="flex flex-col">
        <CircleSlider min={0.1} max={15} showTooltip={true} value={props.decay} onChange={(value) => props.handleAmpEnvChange("decay", value)} stepSize={0.5} size={100} knobRadius={6} circleWidth={8} progressWidth={8} progressColor={"#8a0da3"} tooltipColor={"black"}/>
        <h3 className='m-auto'>Decay</h3>
      </div>
      
      <div className="flex flex-col">
        <CircleSlider min={0} max={1} showTooltip={true} value={props.sustain} onChange={(value) => props.handleAmpEnvChange("sustain", value)} stepSize={0.10} size={100} knobRadius={6} circleWidth={8} progressWidth={8} progressColor={"#8a0da3"} tooltipColor={"black"}/>
        <h3 className='m-auto'>Sustain</h3>
      </div>

      <div className="flex flex-col">
        <CircleSlider min={0.1} max={15} showTooltip={true} value={props.release} onChange={(value) => props.handleAmpEnvChange("release", value)} stepSize={0.5} size={100} knobRadius={6} circleWidth={8} progressWidth={8} progressColor={"#8a0da3"} tooltipColor={"black"}/>
        <h3 className='m-auto'>Release</h3>
      </div>
    </fieldset>
  )
}