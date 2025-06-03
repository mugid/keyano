'use client';
import React, { useEffect } from 'react';
import * as Tone from 'tone';

const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackNotes = ['C#', 'D#', '', 'F#', 'G#', 'A#', ''];
const octaves = [3, 4, 5];

const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: 'sine', 
  },
  envelope: {
    attack: 0.03,
    decay: 0.3,
    sustain: 0.4,
    release: 1.5,
  },
}).toDestination();

const reverb = new Tone.Reverb({
  decay: 3,
  preDelay: 0.1,
}).toDestination();

const filter = new Tone.Filter({
  frequency: 1000,
  type: 'lowpass',
}).connect(reverb);

synth.connect(filter);

const keyMap: Record<string, string> = {
  // White keys
  a: 'C4', s: 'D4', d: 'E4', f: 'F4', g: 'G4', h: 'A4', j: 'B4',
  // Black keys
  w: 'C#4', e: 'D#4', t: 'F#4', y: 'G#4', u: 'A#4',
};

const Piano = () => {
  const playNote = async (note: string) => {
    await Tone.start();
    synth.triggerAttackRelease(note, '8n');
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const note = keyMap[e.key.toLowerCase()];
      if (note) playNote(note);
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="flex flex-row items-center justify-center mt-10 gap-4">
      {octaves.map((oct) => (
        <div key={oct} className="relative flex gap-1 mb-6">
          {/* White keys */}
          {whiteNotes.map((note, idx) => (
            <div key={note + oct} className="relative">
              <button
                onClick={() => playNote(`${note}${oct}`)}
                className="w-16 h-48 bg-white border border-black active:bg-gray-200"
              >
                {note}{oct}
              </button>

              {/* Black key overlay */}
              {blackNotes[idx] && (
                <button
                  onClick={() => playNote(`${blackNotes[idx]}${oct}`)}
                  className="w-10 h-32 bg-black text-white text-xs border border-gray-800 absolute -top-4 left-10 z-10 active:bg-gray-700"
                  style={{ transform: 'translateX(-50%)' }}
                >
                  {blackNotes[idx]}{oct}
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Piano;
