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
    <div className="absolute top-0 w-10 h-32 left-16 z-12 translate-x-[-50%] bg-black rounded-md outline-offset-4">
      <button
        onClick={() => playNote(`${blackNotes[idx]}${oct}`)}
        className="w-full h-full pt-16 bg-[#1f1f1f] rounded-md text-white text-xs translate-y-[-5px] active:translate-y-[-3px]"
      >
        {blackNotes[idx]}
        {oct}
      </button>
    </div>
  );
};

export default BlackKey;
