"use client";
import { Play, Square, Pause } from "lucide-react";

import WhiteKey from "./white-keys";
import BlackKey from "./black-keys";
import Decoration from "./decoration";

import useRecorder from "./hooks/useRecorder";
import usePlayNote from "./hooks/usePlayNote";

const Piano = () => {
  const {
    startRecording,
    togglePause,
    stopRecording,
    recording,
    paused,
    timer,
  } = useRecorder();
  const { playNote, octaves, whiteNotes, blackNotes } = usePlayNote();

  return (
    <div className="bg-[#842b2b] rounded-xl outline-offset-4">
      <div className="bg-[#b53d3d] flex flex-col items-center justify-center pt-6 px-6 gap-4 rounded-xl font-sans font-semibold translate-y-[-10px]">
        <div className="grid grid-cols-8 grid-rows-1 gap-7">
          <div className="flex flex-row gap-4 text-white">
            <div className="bg-yellow-600 rounded-full outline-offset-4">
              {!recording && (
                <button
                  onClick={startRecording}
                  className="decoration rounded-full flex items-center justify-center translate-y-[-5px] active:translate-y-[-2px]"
                >
                  <Play className="w-6 h-6 fill-white" />
                </button>
              )}
              {recording && (
                <button
                  onClick={togglePause}
                  className="decoration rounded-full flex items-center justify-center translate-y-[-5px] active:translate-y-[-2px]"
                >
                  {paused ? (
                    <Play className="w-6 h-6 fill-white" />
                  ) : (
                    <Pause className="w-6 h-6 fill-white" />
                  )}
                </button>
              )}
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
            <div className="w-full bg-black rounded-xl outline-offset-4">
              <div className="w-full h-full flex items-center justify-end text-right px-6 bg-[#161616] rounded-xl translate-y-[5px] inset-shadow-black/80 ">
                <span className="text-white font-mono text-xl mb-2">
                  {String(Math.floor(timer / 60)).padStart(2, "0")}:
                  {String(timer % 60).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-3 col-start-6 flex flex-row gap-4">
            <Decoration radius="rounded-md" />
            <Decoration radius="rounded-md" />
            <Decoration radius="rounded-md" />
            <Decoration radius="rounded-md" />
            <Decoration radius="rounded-md" />
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
