import { useEffect, useRef } from "react";
import * as Tone from "tone";

const whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
const blackNotes = ["Cb", "Db", "", "Fb", "Gb", "Ab", ""];
const octaves = [3, 4, 5];

const keyMap: Record<string, string> = {
  // White keys
  a: "C3",
  s: "D3",
  d: "E3",
  f: "F3",
  g: "G3",
  h: "A3",
  j: "B3",
  k: "C4",
  l: "D4",
  ";": "E4",
  "'": "F4",
  z: "G4",
  x: "A4",
  c: "B4",
  v: "C5",
  b: "D5",
  n: "E5",
  m: "F5",
  ",": "G5",
  ".": "A5",
  "/": "B5",

  // Black keys
  2: "Cb3",
  3: "Db3",
  5: "Fb3",
  6: "Gb3",
  7: "Ab3",
  9: "Cb4",
  0: "Db4",
  p: "Fb4",
  "[": "Gb4",
  "]": "Ab4",
  w: "C5",
  e: "D5",
  t: "F5",
  y: "G5",
  u: "A5",
};

const usePlayNote = () => {
  const playersRef = useRef<Map<string, Tone.Player>>(new Map());

  useEffect(() => {
    // Preload sample players for all required notes
    const loadSamples = async () => {
      await Tone.start();

      for (const oct of octaves) {
        for (const note of whiteNotes) {
          const fullNote = `${note}${oct}`;
          if (!playersRef.current.has(fullNote)) {
            const player = new Tone.Player(
              `/samples/${fullNote}.ogg`
            ).toDestination();
            player.autostart = false;
            playersRef.current.set(fullNote, player);
          }
        }

        for (let i = 0; i < blackNotes.length; i++) {
          const sharp = blackNotes[i];
          if (sharp) {
            const fullNote = `${sharp}${oct}`;
            if (!playersRef.current.has(fullNote)) {
              const player = new Tone.Player(
                `/samples/${fullNote}.ogg`
              ).toDestination();
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

  return {
    playNote,
    octaves,
    whiteNotes,
    blackNotes,
    keyMap
  };
};

export default usePlayNote;
