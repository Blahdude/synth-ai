import React from "react";
import '../Styles/NavBar.css'
import { Link } from "react-router-dom";

export const NavBar = () => {


  return (
    <div className='bg-cyan-800 flex flex-row justify-between w-full z-50 absolute rounded-b-lg border-b-2 border-indigo-300 border-double'>
      <div className="flex">
        <img src="../Images/synthesizer-icon.ico" className='size-20 p-3'></img>
        {/* <h1 className="text">Home</h1> */}
        <Link to='/home' className="text">Home</Link>
      </div>

      {/* <h1 className="text mr-4" onClick={() => alert("tj is so cringe")}>About</h1> */}
      <Link to='/about' className="text mr-4 p-3">About</Link>
    </div>
  )
}