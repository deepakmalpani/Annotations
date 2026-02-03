import clsx from "clsx";
import { MouseEventHandler } from "react";
type WordProps = {
  word: string;
  selected: boolean;
  onClick: MouseEventHandler<HTMLSpanElement>;
  state: "positive" | "negative" | "default";
};

export const Word = ({ word, selected, onClick, state }: WordProps) => {
  return (
    <>
      <span
        onClick={onClick}
        className={clsx(
          "px-1 rounded",
          state === "positive" && "bg-green-300",
          selected && state === "default" && "bg-yellow-300",
        )}
      >
        {word}
      </span>
      <span> </span>
    </>
  );
};
