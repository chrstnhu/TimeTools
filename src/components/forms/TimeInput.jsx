import Input from "../ui/Input";

function InputTime({ value, onChange, min = 0, max = 59, ...props }) {
  const handleChange = (e) => {
    const newValue = Math.min(max, Math.max(min, Number(e.target.value) || 0));
    onChange(newValue);
  };

  return (
    <Input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
      className="w-full text-center"
      {...props}
    />
  );
}

function TimeInput({ label, id, value, onChange, maxHours = 23 }) {
  return (
    <div>
      <label className="font-semibold text-lg" htmlFor={`${id}-h`}>
        {label}
      </label>

      <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-400">
        <span>Hours</span>
        <span>Minutes</span>
        <span>Seconds</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <InputTime
          id={`${id}-h`}
          value={value.h}
          min={0}
          max={maxHours}
          onChange={(h) =>
            onChange({
              ...value,
              h,
            })
          }
        />

        <InputTime
          id={`${id}-m`}
          value={value.m}
          min={0}
          max={59}
          onChange={(m) =>
            onChange({
              ...value,
              m,
            })
          }
        />

        <InputTime
          id={`${id}-s`}
          value={value.s}
          min={0}
          max={59}
          onChange={(s) =>
            onChange({
              ...value,
              s,
            })
          }
        />
      </div>
    </div>
  );
}

export { InputTime };
export default TimeInput;
