import Input from "../ui/Input";

function InputTime({ value, onChange, label, min = 0, max = 59, ...props }) {
  const handleChange = (e) => {
    const newValue = Math.min(max, Math.max(min, Number(e.target.value) || 0));
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        className="
          w-full
          rounded-3xl
          py-5
          text-center
          text-3xl
          font-bold
          shadow-sm
          transition
          focus:scale-105
        "
        style={{ fontFamily: "var(--font-mono)" }}
        {...props}
      />

      <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
        {label}
      </span>
    </div>
  );
}

function TimeInput({ label, id, value, onChange, maxHours = 23 }) {
  return (
    <div className="space-y-5">
      {label && <h2 className="text-xl font-semibold">{label}</h2>}

      <div className="grid grid-cols-3 gap-6">
        <InputTime
          id={`${id}-h`}
          label="Hours"
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
          label="Minutes"
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
          label="Seconds"
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