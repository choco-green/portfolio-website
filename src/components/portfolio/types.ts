import type { LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  aliases: string[];
};

export type EvidenceItem = {
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ResponsiveImage = {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
};

export type PreparedEvidenceItem = Omit<EvidenceItem, "src" | "width" | "height"> & {
  previewImage: ResponsiveImage;
  viewerImage: ResponsiveImage;
};

export type ExperienceTheme = {
  accent: string;
  background: string;
  backgroundSoft: string;
  cardNumber: string;
  ink: string;
  line: string;
  muted: string;
};

export type ExperienceEntry = {
  id: string;
  title: string;
  role: string;
  period: string;
  logo: string;
  logoAlt: string;
  accent: string;
  theme: ExperienceTheme;
  summary: string;
  outcomes: string[];
  evidence: EvidenceItem[];
};

export type PreparedExperienceEntry = Omit<ExperienceEntry, "evidence"> & {
  evidence: PreparedEvidenceItem[];
};

export type Project = {
  order: number;
  title: string;
  summary: string;
  screenshot?: EvidenceItem;
  tags: string[];
  url: string;
};

export type PreparedProject = Omit<Project, "screenshot"> & {
  screenshot?: Omit<EvidenceItem, "src" | "width" | "height"> & {
    previewImage: ResponsiveImage;
  };
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Language = {
  name: string;
  level: string;
};

export type ContactAction = {
  label: string;
  detail: string;
  href: string;
  icon: LucideIcon;
  rel?: string;
};
