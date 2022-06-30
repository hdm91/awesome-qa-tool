import { customAlphabet } from "nanoid";

const alphabet: string =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const nanoid = customAlphabet(alphabet, 8);

function uid(): string {
  return nanoid();
}

export default uid;
