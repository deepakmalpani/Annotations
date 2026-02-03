import { createFileRoute } from "@tanstack/react-router";
import { Annotation } from "@/components/annotation";
import "@/styles.css";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const paragraph =
    "It was always the Monday mornings. It never seemed to happen on Tuesday morning, Wednesday morning, or any other morning during the week. But it happened every Monday morning like clockwork. He mentally prepared himself to once again deal with what was about to happen, but this time he also placed a knife in his pocket just in case.";

  return (
    <div className="min-h-screen from-slate-900 via-slate-800 to-slate-900">
      <Annotation paragraph={paragraph}></Annotation>
    </div>
  );
}
