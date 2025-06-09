"use client";
import React, { useEffect, useRef } from "react";
import * as Tone from "tone";
import { Play, Square } from "lucide-react";
import WhiteKey from "./white-keys";
import BlackKey from "./black-keys";
import Decoration from "./decoration";

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

  const dest = Tone.getContext().createMediaStreamDestination();
  Tone.getDestination().connect(dest); // routes all audio to recorder too
  const mediaRecorder = new MediaRecorder(dest.stream);

  let chunks: BlobPart[] = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    // Optional: auto-download
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.mp3";
    a.click();
  };

  const startRecording = () => {
    chunks = [];
    mediaRecorder.start();
  };

  const stopRecording = () => {
    mediaRecorder.stop();
  };

  return (
    <div className="bg-[#842b2b] rounded-xl outline-offset-4">
      <div className="bg-[#b53d3d] flex flex-col items-center justify-center pt-6 px-6 gap-4 rounded-xl font-sans font-semibold translate-y-[-10px]">
        <div className="grid grid-cols-8 grid-rows-1 gap-7">
          <div className="flex flex-row gap-4 text-white">
            <div className="bg-yellow-600 rounded-full outline-offset-4">
              <button
                onClick={startRecording}
                className="decoration rounded-full flex items-center justify-center translate-y-[-5px] active:translate-y-[-2px]"
              >
                <Play className="w-6 h-6 fill-white" />
              </button>
            </div>
            <div className="bg-yellow-600 rounded-full outline-offset-4">
              <button
                onClick={stopRecording}
                className="decoration rounded-full flex items-center justify-center translate-y-[-5px] active:translate-y-[-2px]"
              >
                <Square className="w-6 h-6 fill-white" />
              </button>
            </div>
          </div>
          <div className="col-span-2 col-start-3 flex flex-row gap-4">
            <Decoration radius="rounded-full" />
            <Decoration radius="rounded-full" />
            <Decoration radius="rounded-full" />
          </div>
          <div className="col-span-3 col-start-6 flex flex-row gap-4">
            <Decoration radius="rounded-none" />
            <Decoration radius="rounded-none" />
            <Decoration radius="rounded-none" />
            <Decoration radius="rounded-none" />
            <Decoration radius="rounded-none" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-5 gap-1 px-2 py-1">
          {octaves.map((oct) => (
            <div
              key={oct}
              className="relative flex gap-1 mb-4 inset-shadow-black/80"
            >
              {whiteNotes.map((note, idx) => (
                <div key={note + oct} className="relative">
                  <WhiteKey note={note} oct={oct} playNote={playNote} />
                  {blackNotes[idx] && (
                    <BlackKey
                      blackNotes={blackNotes}
                      idx={idx}
                      oct={oct}
                      playNote={playNote}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Piano;
