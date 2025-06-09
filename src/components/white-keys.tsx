type WhiteKeyProps = {
  note: string;
  oct: number;
  playNote: (note: string) => void;
};

const WhiteKey: React.FC<WhiteKeyProps> = ({ note, oct, playNote }) => {
  return (
    <button
      onClick={() => playNote(`${note}${oct}`)}
      className="w-16 h-48 pt-32 text-gray-900 bg-white rounded-md active:bg-gray-200"
    >
      {note}
      {oct}
    </button>
  );
};

export default WhiteKey;
