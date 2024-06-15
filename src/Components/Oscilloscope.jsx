import React from "react";
import { useRef, useEffect } from "react";
import * as Tone from "tone";


export const Oscilliscope = (props) => {
  const canvasRef = useRef(null)
  // const canvas = useRef(null)
  let c;
  let pixelRatio, sizeOnScreen

  useEffect(() => {
    const canvas = canvasRef.current
    const c = canvas.getContext("2d")
    pixelRatio = window.devicePixelRatio;
    sizeOnScreen = canvas.getBoundingClientRect();
    canvas.width = 400;
    canvas.height = 300;
    pixelRatio = window.devicePixelRatio;
    sizeOnScreen = canvas.getBoundingClientRect();
    canvas.width = sizeOnScreen.width * pixelRatio;
    canvas.height = sizeOnScreen.height * pixelRatio;
    canvas.style.width = canvas.width / pixelRatio + "px";
    canvas.style.height = canvas.height / pixelRatio + "px";

    c.fillStyle = "#181818";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.strokeStyle = "#33ee55";
    c.beginPath();
    c.moveTo(0, canvas.height / 2);
    c.lineTo(canvas.width, canvas.height / 2);
    c.stroke();
  }, [])

  
  const draw = () => {

    const canvas = canvasRef.current;
    const c = canvas.getContext("2d")
    const segmentWidth = canvas.width / (2*2048)
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.moveTo(-100, canvas.height / 2);


    for (let i = 1; i < (2048 * 2); i += 1) {
      let x = i * segmentWidth;
      let v = props.analyzer[i] / 128.0;
      let y = (v * canvas.height) / 2;
      c.lineTo(x, y);
    }
    c.lineTo(canvas.width + 100, canvas.height / 2);
    c.stroke();
    requestAnimationFrame(draw);
  }


  return (
    <div>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <button onClick={draw}>hello</button>
    </div>
  )
}