import { RANDOM_QUOTES_API } from "./constants.js";
import crypto from "crypto";

export const fetchQuote = async (): Promise<string> => {
  const quote = (await (await fetch(RANDOM_QUOTES_API)).json())?.quote;
  return quote;
};

export const randomId = () => crypto.randomUUID();
