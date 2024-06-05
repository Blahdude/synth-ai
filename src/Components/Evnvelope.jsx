import React from "react";
import { CircleSlider } from "react-circle-slider"

export const Envelope = (props) => {

  return (
    <fieldset className="synth-module flex">
      <legend>Envelope</legend>
      <CircleSlider />
      <CircleSlider />
      <CircleSlider />
      <CircleSlider />
    </fieldset>
  )
}