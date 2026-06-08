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
    role: "Fullstack engineer",
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
      "Full-stack role leading UI/UX, closed-beta feedback, and documentation for a gamified medical education platform.",
    outcomes: [
      "Led the UI/UX team, overseeing the design of all user interfaces to ensure seamless user experiences across the product and apply the core concept of gamification in medical education",
      "Led a closed beta with 100 users, gathering product feedback that informed feature prioritization and roadmap planning alongside the CEO.",
      "Designed and implemented a comprehensive documentation system, reducing onboarding time and providing an accessible reference hub for ongoing systems."
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
    period: "2024",
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
      "Hackathon finalist project shaped, built, and presented as a practical proof of concept within a 48-hour team sprint.",
    outcomes: [
      "Shaped a clear and compelling product narrative within the constraints of a 48-hour hackathon format.",
      "Built and demonstrated a practical proof of concept under tight time and resource constraints in a team of 2.",
      "Delivered a structured final presentation supported by a clear product demo."
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
      "Connected academic work with practical portfolio projects and product implementation.",
    ],
    evidence: []
  },
  {
    id: "experience-dmginc",
    title: "DmgInc",
    role: "Frontend engineer - RPG crafting experience",
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
      "Frontend role designing and building React and TypeScript RPG systems, responsive event pages, and admin tooling with measurable product gains.",
    outcomes: [
      "Architected, designed, and developed a complex crafting system for an RPG feature using Figma, TypeScript, and React, increasing retention by 5%.",
      "Designed and developed a responsive events page using Figma and React, ensuring cross-browser compatibility and boosting mobile engagement by 15%.",
      "Designed and developed a responsive Admin Control Panel (ACP) for admin management using Figma and React, improving administrative efficiency."
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
      "A Rust-based microscopic traffic simulator for modelling motorway flow, lane changes, ramp metering, emissions, and repeatable traffic analytics.",
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
      "🏆 Finalist project from the IBM CIC Innovation Hackathon. UniSkill is a platform that connects university students through skill-sharing sessions, workshops, study groups, and event management, making peer-to-peer learning more accessible and collaborative.",
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
      "EPQ A* artefact: a TensorFlow/Keras image-classification notebook using transfer learning with InceptionResNetV2 to classify cats and dogs, including retained training outputs and project context.",
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
    summary: "Browser-based React app for cropping local images and exporting resized square JPGs.",
    tags: ["React", "Canvas", "Client UI"],
    url: "https://github.com/choco-green/SquareCrop"
  },
  {
    order: 3,
    title: "Portfolio Website",
    summary:
      "An Astro and React portfolio website with accessible command navigation, semantic content sections, SEO metadata, JSON-LD, and static checks for crawlable project evidence.",
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
      "Tailwind CSS",
      "Responsive UI",
      "Accessibility",
      "Figma",
      "Testing"
    ]
  },
  {
    title: "Backend",
    items: ["Node.js", "NestJS", "REST APIs", "API design", "Express", "Flask", "Docker", "Server-side rendering", "Spring Boot"]
  },
  {
    title: "Cloud",
    items: ["GCP", "Azure", "AWS", "Static deployment", "CI workflows", "GitHub Actions", "DigitalOcean", "Release automation"]
  },
  {
    title: "Databases",
    items: ["Postgres", "Schema design", "Query planning", "Migrations", "Supabase", "Prisma", "Redis"]
  },
  {
    title: "Programming Languages",
    items: ["TypeScript", "JavaScript", "Rust", "Java", "Python"]
  }
];

export const languages: Language[] = [
  { name: "English", level: "Fluent professional communication" },
  { name: "Chinese", level: "Fluent professional communication" },
  { name: "German", level: "A1 level, learning" }
];

export const softSkills = [
  "Turns ambiguous product ideas into scoped implementation plans.",
  "Documents interface decisions so handoff work is easy to review.",
  "Balances polished UI details with backend reliability and test coverage.",
  "Communicates tradeoffs directly when scope, quality, or evidence is at risk."
];

export const contactActions: ContactAction[] = [
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
    icon: Code2
  },
  {
    label: "LinkedIn",
    detail: "linkedin.com/in/justin-fung-nsb",
    href: "https://www.linkedin.com/in/justin-fung-nsb",
    icon: Network
  },
  {
    label: "Resume",
    detail: "Download Justin Fung resume PDF",
    href: localizedResumeDownloadHref,
    icon: FileText
  }
];
