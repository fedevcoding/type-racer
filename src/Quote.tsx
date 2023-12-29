import React from "react";
import { Text } from "ink";

type Params = {
  isPending: boolean;
  quote: string | undefined;
  typedData: string;
};

export default function Quote({ isPending, quote, typedData }: Params) {
  return (
    <Text>
      {isPending
        ? "Loading quote..."
        : Array.from(quote!).map((val, index) => {
            if (typedData[index] === val) {
              return <Text color="green">{val}</Text>;
            } else {
              return <Text color="red">{val}</Text>;
            }
          })}
    </Text>
  );
}
