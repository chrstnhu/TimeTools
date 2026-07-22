import Button from "@/components/ui/Button";
import { RotateCcw, Plus, Minus, Save } from "lucide-react";

function CalculatorButtons({ onAdd, onSubtract, onReset, onKeep }) {
  return (
    <div className="flex gap-2 my-4 justify-center">
      <Button icon={Plus} type="button" onClick={onAdd} variant="primary">
        Add
      </Button>

      <Button icon={Minus} type="button" onClick={onSubtract} variant="primary">
        Subtract
      </Button>

      <Button icon={RotateCcw} type="button" onClick={onReset} variant="ghost">
        Reset
      </Button>

      <Button icon={Save} type="button" onClick={onKeep} variant="ghost">
        Keep result
      </Button>
    </div>
  );
}

export default CalculatorButtons;
