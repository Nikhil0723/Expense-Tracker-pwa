import { Button } from "@/components/ui/button";

const Numpad = () => {
  const keys = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    ".", "0", "✔",
  ];

  return (
    <div className="grid grid-cols-3 gap-2 w-full ">
      {keys.map((key, index) => (
        <Button
          key={index}
          variant="secondary"
          className={` p-10 text-2xl font-semibold  ${
            key === "✔" ? "bg-black text-white" : "bg-gray-100"
          }`}
        >
          {key}
        </Button>
      ))}
    </div>
  );
};

export default Numpad;
