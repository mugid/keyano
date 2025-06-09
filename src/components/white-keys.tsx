type WhiteKeyProps = {
  note: string;
  oct: number;
  playNote: (note: string) => void;
};

const WhiteKey: React.FC<WhiteKeyProps> = ({ note, oct, playNote }) => {
  return (
    <div className="bg-gray-200 rounded-md outline-offset-4">
      <button
        onClick={() => playNote(`${note}${oct}`)}
        className="w-16 h-48 pt-32 text-gray-900 bg-white rounded-md active:translate-y-[-3px] translate-y-[-5px]"
      >
        {note}
        {oct}
      </button>
    </div>
  );
};

export default WhiteKey;
