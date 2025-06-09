type BlackKeyProps = {
  blackNotes: string[];
  idx: number;
  oct: number;
  playNote: (note: string) => void;
};

const BlackKey: React.FC<BlackKeyProps> = ({
  blackNotes,
  idx,
  oct,
  playNote,
}) => {
  return (
    <button
      onClick={() => playNote(`${blackNotes[idx]}${oct}`)}
      className="drop-shadow-2xl w-10 h-32 pt-16 bg-black rounded-md text-white text-xs absolute top-0 left-16 z-10 active:bg-gray-700"
      style={{ transform: "translateX(-50%)" }}
    >
      {blackNotes[idx]}
      {oct}
    </button>
  );
};

export default BlackKey;
