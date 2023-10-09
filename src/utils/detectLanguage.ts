import hljs from "highlight.js";

export function detectLanguage(code: string) {
  const langData = hljs.highlightAuto(code);
  const lang = langData.language ?? "markdown";
  // console.log(langData.language, langData.relevance);
  // console.log(langData.secondBest?.language, langData.secondBest?.relevance);

  if (lang === "matlab") return "octave";
  if (langData.relevance <= 3) return "markdown";
  return lang;
}

export function guessProgrammingLanguage(value: string) {
  const languages = hljs.listLanguages();
  console.log(languages.length);

  const match = languages.filter(hljs.getLanguage).reduce(
    (previous, next) => {
      const current = hljs.highlight(next, value, false);
      const language = next;

      if (
        current.relevance > previous.relevance &&
        !["clean", "properties"].includes(language)
      ) {
        return { ...current, language };
      }

      return previous;
    },
    { relevance: 0, language: "markdown" },
  );

  return match;
}
