'use client';
import { useState, useEffect } from 'react';
import { repl, cat, stack } from '@strudel/core';
import {
  initAudioOnFirstClick,
  getAudioContext,
  webaudioOutput,
  samples,
  registerSynthSounds,
} from '@strudel/webaudio';
import { mini } from '@strudel/mini';

const pattern = mini('a [b c*2]');

const init = async () => {
  try {
    await initAudioOnFirstClick();
    await samples('github:tidalcycles/dirt-samples');
    await registerSynthSounds();
    const ctx = getAudioContext();
    const { scheduler } = repl({
      defaultOutput: webaudioOutput,
      getTime: () => ctx.currentTime,
    });
    return scheduler;
  } catch (err) {
    console.error('Strudel audio init failed:', err);
    return null;
  }
};

export default function StrudelMusic() {
  const [scheduler, setScheduler] = useState(null);

  useEffect(() => {
    // cleanup on unmount if we initialized
    return () => {
      try {
        scheduler.stop();
      } catch {}
      setScheduler(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function initialize() {
    if (scheduler) return;
    try {
      // ask the Strudel helper to prepare audio on user gesture
      const initScheduler = await init();
      if (!initScheduler) throw new Error('Failed to initialize scheduler');
      setScheduler(initScheduler);
    } catch {}
  }

  function start() {
    try {
      scheduler?.setPattern(
        cat(
          stack('g3', 'b3', 'e4'),
          stack('a3', 'c3', 'e4'),
          stack('b3', 'd3', 'fs4'),
          stack('b3', 'e4', 'g4')
        ).note()
      );
      scheduler?.start();
    } catch (err) {
      console.warn('start failed', err);
    }
  }

  function startAnotherOne() {
    try {
      scheduler?.setPattern(pattern.note());
      scheduler?.start();
    } catch (err) {
      console.warn('start failed', err);
    }
  }

  function stop() {
    try {
      scheduler?.stop();
    } catch (err) {
      console.warn('stop failed', err);
    }
  }

  return (
    <div>
      <h3>Strudel Music</h3>
      <p>Welcome to the Strudel Music component!</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => initialize()} disabled={scheduler}>
          Initialize Audio
        </button>
        <button onClick={start} disabled={!scheduler}>
          Start Music
        </button>
        <button onClick={startAnotherOne} disabled={!scheduler}>
          Start Another Music
        </button>
        <button onClick={stop} disabled={!scheduler}>
          Stop Music
        </button>
      </div>
      <div style={{ marginTop: 8, color: scheduler ? 'green' : '#666' }}>
        {scheduler ? 'Audio initialized' : 'Initializing audio...'}
      </div>
    </div>
  );
}
