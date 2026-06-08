import Card from "../atoms/Card";
import type { SkillGroup } from "../types";

type SkillGroupCardProps = {
  group: SkillGroup;
};

export default function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <Card key={group.title} tone="raised">
      <h3 className="text-lg font-black">{group.title}</h3>
      <ul className="mt-4 space-y-2">
        {group.items.map((item) => (
          <li key={item} className="rounded-md bg-canvas px-3 py-2 text-sm font-semibold text-muted">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
