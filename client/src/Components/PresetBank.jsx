import React from "react";
import '../Styles/PresetBank.css'

export const PresetBank = (props) => {

  return (
    <div>
    <h1 className='bank-title'>Preset Bank</h1>
    <div className="flex flex-row mt-3">
      
      <input
        type='radio'
        id='bank1'
        name='preset-bank1'
        value={1}
        onChange={props.handleClick}
        className="hidden peer" // hides button and sets it as a peer
        checked={props.preset === "1"}
      >
      </input>
      <label 
        htmlFor={`bank1`} 
        className={`${props.preset === '1' ? 'bg-red-400' : 'bg-gray-400'} button`}>
      </label>

      <input
        type='radio'
        id='bank2'
        name='preset-bank1'
        value={2}
        onChange={props.handleClick}
        className="hidden peer" // hides button and sets it as a peer
        checked={props.preset === "2"}
      >
      </input>
      <label 
        htmlFor={`bank2`} 
        className={`${props.preset === '2' ? 'bg-red-400' : 'bg-gray-400'} button`}>
      </label>

      <input
        type='radio'
        id='bank3'
        name='preset-bank3'
        value={3}
        onChange={props.handleClick}
        className="hidden peer" // hides button and sets it as a peer
        checked={props.preset === "3"}
      >
      </input>
      <label 
        htmlFor={`bank3`} 
        className={`${props.preset === '3' ? 'bg-red-400' : 'bg-gray-400'} button`}>
      </label>

      <input
        type='radio'
        id='bank4'
        name='preset-bank4'
        value={4}
        onChange={props.handleClick}
        className="hidden peer" // hides button and sets it as a peer
        checked={props.preset === "4"}
      >
      </input>
      <label 
        htmlFor={`bank4`} 
        className={`${props.preset === '4' ? 'bg-red-400' : 'bg-gray-400'} button`}>
      </label>

      <input
        type='radio'
        id='bank5'
        name='preset-bank5'
        value={5}
        onChange={props.handleClick}
        className="hidden peer" // hides button and sets it as a peer
        checked={props.preset === "5"}
      >
      </input>
      <label 
        htmlFor={`bank5`} 
        className={`${props.preset === '5' ? 'bg-red-400' : 'bg-gray-400'} button`}>
      </label>

      <input
        type='radio'
        id='bank6'
        name='preset-bank6'
        value={6}
        onChange={props.handleClick}
        className="hidden peer" // hides button and sets it as a peer
        checked={props.preset === "6"}
      >
      </input>
      <label 
        htmlFor={`bank6`} 
        className={`${props.preset === '6' ? 'bg-red-400' : 'bg-gray-400'} button`}>
      </label>

      <input
        type='radio'
        id='bank7'
        name='preset-bank7'
        value={7}
        onChange={props.handleClick}
        className="hidden peer" // hides button and sets it as a peer
        checked={props.preset === "7"}
      >
      </input>
      <label 
        htmlFor={`bank7`} 
        className={`${props.preset === '7' ? 'bg-red-400' : 'bg-gray-400'} button`}>
      </label>

      <input
        type='radio'
        id='bank8'
        name='preset-bank8'
        value={8}
        onChange={props.handleClick}
        className="hidden peer" // hides button and sets it as a peer
        checked={props.preset === "8"}
      >
      </input>
      <label 
        htmlFor={`bank8`} 
        className={`${props.preset === '8' ? 'bg-red-400' : 'bg-gray-400'} button`}>
      </label>

      <input
        type='radio'
        id='bank9'
        name='preset-bank9'
        value={9}
        onChange={props.handleClick}
        className="hidden peer" // hides button and sets it as a peer
        checked={props.preset === "9"}
      >
      </input>
      <label 
        htmlFor={`bank9`} 
        className={`${props.preset === '9' ? 'bg-red-400' : 'bg-gray-400'} button`}>
      </label>

      <div className="preset-lcd">
        <h1>{props.preset}</h1>
      </div>

            
    </div>
    </div>  
  )

}