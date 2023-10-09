import { customAlphabet } from "nanoid";

export function generateID() {
  const nanoid = customAlphabet("1234567890", 4);
  return nanoid();
}
