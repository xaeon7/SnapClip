import React from "react";
import ClipboardEditor from "./ClipboardEditor";
import ToggleMode from "./ToggleMode";
import type { Clip, ClipboardType } from "@/pages";
import Tooltip from "./ui/Tooltip";
import copyToClipboard from "@/utils/copyToClipboard";
import CopyIcon from "./icons/CopyIcon";
import { Checkbox } from "./ui/Checkbox";

interface ClipboardProps {
  id: string;
  updatePIN: (value: string) => void;
  currClipboardType: ClipboardType;
  setCurrClipboardType: React.Dispatch<React.SetStateAction<ClipboardType>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  clip?: Clip | null;
  autoErase: boolean;
  setAutoErase: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Clipboard({
  id,
  updatePIN,
  currClipboardType,
  setCurrClipboardType,
  language,
  setLanguage,
  code,
  setCode,
  clip,
  autoErase,
  setAutoErase,
}: ClipboardProps) {
  // const CurrComponent = ClipboardComponent[currClipboardType];

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Toggle Clip Mode (Share | Retrieve) */}
      <ToggleMode
        currClipboardType={currClipboardType}
        setCurrClipboardType={setCurrClipboardType}
        updatePIN={updatePIN}
      />

      {/* Content Metadata */}
      <div className="flex w-full justify-between">
        <div className="w-fit rounded-lg border border-neutral-600 bg-neutral-900 p-2 text-xs text-neutral-400">
          Language: <span className="font-semibold capitalize">{language}</span>
        </div>

        <div className="flex gap-2">
          {clip?.content ? (
            <Tooltip content={`Copy the content`}>
              <button
                onClick={() => void copyToClipboard(clip.content)}
                className="rounded-md border border-neutral-600 p-2 text-neutral-200 duration-200 hover:bg-neutral-600 hover:bg-opacity-60"
              >
                <CopyIcon />
              </button>
            </Tooltip>
          ) : null}
          <div className="w-fit rounded-lg border border-neutral-600 bg-neutral-900 p-2 text-xs text-neutral-400">
            ID: <span className="font-semibold">{id || "-"}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <ClipboardEditor
        code={currClipboardType === "Share" ? code : clip?.content ?? ""}
        setCode={setCode}
        language={
          currClipboardType === "Share" ? language : clip?.language ?? "-"
        }
        setLanguage={setLanguage}
        editable={currClipboardType === "Share"}
        placeholder={
          currClipboardType === "Share"
            ? "Type or paste text here..."
            : "There is nothing here, insert a valid id!"
        }
      />

      {currClipboardType === "Share" ? (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={autoErase}
            onCheckedChange={(e) => setAutoErase(!!e)}
            id="autoErase"
          />
          <label
            htmlFor="autoErase"
            className="cursor-pointer select-none text-sm text-neutral-400"
          >
            Erase the clipboard contents automatically after viewing them once.
          </label>
        </div>
      ) : null}

      {clip?.autoEraseOnce ? (
        <div className="bg-warning/20 border-warning text-warning w-fit rounded-lg border p-2 text-xs  ">
          ⚠️ Warning:{" "}
          <span className="font-medium">
            This clipboard will be automatically erased
          </span>
        </div>
      ) : null}
    </div>
  );
}
