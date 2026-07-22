import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

export default function StaticTimePickerLandscape() {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleAccept = (value) => {
    if (!value) return;

    console.log("Heure :", value.hour());
    console.log("Minutes :", value.minute());
    console.log("Secondes :", value.second());

    console.log(value.format("HH:mm:ss"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticTimePicker
        orientation="landscape"
        views={["hours", "minutes", "seconds"]}
        value={selectedTime}
        onChange={(newValue) => setSelectedTime(newValue)}
        onAccept={handleAccept}
        sx={{
          backgroundColor: "var(--background)",

          "& .MuiPickersLayout-root": {
            backgroundColor: "var(--background)",
          },

          "& .MuiTimePickerToolbar-root": {
            backgroundColor: "var(--background)",
            color: "var(--text)",
          },

          "& .MuiClock-clock": {
            backgroundColor: "var(--background)",
          },

          "& .MuiClockNumber-root": {
            color: "var(--text)",
          },

          "& .Mui-selected": {
            backgroundColor: "#2563eb !important",
            color: "#ffffff",
          },

          "& .MuiClockPointer-root": {
            backgroundColor: "#2563eb",
          },

          "& .MuiClockPointer-thumb": {
            backgroundColor: "#2563eb",
            borderColor: "#2563eb",
          },

          "& .MuiButtonBase-root": {
            color: "var(--text)",
          },
        }}
      />

      {selectedTime && (
        <div className="mt-4 text-center text-white">
          <h2 className="text-xl font-bold">
            {selectedTime.format("HH:mm:ss")}
          </h2>

          <p>Heures : {selectedTime.hour()}</p>
          <p>Minutes : {selectedTime.minute()}</p>
          <p>Secondes : {selectedTime.second()}</p>
        </div>
      )}
    </LocalizationProvider>
  );
}