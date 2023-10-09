import newToast from "@/utils/newToast";

export default async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);

  newToast("Copied successfully to clipboard");
}
