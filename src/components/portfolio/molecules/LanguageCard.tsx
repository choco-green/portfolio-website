import Card from "../atoms/Card";
import type { Language } from "../types";

type LanguageCardProps = {
  language: Language;
};

export default function LanguageCard({ language }: LanguageCardProps) {
  return (
    <Card key={language.name} tone="raised">
      <h3 className="text-lg font-black">{language.name}</h3>
      <p className="mt-2 text-sm font-semibold text-muted">{language.level}</p>
    </Card>
  );
}
