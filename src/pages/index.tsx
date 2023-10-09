import Clipboard from "@/components/Clipboard";
import PIN from "@/components/PIN";
import Seo from "@/components/common/Seo";
import CopyIcon from "@/components/icons/CopyIcon";
import Tooltip from "@/components/ui/Tooltip";
import { api } from "@/utils/api";
import copyToClipboard from "@/utils/copyToClipboard";
import { generateID } from "@/utils/generateID";
import newToast from "@/utils/newToast";
import Link from "next/link";
import React from "react";

export type ClipboardType = "Share" | "Retrieve";

export interface Clip {
  id: string;
  content: string;
  language: string;
  autoEraseOnce: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [id, setID] = React.useState("");
  const [currClipboardType, setCurrClipboardType] =
    React.useState<ClipboardType>("Share");

  const [code, setCode] = React.useState("Type or paste text here...");
  const [language, setLanguage] = React.useState("markdown");

  const ref = React.useRef<HTMLInputElement[]>(null);

  const { data: clip } = api.clipboard.getById.useQuery(
    { id },
    {
      enabled: currClipboardType === "Retrieve" && !!id,
      onSuccess(data) {
        if (!data?.content) newToast(`Clipboard not found`, "error");
      },
    },
  );
  const shareClip = api.clipboard.create.useMutation({
    onSuccess: (_) => {
      newToast(`Clipboard (ID: ${id}) is shared successfully`, "success");
    },
  });

  function updatePIN(value: string) {
    setID(value);
    ref.current?.forEach((input, idx) => (input.value = value[idx] ?? ""));
  }

  function updateID(value: string) {
    setID(value);
    ref.current?.forEach((input) => input.blur());
  }

  function createClip() {
    if (!code) return;
    const currID = generateID();

    shareClip.mutate({
      id: currID,
      content: code,
      language,
      autoEraseOnce: false,
    });

    setID(currID);
    ref.current?.forEach((input, idx) => (input.value = currID[idx] ?? ""));
  }

  // function getClip() {
  //   if (id.length !== 4) return;

  //   void refetch();
  // }

  return (
    <>
      <Seo />

      <main className="flex h-full w-full">
        {/* LEFT PANEL */}
        <div className="flex h-full w-1/3 flex-col justify-between p-6">
          <nav>
            <h1 className="text-4xl font-bold text-neutral-200">SnapClip</h1>
          </nav>

          <div className="flex w-full flex-col items-center gap-6">
            <PIN
              ref={ref}
              disabled={currClipboardType === "Share"}
              setID={updateID}
            />

            {currClipboardType === "Share" ? (
              <div className="flex items-center gap-3">
                <button
                  className="flex w-fit items-center justify-center rounded-lg bg-neutral-100 px-6 py-2 font-medium text-neutral-900 duration-200 hover:bg-opacity-95 hover:shadow-2xl hover:shadow-neutral-100"
                  onClick={createClip}
                >
                  {currClipboardType}
                </button>

                {id ? (
                  <Tooltip content={`Copy ID`}>
                    <button
                      onClick={() => void copyToClipboard(id)}
                      className="rounded-md border border-neutral-600 p-2 text-neutral-200 duration-200 hover:bg-neutral-600 hover:bg-opacity-60"
                    >
                      <CopyIcon />
                    </button>
                  </Tooltip>
                ) : null}
              </div>
            ) : null}
          </div>

          <footer className="text-xs text-neutral-200">
            Developed by{" "}
            <Link
              href="https://github.com/aalaeDev"
              className="underline duration-200 hover:text-neutral-100"
            >
              aalaedev
            </Link>
            . The source code is on{" "}
            <Link
              href="https://github.com/aalaeDev/SnapURL"
              className="underline duration-200 hover:text-neutral-100"
            >
              GitHub
            </Link>
            .
          </footer>
        </div>

        {/* RIGHT PANEL */}
        <div className="h-full w-full border-l border-l-neutral-600 bg-neutral-800 p-6">
          <Clipboard
            {...{
              id,
              updatePIN,
              currClipboardType,
              setCurrClipboardType,
              language,
              setLanguage,
              code,
              setCode,
              clip,
            }}
          />
        </div>
      </main>
    </>
  );
}
