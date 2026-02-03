import clsx from "clsx";
import { MouseEventHandler } from "react";
type WordProps = {
  word: string;
  selected: boolean;
  onClick: MouseEventHandler<HTMLSpanElement>;
  state: string;
};

export const Word = ({ word, selected, onClick, state }: WordProps) => {
  return (
    <>
      <span
        onClick={onClick}
        className={clsx("px-1 rounded", selected && "bg-yellow-300")}
      >
        {word}
      </span>
      <span> </span>
    </>
  );
};
