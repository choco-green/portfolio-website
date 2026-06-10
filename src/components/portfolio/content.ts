import { Code2, FileText, Mail, Network } from "lucide-react";
import { localizedResumeDownloadHref } from "./resume";
import type { ContactAction, ExperienceEntry, Language, NavItem, Project, SkillGroup } from "./types";

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home", aliases: ["start", "top", "intro"] },
  { id: "experience-clinify", label: "Experience", href: "#experience-clinify", aliases: ["work", "career", "timeline"] },
  { id: "projects", label: "Projects", href: "#projects", aliases: ["personal", "github", "repos"] },
  { id: "skills", label: "Skills", href: "#skills", aliases: ["tech", "stack", "tools"] },
  { id: "languages", label: "Languages", href: "#languages", aliases: ["spoken", "communication"] },
  { id: "soft-skills", label: "Soft Skills", href: "#soft-skills", aliases: ["collaboration", "team"] },
  { id: "contact", label: "Contact me", href: "#contact", aliases: ["resume", "email", "hire"] }
];

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "experience-clinify",
    title: "Clinify",
    role: "Full-stack engineer",
    period: "Mar 2024 - Mar 2025",
    logo: "/assets/logos/clinify.svg",
    logoAlt: "Clinify logo",
    accent: "rgba(21, 132, 88, 0.18)",
    theme: {
      accent: "#ffffff",
      background: "#3cc8a1",
      backgroundSoft: "#8be8cc",
      cardNumber: "#18181b",
      ink: "#18181b",
      line: "#ffffff",
      muted: "#18181b"
    },
    summary:
      "Full-stack role building production UKMLA medical education features with Next.js, React, TypeScript, Supabase, and OpenAI API integrations.",
    outcomes: [
      "Implemented a production OSCE AI simulation bot with text-to-speech and speech-to-text workflows for patient-scenario practice.",
      "Built gamified SBA and SAQ interfaces for practice and exam modes using Next.js, React, TypeScript, Chakra UI, Supabase, and OpenAI API integrations.",
      "Ran a 100-user closed beta, synthesized user feedback into prioritized product requirements, and supplied roadmap recommendations to the CEO.",
      "Maintained centralized product and technical documentation for a 5-person team, keeping implementation context, handoff assets, and product decisions aligned."
    ],
    evidence: [
      {
        label: "Clinify handoff",
        src: "/assets/images/clinify/handoff.webp",
        alt: "Clinify handoff screenshot",
        width: 3156,
        height: 2294
      },
      {
        label: "Clinify design system",
        src: "/assets/images/clinify/design_system.webp",
        alt: "Clinify design system screenshot",
        width: 1215,
        height: 622
      },
      {
        label: "Clinify product flow",
        src: "/assets/images/clinify/product_flow.webp",
        alt: "Clinify product flow screenshot",
        width: 8595,
        height: 11187
      },
      {
        label: "Clinify documentation",
        src: "/assets/images/clinify/documentation.webp",
        alt: "Clinify documentation screenshot",
        width: 4112,
        height: 2354
      }
    ]
  },
  {
    id: "experience-ibm-cic-hackathon",
    title: "IBM CIC Hackathon",
    role: "Finalist",
    period: "Feb 2024",
    logo: "/assets/logos/ibm.svg",
    logoAlt: "IBM logo",
    accent: "rgba(55, 83, 159, 0.18)",
    theme: {
      accent: "#ffffff",
      background: "#1f70c1",
      backgroundSoft: "#74b7f2",
      cardNumber: "#1f70c1",
      ink: "#ffffff",
      line: "#b7d7ff",
      muted: "#ffffff"
    },
    summary:
      "Hackathon finalist project with a full frontend build and API-backed proof of concept for peer-to-peer skill sharing and event management.",
    outcomes: [
      "Built the full frontend for a peer-to-peer skill-sharing and event-management proof of concept in a 48-hour IBM CIC Innovation Hackathon.",
      "Reached finalist status among 15 teams by shipping a demoable workflow for skill-sharing sessions, workshops, study groups, and event management.",
      "Presented the user problem, product workflow, API-backed implementation path, and technical artefacts through a structured final demo."
    ],
    evidence: [
      {
        label: "IBM Artefact showcase",
        src: "/assets/images/ibm/artefact_showcase.webp",
        alt: "IBM CIC Hackathon Artefact showcase screenshot",
        width: 4112,
        height: 2400
      }
    ]
  },
  {
    id: "experience-university-of-leicester",
    title: "University of Leicester",
    role: "BSc Computer Science",
    period: "Sep 2023 - Jun 2026",
    logo: "/assets/logos/university-of-leicester.svg",
    logoAlt: "University of Leicester shield",
    accent: "rgba(186, 122, 22, 0.18)",
    theme: {
      accent: "#ffffff",
      background: "#d50032",
      backgroundSoft: "#f05b75",
      cardNumber: "#d50032",
      ink: "#ffffff",
      line: "#ffa2b3",
      muted: "#ffffff"
    },
    summary:
      "BSc Computer Science work with First Class Honours, grounding typed programming, algorithms, databases, and practical software engineering.",
    outcomes: [
      "Built the foundation for typed programming, algorithms, databases, and software engineering practice.",
      "Connected academic work with Rust systems programming, accessible web interfaces, product implementation, and data-backed experimentation."
    ],
    evidence: []
  },
  {
    id: "experience-dmginc",
    title: "Damage Inc",
    role: "Frontend engineer - gaming community platform",
    period: "Jan 2023 - Nov 2023",
    logo: "/assets/logos/dmginc.svg",
    logoAlt: "DmgInc logo",
    accent: "rgba(103, 68, 169, 0.16)",
    theme: {
      accent: "#b64240",
      background: "#191919",
      backgroundSoft: "#343434",
      cardNumber: "#ffffff",
      ink: "#dddddd",
      line: "#5a5a5a",
      muted: "#c8c8c8"
    },
    summary:
      "Frontend role designing and building React and TypeScript interfaces for an 80k-user gaming community platform with event, REP economy, and admin workflows.",
    outcomes: [
      "Architected and built a React/TypeScript RPG-style crafting and REP economy interface for an 80k-user gaming community platform.",
      "Designed and shipped a responsive React events page from Figma designs while maintaining cross-browser compatibility.",
      "Rebuilt a responsive Admin Control Panel from a legacy PHP system for ~500 admins managing recurring community workflows."
    ],
    evidence: [
      {
        label: "DmgInc crafting system",
        src: "/assets/images/dmginc/crafting_system.webp",
        alt: "DmgInc crafting system screenshot",
        width: 1024,
        height: 759
      },
      {
        label: "DmgInc mobile first accessibility",
        src: "/assets/images/dmginc/mobile_first_accessibility_design.webp",
        alt: "DmgInc mobile first accessibility screenshot",
        width: 1523,
        height: 471
      },
      {
        label: "DmgInc Final ACP design",
        src: "/assets/images/dmginc/final_acp_design.webp",
        alt: "DmgInc Final ACP design screenshot",
        width: 960,
        height: 540
      }
    ]
  }
];

