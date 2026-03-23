"use client";
import { useRef, useState, useEffect } from "react";
import { repl, controls } from "@strudel.cycles/core";
import {
  initAudioOnFirstClick,
  getAudioContext,
  webaudioOutput
} from "@strudel.cycles/webaudio";
const { note } = controls;

export default function StrudelMusic() {
  const schedulerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // cleanup on unmount if we initialized
    return () => {
      try {
        schedulerRef.current?.stop();
      } catch {}
      schedulerRef.current = null;
      setIsReady(false);
    };
  }, []);

  async function initialize() {
    if (isReady) return;
    try {
      // ask the Strudel helper to prepare audio on user gesture
      initAudioOnFirstClick();
    } catch {}

    try {
      const ctx = getAudioContext();
      const { scheduler } = repl({
        defaultOutput: webaudioOutput,
        getTime: () => ctx.currentTime,
      });

      // set a default pattern
      try {
        const pattern = note("c3", ["eb3", "g3"]).s("sawtooth");
        scheduler.setPattern(pattern);
      } catch (err) {
        console.warn("Failed to set pattern", err);
      }

      schedulerRef.current = scheduler;
      setIsReady(true);
    } catch (err) {
      console.error("Strudel audio init failed:", err);
    }
  }

  function start() {
    try {
      schedulerRef.current?.setPattern(note("c3", ["eb3", "g3"]).s("sawtooth"));
      schedulerRef.current?.start();
    } catch (err) {
      console.warn("start failed", err);
    }
  }

  function stop() {
    try {
      schedulerRef.current?.stop();
    } catch (err) {
      console.warn("stop failed", err);
    }
  }

  return (
    <div>
      <h1>Strudel Music</h1>
      <p>Welcome to the Strudel Music component!</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => initialize()} disabled={isReady}>
          Initialize Audio
        </button>
        <button onClick={start} disabled={!isReady}>
          Start Music
        </button>
        <button onClick={stop} disabled={!isReady}>
          Stop Music
        </button>
      </div>
      <div style={{ marginTop: 8, color: isReady ? "green" : "#666" }}>
        {isReady ? "Audio initialized" : "Initializing audio..."}
      </div>
    </div>
  );
}
