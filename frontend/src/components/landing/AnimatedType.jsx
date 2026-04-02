import { useEffect, useState } from "react";

import { useTheme } from "../../context/ThemeContext";

const PHRASES = [
  "StockSense",
  "Smarter Stock Intelligence",
  "Visualize Market Trends",
];

export default function AnimatedType() {
  const { currentTheme } = useTheme();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    const reachedEnd = displayText === currentPhrase;
    const reachedStart = displayText === "";

    let timeout = 90 + Math.random() * 40;

    if (!isDeleting && reachedEnd) {
      timeout = 1400;
    }

    if (isDeleting) {
      timeout = 45 + Math.random() * 25;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && !reachedEnd) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        return;
      }

      if (!isDeleting && reachedEnd) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && !reachedStart) {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        return;
      }

      setIsDeleting(false);
      setPhraseIndex((current) => (current + 1) % PHRASES.length);
    }, timeout);

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <div className="min-h-[4rem] sm:min-h-[5rem]">
      <span
        className={`bg-clip-text text-transparent ${
          currentTheme === "dark"
            ? "bg-gradient-to-r from-white via-cyan-200 to-indigo-300"
            : "bg-gradient-to-r from-gray-900 via-blue-700 to-cyan-500"
        }`}
      >
        {displayText}
      </span>
      <span className="cursor-blink ml-1 inline-block text-blue-500 dark:text-cyan-300">|</span>
    </div>
  );
}
