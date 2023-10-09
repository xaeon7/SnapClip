import React from "react";
import PinField from "react-pin-field";

interface PinProps {
  disabled: boolean;
  ref: React.Ref<HTMLInputElement[]>;
  setID: (value: string) => void;
}

// eslint-disable-next-line react/display-name
const PIN = React.forwardRef<HTMLInputElement[], PinProps>(
  ({ setID, disabled }, ref) => {
    return (
      <div className="mx-auto flex gap-2">
        <PinField
          ref={ref}
          className="w-16 rounded-lg border border-neutral-600 bg-neutral-800 py-4 text-center text-5xl font-bold text-neutral-200 outline-none transition-all placeholder:text-neutral-600/75 focus:outline-none focus:ring focus:ring-main disabled:opacity-50"
          length={4}
          validate={/^[0-9]$/}
          placeholder="-"
          disabled={disabled}
          onComplete={(code) => {
            setID(code);
          }}
        />
      </div>
    );
  },
);

export default PIN;
