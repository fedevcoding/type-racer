import React, { useEffect, useState } from "react";
import { Text, useInput } from "ink";

type Params = {
  onType: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

export default function BlinkingInput({ onType, value }: Params) {
  const [inputValue, setInputValue] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  // Effect to toggle cursor visibility every 500 milliseconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Handle user input
  useInput((input, key) => {
    setIsTyping(true);

    if (key.delete || key.backspace) {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (!key.ctrl && !key.meta) {
      setInputValue((prev) => prev + input);
    }
  });

  useEffect(() => {
    onType(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (value === "") setInputValue("");
  }, [value]);

  // Delay setting isTyping to false after 500 milliseconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isTyping]);

  return (
    <Text>
      {"> "}
      {value}
      {cursorVisible || isTyping ? "|" : " "}
    </Text>
  );
}
