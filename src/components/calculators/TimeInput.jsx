import Input from "./Input";

function InputTime({
  value,
  onChange,
  min = 0,
  max = 59,
  ...props
}) {
  const handleChange = (e) => {
    const newValue = Math.min(
      max,
      Math.max(min, Number(e.target.value) || 0)
    );

    onChange(newValue);
  };

  return (
    <Input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
      {...props}
    />
  );
}


function TimeInput({
  label,
  id,
  value,
  onChange,
  maxHours = 23,
}) {
  return (
    <div>
      <label htmlFor={`${id}-h`}>
        {label}
      </label>

      <div className="flex items-center">
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
        <span>h</span>

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
        <span>m</span>

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
        <span>s</span>
      </div>
    </div>
  );
}

export { InputTime };
export default TimeInput;