'use client';
import { useState } from 'react';
import { superdough, samples, initAudioOnFirstClick, registerSynthSounds } from 'superdough';

const init = Promise.all([
  initAudioOnFirstClick(),
  samples('github:tidalcycles/dirt-samples'),
  registerSynthSounds(),
]);

export default function SuperdoughSynth() {
  const [initialized, setInitialized] = useState(false);

  const firstInit = async () => {
    if (initialized) return;
    await init;
    setInitialized(true);
  };

  const play = async () => {
    await init;
    let t = 0.1;
    while (t < 16) {
      loop(t++);
    }
  };

  const loop = (t = 0) => {
    // superdough(value, time, duration)
    superdough({ s: 'bd', delay: 0.5 }, t);
    superdough({ note: 'g1', s: 'sawtooth', cutoff: 600, resonance: 8 }, t, 0.125);
    superdough({ note: 'g2', s: 'sawtooth', cutoff: 600, resonance: 8 }, t + 0.25, 0.125);
    superdough({ s: 'hh' }, t + 0.25);
    superdough({ s: 'sd', room: 0.5 }, t + 0.5);
    superdough({ s: 'hh' }, t + 0.75);
  };

  const stop = () => {
    // superdough.stop() will stop all sounds immediately
    superdough({ d1: 'silence' }, 0);
  };

  return (
    <div>
      {initialized ? (
        <>
          <button id="play" onClick={play}>
            play
          </button>
          <button id="stop" onClick={stop}>
            stop
          </button>
        </>
      ) : (
        <button id="init" onClick={firstInit}>
          init
        </button>
      )}
    </div>
  );
}
