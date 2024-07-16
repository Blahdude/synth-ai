
let noteMap = new Map([ [36, "C3"], [37, "Db3"], [38, "D3"], [39, "Eb3"], [40, "E3"],
  [41, "F3"], [42, "Gb3"], [43, "G3"], [44, "Ab3"], [45, "A3"], [46, "Bb3"], [47, "B3"],
  [48, "C4"], [49, "Db4"], [50, "D4"], [51, "Eb4"], [52, "E4"], [53, "F4"], [54, "Gb4"], 
  [55, "G4"], [56, "Ab4"], [57, "A4"], [58, "Bb4"], [59, "B4"], [60, "C5"], [61, "Db5"], 
  [62, "D5"], [63, "Eb5"], [64, "E5"], [65, "F5"], [66, "Gb5"], [67, "G5"], [68, "Ab5"],
  [69, "A5"], [70, "Bb5"], [71, "B5"], [72, "C6"], [73, "Db6"], [74, "D6"], [75, "Eb6"],
  [76, "E6"], [77, "F6"], [78, "Gb6"], [79, "G6"], [80, "Ab6"], [81, "A6"], [82, "Bb6"],
  [83, "B6"], [84, "C7"], [85, "Db7"], [86, "D7"], [87, "Eb7"], [88, "E7"], [89, "F7"], 
  [90, "Gb7"], [91, "G7"], [92, "Ab7"], [93, "A7"], [94, "Bb7"], [95, "B7"], [96, "C8"]
]);

function success(midiAccess) {
  midiAccess.addEventListener('statechange', updateDevices);

  const inputs = midiAccess.inputs;

  inputs.forEach((input) => {
    // Remove any existing event listeners to prevent duplicates
    input.removeEventListener('midimessage', handleInput);
    // Add the event listener
    input.addEventListener('midimessage', handleInput);
  });
}

function handleInput(input) {
  const command = input.data[0] // 144 on 128 off
  const note = input.data[1]
  const velocity = input.data[2]

  const eventDetail = { command, note, velocity, noteName: noteMap.get(note) };

  if (command === 144){
    noteOn(eventDetail)
  }
  else {
    noteOff(eventDetail)
  }
}

function noteOn(detail) {
  const event = new CustomEvent('noteon', { detail });
  window.dispatchEvent(event);
}

function noteOff(detail){
  const event = new CustomEvent('noteoff', { detail });
  window.dispatchEvent(event);
}

function failure() {
  console.log("Could not connect MIDI")
}

function updateDevices(event) {
  // console.log(event)
}

export default function runMidi() {
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure)
  }
}
