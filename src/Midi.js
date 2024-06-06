
function success(midiAccess) {
  console.log(midiAccess)
}

function failure() {
  console.log("Could not connect MIDI")
}

export default function runMidi() {
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure)
  }
}