export const projects: Project[] = [
  {
    order: 1,
    title: "Rust Traffic Simulator",
    summary:
      "A Rust microscopic motorway traffic simulator with tests, benchmarks, visual output, lane changes, ramp metering, emissions, deterministic modelling, and repeatable analytics.",
    screenshot: {
      label: "Traffic simulator GUI overview",
      src: "/assets/images/projects/microscopic-traffic-simulator-gui-overview.webp",
      alt: "Microscopic Traffic Simulator GUI overview screenshot from the GitHub README",
      width: 2168,
      height: 1402
    },
    tags: ["Rust", "Simulation", "Systems"],
    url: "https://github.com/choco-green/Microscopic-Traffic-Simulator"
  },
  {
    order: 2,
    title: "UniSkill",
    summary:
      "Finalist project from 15 teams at the IBM CIC Innovation Hackathon: an API-backed peer-to-peer skill-sharing and event-management platform with a full frontend built in 48 hours.",
    screenshot: {
      label: "UniSkill calendar interface",
      src: "/assets/images/projects/uniskill-calendar-interface.webp",
      alt: "UniSkill calendar interface screenshot from the GitHub README",
      width: 4112,
      height: 2400
    },
    tags: ["TypeScript", "Product", "Hackathon"],
    url: "https://github.com/choco-green/UniSkill"
  },
  {
    order: 4,
    title: "EPQ",
    summary:
      "A* EPQ artefact: a TensorFlow/Keras image-classification notebook using transfer learning with InceptionResNetV2 to classify cats and dogs, with retained training outputs and research context.",
    tags: ["Python", "Machine Learning", "Research"],
    url: "https://github.com/choco-green/EPQ"
  },
  {
    order: 5,
    title: "Brainfuck Interpreter",
    summary:
      "A Brainfuck interpreter written in Rust, featuring tokenisation, parsing, loop handling, file execution, and a 1GB memory tape for running Brainfuck programs from the command line.",
    tags: ["Parsing", "Interpreter", "Language"],
    url: "https://github.com/choco-green/Brainfuck-Interpreter"
  },
  {
    order: 6,
    title: "SquareCrop",
    summary: "Browser-based React tool for cropping local images and exporting resized square JPGs entirely client-side.",
    tags: ["React", "Image Tooling", "Client UI"],
    url: "https://github.com/choco-green/SquareCrop"
  },
  {
    order: 3,
    title: "Portfolio Website",
    summary:
      "A deployed Astro/React portfolio with 100 Lighthouse scores, accessible command navigation, SEO metadata, TypeScript content models, and static checks for crawlable project evidence.",
    screenshot: {
      label: "Portfolio homepage",
      src: "/assets/images/projects/portfolio-platform-home.webp",
      alt: "Portfolio homepage screenshot showing the command navigation, hero copy, and portrait",
      width: 1403,
      height: 877
    },
    tags: ["Astro", "React", "Accessibility"],
    url: "https://github.com/choco-green/portfolio-website"
  }
].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "Astro",
      "Vite",
      "Chakra UI",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Accessibility",
      "Responsive UI",
      "Cross-browser compatibility"
    ]
  },
  {
    title: "Backend and APIs",
    items: ["Node.js", "NestJS", "Express", "Flask", "Spring Boot", "RESTful APIs", "OpenAI API", "Authentication", "Authorization", "Security"]
  },
  {
    title: "Testing and Quality",
    items: ["Unit testing", "Integration testing", "Jest", "Vitest", "Playwright", "Code review", "CI/CD"]
  },
  {
    title: "Data and Systems",
    items: ["SQL", "Postgres", "Supabase", "Prisma", "Redis", "Database schema design", "Query optimisation", "Data structures", "Algorithms", "Object-oriented programming", "System design"]
  },
  {
    title: "Cloud and Delivery",
    items: ["Git", "GitHub", "Linux", "Docker", "GitHub Actions", "Deployment", "Observability", "Logging", "AWS", "Azure", "GCP", "DigitalOcean"]
  },
  {
    title: "Programming Languages",
    items: ["TypeScript", "JavaScript", "Rust", "Java", "Python", "SQL"]
  }
];

