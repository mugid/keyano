"use client";
import React, { useEffect, useRef } from "react";
import * as Tone from "tone";

const whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
const blackNotes = ["Cb", "Db", "", "Fb", "Gb", "Ab", ""];
const octaves = [3, 4, 5];

const keyMap: Record<string, string> = {
  // White keys
  a: "C4",
  s: "D4",
  d: "E4",
  f: "F4",
  g: "G4",
  h: "A4",
  j: "B4",
  // Black keys
  w: "Cb4",
  e: "Db4",
  t: "Fb4",
  y: "Gb4",
  u: "Ab4",
};

const Piano = () => {
  const playersRef = useRef<Map<string, Tone.Player>>(new Map());

  useEffect(() => {
    // Preload sample players for all required notes
    const loadSamples = async () => {
      await Tone.start();

      for (const oct of octaves) {
        for (const note of whiteNotes) {
          const fullNote = `${note}${oct}`;
          if (!playersRef.current.has(fullNote)) {
            const player = new Tone.Player(`/samples/${fullNote}.ogg`).toDestination();
            player.autostart = false;
            playersRef.current.set(fullNote, player);
          }
        }
        for (let i = 0; i < blackNotes.length; i++) {
          const sharp = blackNotes[i];
          if (sharp) {
            const fullNote = `${sharp}${oct}`;
            if (!playersRef.current.has(fullNote)) {
              const player = new Tone.Player(`/samples/${fullNote}.ogg`).toDestination();
              player.autostart = false;
              playersRef.current.set(fullNote, player);
            }
          }
        }
      }
    };

    loadSamples();

    const down = (e: KeyboardEvent) => {
      const note = keyMap[e.key.toLowerCase()];
      if (note) playNote(note);
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  const playNote = async (note: string) => {
    await Tone.start();
    const player = playersRef.current.get(note);
    if (player) {
      player.start();
    }
  };

  return (
    <div className="bg-[#b53d3d] flex flex-col items-center justify-center pt-6 px-6 gap-4 rounded-xl font-sans font-semibold">
      <div className="grid grid-cols-8 grid-rows-1 gap-7">
        <div className="flex flex-row gap-4">
          <div className="rounded-full bg-yellow-400 w-[4em] h-[4em] drop-shadow-2xl/80"></div>
          <div className="rounded-full bg-yellow-400 w-[4em] h-[4em] drop-shadow-2xl/80"></div>
        </div>
        <div className="col-span-2 col-start-3 flex flex-row gap-4">
          <div className="rounded-full bg-yellow-400 w-[4em] h-[4em] drop-shadow-2xl/80"></div>
          <div className="rounded-full bg-yellow-400 w-[4em] h-[4em] drop-shadow-2xl/80"></div>
          <div className="rounded-full bg-yellow-400 w-[4em] h-[4em] drop-shadow-2xl/80"></div>
        </div>
        <div className="col-span-3 col-start-6 flex flex-row gap-4">
          <div className="bg-yellow-400 w-[4em] h-[4em] rounded-md drop-shadow-2xl/80"></div>
          <div className="bg-yellow-400 w-[4em] h-[4em] rounded-md drop-shadow-2xl/80"></div>
          <div className="bg-yellow-400 w-[4em] h-[4em] rounded-md drop-shadow-2xl/80"></div>
          <div className="bg-yellow-400 w-[4em] h-[4em] rounded-md drop-shadow-2xl/80"></div>
          <div className="bg-yellow-400 w-[4em] h-[4em] rounded-md drop-shadow-2xl/80"></div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mt-5 gap-1 px-2 py-1">
        {octaves.map((oct) => (
          <div key={oct} className="relative flex gap-1 mb-4 inset-shadow-black/80">
            {whiteNotes.map((note, idx) => (
              <div key={note + oct} className="relative">
                <button
                  onClick={() => playNote(`${note}${oct}`)}
                  className="w-16 h-48 bg-white rounded-md active:bg-gray-200"
                >
                  {note}
                  {oct}
                </button>
                {blackNotes[idx] && (
                  <button
                    onClick={() => playNote(`${blackNotes[idx]}${oct}`)}
                    className="drop-shadow-2xl w-10 h-32 bg-black rounded-md text-white text-xs absolute top-0 left-16 z-10 active:bg-gray-700"
                    style={{ transform: "translateX(-50%)" }}
                  >
                    {blackNotes[idx]}
                    {oct}
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Piano;
