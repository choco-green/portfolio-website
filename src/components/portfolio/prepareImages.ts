import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import { experienceEntries, projects } from "./content";
import type { EvidenceItem, PreparedExperienceEntry, PreparedProject, ResponsiveImage } from "./types";

type ImageProfile = {
  sizes: string;
  width: number;
  widths: number[];
  quality: "mid" | "high";
};

const imageModules = import.meta.glob<ImageMetadata>("../../assets/images/**/*.webp", {
  eager: true,
  import: "default"
});

const publicImagePrefix = "/assets/images/";

function assertPublicImagePath(src: string) {
  if (!src.startsWith(publicImagePrefix)) {
    throw new Error(`Portfolio image paths must start with ${publicImagePrefix}: ${src}`);
  }
}

function assetKeyFromPublicPath(src: string) {
  assertPublicImagePath(src);
  return `../../assets/images/${src.slice(publicImagePrefix.length)}`;
}

function resolveImage(src: string) {
  const key = assetKeyFromPublicPath(src);
  const image = imageModules[key];

  if (!image) {
    throw new Error(`Missing portfolio image asset for ${src}. Expected ${key}.`);
  }

  return image;
}

function numberAttribute(value: unknown, fallback: number) {
  const parsed = typeof value === "string" || typeof value === "number" ? Number(value) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function uniqueWidths(widths: number[], maxWidth: number) {
  const bounded = widths.filter((width) => width <= maxWidth);
  const withFallback = bounded.includes(maxWidth) ? bounded : [...bounded, maxWidth];

  return [...new Set(withFallback)].sort((a, b) => a - b);
}

async function buildResponsiveImage(src: string, profile: ImageProfile): Promise<ResponsiveImage> {
  const source = resolveImage(src);
  const width = Math.min(source.width, profile.width);
  const widths = uniqueWidths(profile.widths, width);
  const result = await getImage({
    src: source,
    width,
    widths,
    sizes: profile.sizes,
    format: "webp",
    quality: profile.quality
  });

  return {
    src: result.src,
    srcSet: result.srcSet.attribute,
    sizes: profile.sizes,
    width: numberAttribute(result.attributes.width, width),
    height: numberAttribute(result.attributes.height, Math.round(width / (source.width / source.height)))
  };
}

function validateAuthoredDimensions(item: EvidenceItem) {
  const source = resolveImage(item.src);

  if (source.width !== item.width || source.height !== item.height) {
    throw new Error(
      `Authored dimensions for ${item.src} are ${item.width}x${item.height}, but the asset is ${source.width}x${source.height}.`
    );
  }
}

const heroProfile: ImageProfile = {
  width: 896,
  widths: [176, 240, 288, 352, 448, 672, 896],
  sizes: "(min-width: 1024px) 28rem, (min-width: 768px) 18rem, (min-width: 640px) 15rem, 11rem",
  quality: "high"
};

const evidencePreviewProfile: ImageProfile = {
  width: 704,
  widths: [288, 352, 432, 576, 704],
  sizes: "(min-width: 640px) 22rem, 18rem",
  quality: "mid"
};

const evidenceViewerProfile: ImageProfile = {
  width: 2560,
  widths: [720, 1080, 1440, 1920, 2560],
  sizes: "100vw",
  quality: "high"
};

const projectPreviewProfile: ImageProfile = {
  width: 960,
  widths: [320, 480, 640, 800, 960],
  sizes: "(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw",
  quality: "mid"
};

async function prepareEvidence(item: EvidenceItem) {
  validateAuthoredDimensions(item);

  const [previewImage, viewerImage] = await Promise.all([
    buildResponsiveImage(item.src, evidencePreviewProfile),
    buildResponsiveImage(item.src, evidenceViewerProfile)
  ]);

  return {
    label: item.label,
    alt: item.alt,
    previewImage,
    viewerImage
  };
}

async function prepareProject(project: (typeof projects)[number]): Promise<PreparedProject> {
  if (!project.screenshot) {
    const { screenshot: _screenshot, ...projectWithoutScreenshot } = project;
    return projectWithoutScreenshot;
  }

  validateAuthoredDimensions(project.screenshot);

  return {
    ...project,
    screenshot: {
      label: project.screenshot.label,
      alt: project.screenshot.alt,
      previewImage: await buildResponsiveImage(project.screenshot.src, projectPreviewProfile)
    }
  };
}

export async function preparePortfolioImages() {
  const [heroPortrait, preparedExperienceEntries, preparedProjects] = await Promise.all([
    buildResponsiveImage("/assets/images/hero-portrait.webp", heroProfile),
    Promise.all(
      experienceEntries.map(async (entry): Promise<PreparedExperienceEntry> => ({
        ...entry,
        evidence: await Promise.all(entry.evidence.map(prepareEvidence))
      }))
    ),
    Promise.all(projects.map(prepareProject))
  ]);

  return {
    heroPortrait,
    experienceEntries: preparedExperienceEntries,
    projects: preparedProjects
  };
}
