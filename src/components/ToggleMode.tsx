import { type ClipboardType } from "@/pages";

interface ToggleModeProps {
  updatePIN: (value: string) => void;
  currClipboardType: ClipboardType;
  setCurrClipboardType: React.Dispatch<React.SetStateAction<ClipboardType>>;
}

export default function ToggleMode({
  updatePIN,
  currClipboardType,
  setCurrClipboardType,
}: ToggleModeProps) {
  return (
    <div className="relative mx-auto flex w-64 rounded-lg border border-neutral-600 bg-neutral-900 p-1">
      <button
        className="w-1/2 py-1 text-center text-sm antialiased"
        onClick={() => {
          updatePIN("");
          setCurrClipboardType("Share");
        }}
      >
        Share
      </button>
      <button
        className="w-1/2 py-1 text-center text-sm antialiased"
        onClick={() => {
          updatePIN("");
          setCurrClipboardType("Retrieve");
        }}
      >
        Retrieve
      </button>

      <div
        className={`pointer-events-none absolute top-1/2 h-full w-1/2 -translate-y-1/2 rounded-lg bg-neutral-100 mix-blend-exclusion transition-all duration-500 ${
          currClipboardType === "Retrieve"
            ? "left-full -translate-x-full"
            : "left-0"
        }`}
      />
    </div>
  );
}
