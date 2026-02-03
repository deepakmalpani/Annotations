import { useMemo, useState } from "react";
import { Word } from "./word";
import { produce } from "immer";
import { useCtrlKey } from "@/hooks/use-ctrl-key";

type AnnotationProps = {
  paragraph: string;
};

export const Annotation = ({ paragraph }: AnnotationProps) => {
  const isCtrlKeyPressed = useCtrlKey();

  const words = useMemo(() => paragraph.split(" "), [paragraph]);
  const [selectedWords, setSelectedWords] = useState(
    Object.fromEntries(words.map((_, index) => [index, false])),
  );

  const onWordClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedWords(
      produce(selectedWords, (draft) => {
        Object.keys(draft).forEach((i) => {
          draft[Number(i)] =
            Number(i) === index
              ? true
              : isCtrlKeyPressed
                ? draft[Number(i)]
                : false;
        });
      }),
    );
  };

  return (
    <>
      <div className="w-6xl">
        <div className="w-4xl border-2 border-gray-700 m-2">
          {words.map((item, index) => {
            return (
              <Word
                word={item}
                key={index}
                selected={selectedWords[index]}
                state=""
                onClick={(e) => onWordClick(e, index)}
              ></Word>
            );
          })}
        </div>
        <div className="w-4xl">
          <button
            className="px-4 py-2 bg-green-600 text-white font-medium
         hover:bg-green-700 focus:outline-none focus:ring-2
         focus:ring-green-500 focus:ring-offset-2 m-2"
          >
            Positive annotation
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white font-medium
         hover:bg-red-700 focus:outline-none focus:ring-2
         focus:ring-red-500 focus:ring-offset-2 m-2"
          >
            Negative annotation
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white font-medium
         hover:bg-gray-700 focus:outline-none focus:ring-2
         focus:ring-gray-500 focus:ring-offset-2 m-2"
          >
            Reset annotation
          </button>
        </div>
      </div>
    </>
  );
};
