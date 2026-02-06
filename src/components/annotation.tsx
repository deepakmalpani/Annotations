import { useEffect, useMemo, useState } from "react";
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
  const [positiveAnnotations, setPositiveAnnotations] = useState(
    Object.fromEntries(words.map((_, index) => [index, false])),
  );
  const [negativeAnnotations, setNegativeAnnotations] = useState(
    Object.fromEntries(words.map((_, index) => [index, false])),
  );

  const resetAnnotations = (annotations: Record<string, boolean>) => {
    Object.keys(annotations).forEach((i) => {
      annotations[i] = false;
    });
  };

  const onWordClick = (index: number) => {
    const newPositiveAnnotations = { ...positiveAnnotations };
    const newSelectedWords = { ...selectedWords };
    const newNegativeAnnotations = { ...negativeAnnotations };
    Object.keys(newPositiveAnnotations).forEach((i) => {
      if (Number(i) === index) {
        newPositiveAnnotations[i] = false;
        newSelectedWords[i] = true;
        newNegativeAnnotations[i] = false;
      } else if (!isCtrlKeyPressed) {
        newSelectedWords[i] = false;
      }
    });
    setSelectedWords(newSelectedWords);
    setPositiveAnnotations(newPositiveAnnotations);
    setNegativeAnnotations(newNegativeAnnotations);
  };

  const onPositiveAnnotationClick = () => {
    const newPositiveAnnotations = { ...positiveAnnotations };
    const newSelectedWords = { ...selectedWords };
    const newNegativeAnnotations = { ...negativeAnnotations };
    Object.keys(newPositiveAnnotations).forEach((i) => {
      if (selectedWords[i]) {
        newPositiveAnnotations[i] = true;
        newSelectedWords[i] = false;
        newNegativeAnnotations[i] = false;
      }
    });
    setPositiveAnnotations(newPositiveAnnotations);
    setSelectedWords(newSelectedWords);
    setNegativeAnnotations(newNegativeAnnotations);
  };

  const onNegativeAnnotationClick = () => {
    const newPositiveAnnotations = { ...positiveAnnotations };
    const newSelectedWords = { ...selectedWords };
    const newNegativeAnnotations = { ...negativeAnnotations };
    Object.keys(newPositiveAnnotations).forEach((i) => {
      if (selectedWords[i]) {
        newPositiveAnnotations[i] = false;
        newSelectedWords[i] = false;
        newNegativeAnnotations[i] = true;
      }
    });
    setPositiveAnnotations(newPositiveAnnotations);
    setSelectedWords(newSelectedWords);
    setNegativeAnnotations(newNegativeAnnotations);
  };

  const onResetAnnotationClick = () => {
    setPositiveAnnotations(
      produce(positiveAnnotations, (draft) => {
        resetAnnotations(draft);
      }),
    );
    setNegativeAnnotations(
      produce(negativeAnnotations, (draft) => {
        resetAnnotations(draft);
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
                state={
                  positiveAnnotations[index]
                    ? "positive"
                    : negativeAnnotations[index]
                      ? "negative"
                      : "default"
                }
                onClick={() => onWordClick(index)}
              ></Word>
            );
          })}
        </div>
        <div className="w-4xl">
          <button
            className="px-4 py-2 bg-green-600 text-white font-medium
         hover:bg-green-700 focus:outline-none focus:ring-2
         focus:ring-green-500 focus:ring-offset-2 m-2"
            onClick={onPositiveAnnotationClick}
          >
            Positive annotation
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white font-medium
         hover:bg-red-700 focus:outline-none focus:ring-2
         focus:ring-red-500 focus:ring-offset-2 m-2"
            onClick={onNegativeAnnotationClick}
          >
            Negative annotation
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white font-medium
         hover:bg-gray-700 focus:outline-none focus:ring-2
         focus:ring-gray-500 focus:ring-offset-2 m-2"
            onClick={onResetAnnotationClick}
          >
            Reset annotation
          </button>
        </div>
      </div>
    </>
  );
};
