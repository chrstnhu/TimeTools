import Button from "@/components/ui/Button";
import { RotateCcw, Plus, Minus, Save } from "lucide-react";

function CalculatorButtons({ onAdd, onSubtract, onReset, onKeep }) {
  return (
    <div className="flex gap-2 my-4">
      <Button icon={Plus} type="button" onClick={onAdd}>
        Add
      </Button>

      <Button icon={Minus} type="button" onClick={onSubtract}>
        Subtract
      </Button>

      <Button icon={RotateCcw} type="button" onClick={onReset}>
        Reset
      </Button>

      <Button icon={Save} type="button" onClick={onKeep}>
        Keep time
      </Button>
    </div>
  );
}

export default CalculatorButtons;
