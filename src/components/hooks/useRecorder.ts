import { useRef, useState } from "react";
import * as Tone from "tone";

const useRecorder = () => {
  const chunks = useRef<BlobPart[]>([]);
  const recorder = useRef<MediaRecorder | null>(null);
  const mediaDest = useRef<MediaStreamAudioDestinationNode | null>(null);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startRecording = () => {
    chunks.current = [];

    const context = Tone.getContext();
    const destination = Tone.getDestination();

    mediaDest.current = (
      context.rawContext as AudioContext
    ).createMediaStreamDestination();
    destination.output.connect(mediaDest.current);

    recorder.current = new MediaRecorder(mediaDest.current.stream);

    recorder.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.current.push(e.data);
    };

    recorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.mp3";
      a.click();
    };

    recorder.current.start();
    setRecording(true);
    setPaused(false);
    setTimer(0);
    startTimer();
  };

  const togglePause = () => {
    if (!recorder.current) return;

    if (recorder.current.state === "recording") {
      recorder.current.pause();
      setPaused(true);
      stopTimer();
    } else if (recorder.current.state === "paused") {
      recorder.current.resume();
      setPaused(false);
      startTimer();
    }
  };

  const stopRecording = () => {
    recorder.current?.stop();
    setRecording(false);
    setPaused(false);
    stopTimer();
    setTimer(0);
  };

  return {
    startRecording,
    togglePause,
    stopRecording,
    recording,
    paused,
    timer,
  };
};

export default useRecorder;
