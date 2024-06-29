// TEMPORARY UNTIL I CAN STORE A REAL BACKEND 

export const presetsBank = {
  preset_1: {
    osc1: {
      wave: "sawtooth", detune: 0, volume: -10
    },
    osc2: {
      wave: "sawtooth", detune: 20, volume: -10
    },
    ampEnvState: {
      attack: 1, decay: 1, sustain: 1, release: 3
    },
    filterValue: 3500,
    lfoRate: 0
  },

  preset_2: {
    osc1: {
      wave: "sawtooth", detune: 0, volume: -10
    },
    osc2: {
      wave: "square", detune: 14, volume: -10
    },
    ampEnvState: {
      attack: 2, decay: 2, sustain: 1, release: 10
    },
    filterValue: 500,
    lfoRate: 10
  },

  preset_3: {
    osc1: {
      wave: "sine", detune: 0, volume: -10
    },
    osc2: {
      wave: "square", detune: 14, volume: -10
    },
    ampEnvState: {
      attack: 3, decay: 3, sustain: 1, release: 10
    },
    filterValue: 500,
    lfoRate: 15
  },

  preset_4: {
    osc1: {
      wave: "sine", detune: 0, volume: -10
    },
    osc2: {
      wave: "sine", detune: 1, volume: -10
    },
    ampEnvState: {
      attack: 10, decay: 3, sustain: 0.4, release: 10
    },
    filterValue: 4000,
    lfoRate: 2
  },

  preset_5: {
    osc1: {
      wave: "sawtooth", detune: -10, volume: -10
    },
    osc2: {
      wave: "square", detune: 15, volume: -10
    },
    ampEnvState: {
      attack: 0.1, decay: 1.5, sustain: 0.2, release: 3
    },
    filterValue: 2000,
    lfoRate: 5
  }
}