import React from "react";
import '../Styles/NavBar.css'

export const NavBar = () => {


  return (
    <div className='bg-cyan-800 flex flex-row justify-between w-full z-50 absolute rounded-b-sm'>
      <div className="flex">
        <img src="../Images/synthesizer-icon.ico" className='size-20 p-3'></img>
        <h1 className="text">Home</h1>
      </div>

      <h1 className="text mr-4">About</h1>
    </div>
  )
}