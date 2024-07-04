import React from "react";
import '../Styles/NavBar.css'


export const Footer = () => {

  return (
    <div className="bg-cyan-800 p-4 text-center fixed bottom-0 left-0 w-full flex flex-row">
      <div className="m-auto">
        <img src="../Images/github-mark-white.png" className="w-9 m-auto hover:cursor-pointer" onClick={() => window.location.href = "https://github.com/maxethan2/React-Synth"}></img>
        <h4 className="m-auto text-white hover:underline hover:cursor-pointer" onClick={() => window.location.href = "https://github.com/maxethan2/React-Synth"}>Check out the project repo here!</h4>
      </div>
      
    </div>
  )
}