export const languages: Language[] = [
  { name: "English", level: "Fluent professional communication" },
  { name: "Chinese", level: "Fluent professional communication" },
  { name: "German", level: "A1 level, learning" }
];

export const softSkills = [
  "Scopes ambiguous product requirements into implementation plans that can be built, reviewed, and tested.",
  "Documents product-flow and design-system decisions so implementation work has stable context.",
  "Balances responsive UI detail with maintainable React/TypeScript structures and testable behavior.",
  "Communicates tradeoffs directly when scope, quality, or evidence is at risk."
];

export const contactSocialActions: ContactAction[] = [
  {
    label: "Email",
    detail: "justin--fung@outlook.com",
    href: "mailto:justin--fung@outlook.com",
    icon: Mail
  },
  {
    label: "GitHub",
    detail: "github.com/choco-green",
    href: "https://github.com/choco-green",
    icon: Code2,
    rel: "me"
  },
  {
    label: "LinkedIn",
    detail: "linkedin.com/in/justin-fung-nsb",
    href: "https://www.linkedin.com/in/justin-fung-nsb",
    icon: Network,
    rel: "me"
  }
];

export const resumeAction: ContactAction = {
  label: "Resume",
  detail: "Download Justin Fung resume PDF",
  href: localizedResumeDownloadHref,
  icon: FileText
};

export const contactActions: ContactAction[] = [...contactSocialActions, resumeAction];
