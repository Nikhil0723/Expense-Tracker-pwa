import { Button } from "./ui/button";


const Numpad = ({ onValueChange }: { onValueChange: (value: string) => void }) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "✔"];

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {keys.map((key) => (
        <Button key={key} variant="secondary" className="p-8 text-2xl font-semibold" onClick={() => onValueChange(key)}>
          {key}
        </Button>
      ))}
    </div>
  );
};

export default Numpad;
