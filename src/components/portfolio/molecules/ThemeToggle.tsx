import { Moon, Sun } from "lucide-react";
import IconButton from "../atoms/IconButton";
import { useThemePreference } from "../../../hooks/useThemePreference";

type ThemeToggleProps = {
  className?: string;
  testId?: string;
};

export default function ThemeToggle({ className = "", testId }: ThemeToggleProps) {
  const { resolvedTheme, manualTheme, toggleTheme } = useThemePreference();
  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";
  const Icon = isDark ? Sun : Moon;

  return (
    <IconButton
      ariaLabel={label}
      title={manualTheme ? `${label}. Manual preference is active.` : `${label}. Following system preference.`}
      testId={testId}
      onClick={toggleTheme}
      className={className}
    >
      <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
    </IconButton>
  );
}
