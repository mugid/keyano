import { useEffect, useRef } from "react";
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
  };
};

export default usePlayNote;
