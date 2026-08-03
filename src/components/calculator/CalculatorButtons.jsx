import Button from "@/components/ui/Button";
import { RotateCcw, Plus, Minus, Save } from "lucide-react";

function CalculatorButtons({ onAdd, onSubtract, onReset, onKeep }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-2">
      <Button
        icon={Plus}
        type="button"
        onClick={onAdd}
        variant="primary"
        shape="square"
        size="md"
        className="flex-1 sm:flex-initial min-w-[100px]"
      >
        Add
      </Button>

      <Button
        icon={Minus}
        type="button"
        onClick={onSubtract}
        variant="primary"
        shape="square"
        size="md"
        className="flex-1 sm:flex-initial min-w-[100px]"
      >
        Subtract
      </Button>

      <Button
        icon={RotateCcw}
        type="button"
        onClick={onReset}
        variant="ghost"
        shape="square"
        size="md"
        className="opacity-80 hover:opacity-100"
      >
        Reset
      </Button>

      <Button
        icon={Save}
        type="button"
        onClick={onKeep}
        variant="ghost"
        shape="square"
        size="md"
        className="opacity-80 hover:opacity-100 "
      >
        Keep result
      </Button>
    </div>
  );
}

export default CalculatorButtons;
