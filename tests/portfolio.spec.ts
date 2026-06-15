import { expect, test, type Locator, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

async function waitForIslandHydration(page: Page, componentName: string) {
  await page.waitForFunction(
    (name) =>
      Array.from(document.querySelectorAll("astro-island")).some(
        (island) => island.getAttribute("component-url")?.includes(name) && !island.hasAttribute("ssr")
      ),
    componentName
  );
}

async function waitForNavigationHydration(page: Page) {
  await waitForIslandHydration(page, "Navigation");
}

async function waitForTimelineHydration(page: Page) {
  await waitForIslandHydration(page, "ExperienceTimeline");
}

async function expectResponsiveImage(locator: Locator, sizesPattern: RegExp) {
  await expect(locator).toHaveAttribute("srcset", /webp/);
  await expect(locator).toHaveAttribute("sizes", sizesPattern);
  await expect(locator).not.toHaveAttribute("src", /\/assets\/images\//);
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));

  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function invokeResumeDownload(country?: string) {
  const { onRequest } = await import("../functions/resume/download.js");
  const originalFetch = globalThis.fetch;
  const fetchedUrls: string[] = [];

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    fetchedUrls.push(input instanceof Request ? input.url : input.toString());

    return new Response("pdf", {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/pdf"
      }
    });
  }) as typeof fetch;

  try {
    const request = new Request("https://justinfung.com/resume/download", {
      headers: country ? { "CF-IPCountry": country } : undefined
    });

    if (country) {
      Object.defineProperty(request, "cf", {
        value: { country }
      });
    }

    return {
      fetchedUrls,
      response: await onRequest({ request })
    };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function invokeAgentDiscoveryMiddleware(accept: string, url = "https://justinfung.com/") {
  const { onRequest } = await import("../functions/_middleware.js");

  return onRequest({
    request: new Request(url, {
      headers: {
        Accept: accept
      }
    }),
    next: async () =>
      new Response("<!doctype html><title>Justin Fung</title>", {
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      })
  });
}

test("optimized raster images render with responsive attributes", async ({ page }) => {
  await page.goto("/");

  const heroImage = page.getByAltText("Portrait of Justin Fung");
  await expectResponsiveImage(heroImage, /28rem/);
  await expect(heroImage).toHaveAttribute("fetchpriority", "high");

  await expectResponsiveImage(page.getByAltText("Clinify handoff screenshot"), /22rem/);
  await expectResponsiveImage(page.getByAltText("Microscopic Traffic Simulator GUI overview screenshot from the GitHub README"), /31vw/);
});

test("first viewport renders crawlable identity content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Justin Fung" })).toBeVisible();
  await expect(page.getByAltText("Portrait of Justin Fung")).toBeVisible();
  await expect(page.getByText("I build polished web products with robust backend systems, with a keen eye for UI/UX.")).toBeVisible();
  await expect(page.locator("#home").getByRole("link", { name: "Download Resume", exact: true })).toHaveAttribute("href", "/resume/download");
  await expect(page.locator("#home").getByLabel("Hiring-signal skills")).toHaveCount(0);
  await expect(page.locator("#home").getByRole("link", { name: "View All Skills", exact: true })).toHaveCount(0);
  await expect(page.locator("#home").getByText("Full-stack engineer", { exact: true })).toBeVisible();
});

test("homepage publishes canonical search identity metadata", async ({ page }) => {
  await page.goto("/");

  const description =
    "Justin Fung is a full-stack engineer building React, TypeScript, Node.js, and Rust products across healthcare, education, and developer tools.";

  expect(description.length).toBeLessThanOrEqual(160);
  await expect(page).toHaveTitle("Justin Fung | Full-Stack Engineer");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
  await expect(page.locator('meta[name="author"]')).toHaveAttribute("content", "Justin Fung");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://justinfung.com/");
  await expect(page.locator('link[rel="me"][href="https://github.com/choco-green"]')).toHaveCount(1);
  await expect(page.locator('link[rel="me"][href="https://www.linkedin.com/in/justin-fung-nsb"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "profile");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Justin Fung | Full-Stack Engineer");
  await expect(page.locator('meta[property="profile:first_name"]')).toHaveAttribute("content", "Justin");
  await expect(page.locator('meta[property="profile:last_name"]')).toHaveAttribute("content", "Fung");
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", description);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", /^https:\/\/justinfung\.com\/_(?:astro|image)(?:\/|\?)/);
  await expect(page.locator("script").evaluateAll((scripts) => scripts.some((script) => script.textContent?.includes("navigator.modelContext")))).resolves.toBe(true);

  const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
  const schema = JSON.parse(structuredData ?? "{}") as {
    "@graph": Array<Record<string, unknown>>;
  };
  const person = schema["@graph"].find((node) => node["@type"] === "Person");
  const profilePage = schema["@graph"].find((node) => node["@type"] === "ProfilePage");
  const website = schema["@graph"].find((node) => node["@type"] === "WebSite");

  expect(person).toEqual(
    expect.objectContaining({
      "@id": "https://justinfung.com/#person",
      name: "Justin Fung",
      url: "https://justinfung.com/",
      jobTitle: "Full-stack engineer",
      sameAs: ["https://github.com/choco-green", "https://www.linkedin.com/in/justin-fung-nsb"]
    })
  );
  expect(profilePage).toEqual(
    expect.objectContaining({
      "@id": "https://justinfung.com/#profile",
      about: { "@id": "https://justinfung.com/#person" },
      mainEntity: expect.objectContaining({
        "@id": "https://justinfung.com/#person",
        "@type": "Person",
        name: "Justin Fung"
      })
    })
  );
  expect(website).toEqual(
    expect.objectContaining({
      "@id": "https://justinfung.com/#website",
      publisher: { "@id": "https://justinfung.com/#person" }
    })
  );
});

test("homepage exposes crawlable internal portfolio resource links", async ({ page }) => {
  await page.goto("/");

  const resources = page.locator('footer[aria-labelledby="portfolio-resources-heading"]');
  await expect(resources.getByRole("heading", { name: "Portfolio resources" })).toBeVisible();
  await expect(resources.getByRole("link")).toHaveCount(6);
  await expect(resources.getByRole("link", { name: "API Docs" })).toHaveAttribute("href", "/docs/api/");
  await expect(resources.getByRole("link", { name: "OpenAPI" })).toHaveAttribute("href", "/openapi.json");
  await expect(resources.getByRole("link", { name: "Health" })).toHaveAttribute("href", "/health.json");
  await expect(resources.getByRole("link", { name: "Authentication" })).toHaveAttribute("href", "/auth.md");
  await expect(resources.getByRole("link", { name: "Agent Skills" })).toHaveAttribute("href", "/.well-known/agent-skills/index.json");
  await expect(resources.getByRole("link", { name: "Sitemap" })).toHaveAttribute("href", "/sitemap.xml");
});

test("Cloudflare middleware redirects www host to the canonical host", async () => {
  const response = await invokeAgentDiscoveryMiddleware("text/html", "https://www.justinfung.com/docs/api/?ref=seo");

  expect(response.status).toBe(301);
  expect(response.headers.get("Location")).toBe("https://justinfung.com/docs/api/?ref=seo");
});

test("Cloudflare middleware advertises agent discovery links on homepage responses", async () => {
  const response = await invokeAgentDiscoveryMiddleware("text/html");

  expect(response.headers.get("Content-Type")).toContain("text/html");
  expect(response.headers.get("Vary")).toContain("Accept");
  expect(response.headers.get("Link")).toContain('</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"');
  expect(response.headers.get("Link")).toContain('</docs/api/>; rel="service-doc"; type="text/html"');
  expect(response.headers.get("Link")).toContain('</auth.md>; rel="service-doc"; type="text/markdown"');
  expect(response.headers.get("Link")).toContain('</.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json"');
  expect(await response.text()).toContain("Justin Fung");
});

test("Cloudflare middleware returns Markdown for agents that request it", async () => {
  const response = await invokeAgentDiscoveryMiddleware("text/markdown, text/html;q=0.5");

  expect(response.headers.get("Content-Type")).toContain("text/markdown");
  expect(Number(response.headers.get("x-markdown-tokens"))).toBeGreaterThan(0);
  expect(response.headers.get("Link")).toContain('rel="api-catalog"');
  await expect(response.text()).resolves.toContain("# Justin Fung");
});

test("agent discovery endpoints publish machine-readable resources", async ({ request }) => {
  const catalogResponse = await request.get("/.well-known/api-catalog");
  expect(catalogResponse.ok()).toBe(true);
  expect(catalogResponse.headers()["content-type"]).toContain("application/linkset+json");

  const catalog = (await catalogResponse.json()) as {
    linkset: Array<Record<string, Array<Record<string, string>> | string>>;
  };

  expect(catalog.linkset).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        anchor: "https://justinfung.com/",
        "service-desc": [expect.objectContaining({ href: "https://justinfung.com/openapi.json" })],
        "service-doc": [expect.objectContaining({ href: "https://justinfung.com/docs/api/" })],
        status: [expect.objectContaining({ href: "https://justinfung.com/health.json" })]
      })
    ])
  );

  const openApiResponse = await request.get("/openapi.json");
  expect(openApiResponse.ok()).toBe(true);
  expect(openApiResponse.headers()["content-type"]).toContain("application/vnd.oai.openapi+json");
  await expect(openApiResponse.json()).resolves.toEqual(
    expect.objectContaining({
      openapi: "3.1.0",
      paths: expect.objectContaining({
        "/resume/download": expect.any(Object)
      })
    })
  );

  const authResponse = await request.get("/auth.md");
  expect(authResponse.ok()).toBe(true);
  expect(authResponse.headers()["content-type"]).toContain("text/markdown");
  await expect(authResponse.text()).resolves.toContain("No OAuth registration is required");

  const serverCardResponse = await request.get("/.well-known/mcp/server-card.json");
  expect(serverCardResponse.ok()).toBe(true);
  await expect(serverCardResponse.json()).resolves.toEqual(
    expect.objectContaining({
      serverInfo: expect.objectContaining({
        name: "Justin Fung Portfolio"
      }),
      transports: expect.arrayContaining([expect.objectContaining({ type: "webmcp" })])
    })
  );
});

test("agent skills index includes valid SHA-256 digests for published skills", async ({ request }) => {
  const response = await request.get("/.well-known/agent-skills/index.json");
  expect(response.ok()).toBe(true);

  const index = (await response.json()) as {
    "$schema": string;
    skills: Array<{
      name: string;
      type: string;
      description: string;
      url: string;
      sha256: string;
    }>;
  };

  expect(index["$schema"]).toContain("agent-skills-discovery-v0.2.0");
  expect(index.skills).toHaveLength(3);

  for (const skill of index.skills) {
    expect(skill).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        type: "markdown",
        description: expect.any(String),
        url: expect.stringMatching(/^https:\/\/justinfung\.com\/\.well-known\/agent-skills\/.+\.md$/),
        sha256: expect.stringMatching(/^[a-f0-9]{64}$/)
      })
    );

    const skillPath = new URL(skill.url).pathname;
    const skillResponse = await request.get(skillPath);
    expect(skillResponse.ok()).toBe(true);

    const digest = await sha256Hex(await skillResponse.text());
    expect(digest).toBe(skill.sha256);
  }
});

test("DNS-AID zone records publish the organization agent index", async () => {
  const zone = await readFile(new URL("../dns/dns-aid.zone", import.meta.url), "utf8");

  expect(zone).toContain("_index._agents.justinfung.com. 3600 IN SVCB 1 justinfung.com.");
  expect(zone).toContain("_index._agents.justinfung.com. 3600 IN HTTPS 1 justinfung.com.");
  expect(zone).toContain("mandatory=alpn,port");
  expect(zone).toContain("alpn=h2");
  expect(zone).toContain("port=443");
  expect(zone).toContain('key65280="/.well-known/agent-skills/index.json"');
});

test("robots.txt declares AI content usage preferences", async ({ request }) => {
  const response = await request.get("/robots.txt");

  expect(response.ok()).toBe(true);
  await expect(response.text()).resolves.toContain("Content-Signal: ai-train=no, search=yes, ai-input=no");
});

test("desktop Command Navigation filters aliases and activates suggestions", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 850 });
  await page.goto("/");
  await waitForNavigationHydration(page);

  const input = page.getByTestId("command-input");
  await input.click();
  await expect(page.getByLabel("Command Navigation suggestions")).toBeVisible();
  await input.fill("work");
  await expect(page.getByLabel("Command Navigation suggestions").getByRole("button", { name: "Experience", exact: true })).toBeVisible();
  await input.press("Enter");
  await expect(page).toHaveURL(/#experience-clinify$/);

  await input.fill("tech");
  await page.getByRole("button", { name: /Skills/ }).click();
  await expect(page).toHaveURL(/#skills$/);
});

test("desktop navigation uses terminal prompt before the command search", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 850 });
  await page.goto("/#projects");
  await waitForNavigationHydration(page);

  await expect(page.getByTestId("desktop-nav-prompt")).toBeVisible();
  await expect(page.getByTestId("desktop-nav-prompt")).toHaveText("justin-fung@portfolio ~$ Projects");
  await expect(page.getByTestId("command-control")).toHaveText(">");
  await expect(page.locator('form:has([data-testid="command-input"]) svg')).toHaveCount(0);
  await page.getByTestId("command-input").click();
  await expect(page.getByLabel("Command Navigation suggestions").getByRole("button", { name: "Projects", exact: true })).toBeVisible();
  await expect(page.locator('[aria-label="Command Navigation suggestions"] span', { hasText: "#" })).toHaveCount(0);

  const commandLayout = await page.getByTestId("command-control").evaluate((control) => {
    const controlRect = control.getBoundingClientRect();
    const navRect = control.closest("nav")?.getBoundingClientRect();

    return {
      centerOffset: Math.round(controlRect.left + controlRect.width / 2 - ((navRect?.left ?? 0) + (navRect?.width ?? 0) / 2)),
      width: Math.round(controlRect.width)
    };
  });

  expect(commandLayout.width).toBe(256);
  expect(Math.abs(commandLayout.centerOffset)).toBeLessThanOrEqual(1);
});

test("desktop navigation avoids overlap before centered search has room", async ({ page }) => {
  for (const width of [768, 820, 1024]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/#projects");
    await waitForNavigationHydration(page);

    const layout = await page.getByTestId("command-control").evaluate((control) => {
      const prompt = document.querySelector('[data-testid="desktop-nav-prompt"]');
      const toggle = document.querySelector('[data-testid="theme-toggle-desktop"]');
      const controlRect = control.getBoundingClientRect();
      const promptRect = prompt?.getBoundingClientRect();
      const toggleRect = toggle?.getBoundingClientRect();

      return {
        controlLeft: Math.round(controlRect.left),
        controlRight: Math.round(controlRect.right),
        position: getComputedStyle(control.closest("form") as HTMLElement).position,
        promptRight: Math.round(promptRect?.right ?? 0),
        toggleLeft: Math.round(toggleRect?.left ?? 0)
      };
    });

    if (width < 1024) {
      expect(layout.position).toBe("relative");
    } else {
      expect(layout.position).toBe("absolute");
    }

    expect(layout.promptRight).toBeLessThanOrEqual(layout.controlLeft);
    expect(layout.controlRight).toBeLessThanOrEqual(layout.toggleLeft);
  }
});

test("mobile menu opens, navigates, closes, and avoids narrow overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 820 });
  await page.goto("/");
  await waitForNavigationHydration(page);

  await page.getByTestId("mobile-menu-button").click();
  await expect(page.getByRole("button", { name: "Projects" })).toBeVisible();
  await page.getByRole("button", { name: "Projects" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole("button", { name: "Projects" })).toBeHidden();

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);
});

test("tablet-width navigation shows one portfolio brand", async ({ page }) => {
  await page.setViewportSize({ width: 652, height: 820 });
  await page.goto("/");

  const visibleBrands = await page.locator('header a[href="#home"]').evaluateAll((links) =>
    links
      .filter((link) => {
        const rect = link.getBoundingClientRect();
        const styles = getComputedStyle(link);
        return rect.width > 0 && rect.height > 0 && styles.visibility !== "hidden" && styles.display !== "none";
      })
      .map((link) => link.textContent?.trim())
  );

  expect(visibleBrands).toEqual(["justin-fung@portfolio"]);
});

test("mobile hero uses a compact circular portrait above the identity copy", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 820 });
  await page.goto("/");

  const frame = page.getByTestId("hero-portrait-frame");
  const heading = page.getByRole("heading", { name: "Justin Fung" });
  await expect(frame).toBeVisible();
  await expect(page.getByAltText("Portrait of Justin Fung")).toBeVisible();
  await expect(heading).toBeVisible();

  const layout = await frame.evaluate((portraitFrame) => {
    const frameRect = portraitFrame.getBoundingClientRect();
    const copyRect = document.querySelector('[data-testid="hero-copy"]')?.getBoundingClientRect();
    const headingRect = document.getElementById("hero-heading")?.getBoundingClientRect();
    const image = portraitFrame.querySelector("img");
    const frameStyles = getComputedStyle(portraitFrame);
    const imageStyles = image ? getComputedStyle(image) : null;

    return {
      borderRadius: frameStyles.borderRadius,
      copyTop: Math.round(copyRect?.top ?? 0),
      frameBottom: Math.round(frameRect.bottom),
      frameCenter: Math.round(frameRect.left + frameRect.width / 2),
      frameHeight: Math.round(frameRect.height),
      frameWidth: Math.round(frameRect.width),
      imageTransform: imageStyles?.transform,
      objectPosition: imageStyles?.objectPosition,
      headingTop: Math.round(headingRect?.top ?? 0)
    };
  });

  expect(layout.frameWidth).toBe(layout.frameHeight);
  expect(layout.borderRadius).toBe("9999px");
  expect(layout.imageTransform).toContain("1.5");
  expect(layout.objectPosition).toBe("50% 68%");
  expect(layout.copyTop - layout.frameBottom).toBeLessThanOrEqual(20);
  expect(layout.frameBottom).toBeLessThan(layout.headingTop);
  expect(Math.abs(layout.frameCenter - 160)).toBeLessThanOrEqual(1);
});

test("hero portrait frame is larger across sm, md, and lg breakpoints", async ({ page }) => {
  for (const viewport of [
    { width: 652, height: 820, expectedWidth: 240, expectedRadius: "9999px", zoomed: true },
    { width: 800, height: 820, expectedWidth: 288, expectedRadius: "9999px", zoomed: true },
    { width: 1024, height: 820, minWidth: 390, expectedRadius: "6px", zoomed: false }
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    const metrics = await page.getByTestId("hero-portrait-frame").evaluate((portraitFrame) => {
      const rect = portraitFrame.getBoundingClientRect();
      const copyRect = document.querySelector('[data-testid="hero-copy"]')?.getBoundingClientRect();
      const image = portraitFrame.querySelector("img");
      const imageStyles = image ? getComputedStyle(image) : null;

      return {
        borderRadius: getComputedStyle(portraitFrame).borderRadius,
        copyTop: Math.round(copyRect?.top ?? 0),
        frameBottom: Math.round(rect.bottom),
        imageTransform: imageStyles?.transform ?? "",
        objectPosition: imageStyles?.objectPosition ?? "",
        width: Math.round(rect.width)
      };
    });

    if ("expectedWidth" in viewport) {
      expect(metrics.width).toBe(viewport.expectedWidth);
    } else {
      expect(metrics.width).toBeGreaterThanOrEqual(viewport.minWidth);
    }
    expect(metrics.borderRadius).toBe(viewport.expectedRadius);
    if (viewport.zoomed) {
      expect(metrics.imageTransform).toContain("1.5");
      expect(metrics.objectPosition).toBe("50% 68%");
      expect(metrics.copyTop - metrics.frameBottom).toBeLessThanOrEqual(24);
    } else {
      expect(metrics.imageTransform).not.toContain("1.5");
      expect(metrics.objectPosition).toBe("50% 0%");
    }
  }
});

test("theme toggle persists after reload", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByTestId("theme-toggle-desktop");
  await toggle.click();
  const selected = await page.locator("html").getAttribute("data-theme");
  expect(selected === "dark" || selected === "light").toBe(true);

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", selected ?? "");
});

test("timeline logo frame keeps white marks visible in dark mode", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("portfolio-theme", "dark"));
  await page.goto("/#experience");

  const logoBackground = await page.getByTestId("timeline-logo-experience-clinify").evaluate((logo) => getComputedStyle(logo).backgroundColor);
  expect(logoBackground).toBe("rgb(17, 27, 24)");
});

test("Experience Timeline Theme stays with the current Experience Timeline Entry while scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#experience");
  await waitForTimelineHydration(page);

  await page.getByRole("button", { name: "View IBM CIC Hackathon Experience Timeline entry" }).click();
  await expect(page.locator("#experience")).toContainText("IBM CIC Hackathon is the current Experience Timeline entry.");

  const timeline = page.locator("#experience");
  const themeBeforeScroll = await timeline.evaluate((section) => getComputedStyle(section).getPropertyValue("--timeline-background").trim());

  await page.evaluate(() => window.scrollBy(0, 260));
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await expect(page.locator("#experience")).toContainText("IBM CIC Hackathon is the current Experience Timeline entry.");
  const themeAfterScroll = await timeline.evaluate((section) => getComputedStyle(section).getPropertyValue("--timeline-background").trim());

  expect(themeAfterScroll).toBe(themeBeforeScroll);
});

test("Experience Timeline state transitions use the agreed duration", async ({ page }) => {
  await page.goto("/#experience");
  await waitForTimelineHydration(page);

  const durationChecks = await page.locator("#experience").evaluate((section) => {
    const selectors = [":scope", ".timeline-panel", ".timeline-progress-button", ".timeline-logo-frame", ".evidence-card"];

    return selectors.map((selector) => {
      const element = selector === ":scope" ? section : section.querySelector(selector);
      return getComputedStyle(element as Element)
        .transitionDuration.split(",")
        .map((duration) => duration.trim())
        .every((duration) => duration === "0.25s");
    });
  });

  expect(durationChecks).toEqual([true, true, true, true, true]);
});

test("hero resume action uses the localized resume download endpoint", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Download Resume" })).toHaveAttribute("href", "/resume/download");
  await expect(page.getByRole("link", { name: "View All Skills" })).toHaveCount(0);
});

test("local dev server serves the resume download endpoint", async ({ request }) => {
  const response = await request.get("/resume/download");

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-disposition"]).toBe('attachment; filename="justin-fung-resume.pdf"');
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).length).toBeGreaterThan(0);
});

test("Cloudflare resume endpoint downloads the DE resume for DE visitors", async () => {
  const { fetchedUrls, response } = await invokeResumeDownload("DE");

  expect(fetchedUrls).toEqual(["https://justinfung.com/resume/justin-fung-resume-de.pdf"]);
  expect(response.headers.get("Content-Disposition")).toBe('attachment; filename="justin-fung-resume.pdf"');
  expect(response.headers.get("Content-Type")).toBe("application/pdf");
});

test("Cloudflare resume endpoint downloads the UK resume outside DE", async () => {
  const { fetchedUrls, response } = await invokeResumeDownload("GB");

  expect(fetchedUrls).toEqual(["https://justinfung.com/resume/justin-fung-resume-uk.pdf"]);
  expect(response.headers.get("Content-Disposition")).toBe('attachment; filename="justin-fung-resume.pdf"');
  expect(response.headers.get("Content-Type")).toBe("application/pdf");
});

test("timeline dots and Evidence Viewer controls work", async ({ page }) => {
  await page.goto("/#experience");
  await waitForTimelineHydration(page);

  await page.getByRole("button", { name: "View Clinify Experience Timeline entry" }).click();
  await expect(page).toHaveURL(/#experience-clinify$/);

  await page.getByRole("button", { name: "Clinify handoff" }).click();
  const dialog = page.getByRole("dialog", { name: "Clinify handoff" });
  await expect(dialog).toBeVisible();
  await expectResponsiveImage(dialog.getByAltText("Clinify handoff screenshot"), /100vw/);
  await expect(page.getByTestId("zoom-output")).toHaveText("100%");

  await page.getByRole("button", { name: "Zoom in" }).click();
  await expect(page.getByTestId("zoom-output")).toHaveText("125%");
  await page.getByRole("button", { name: "Reset to fit" }).click();
  await expect(page.getByTestId("zoom-output")).toHaveText("100%");
  await page.getByRole("button", { name: "Close Evidence Viewer" }).click();
  await expect(dialog).toBeHidden();
});

test("contact tabs, resume callout, and reduced-motion content are available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => window.localStorage.setItem("portfolio-theme", "dark"));
  await page.goto("/#contact");

  const contactTabs = page.getByTestId("contact-social-tabs");
  await expect(contactTabs.getByRole("link")).toHaveCount(2);
  await expect(contactTabs.getByRole("link", { name: /Email: justin--fung@outlook.com/ })).toHaveAttribute("href", "mailto:justin--fung@outlook.com");
  await expect(contactTabs.getByRole("link", { name: /GitHub: github.com\/choco-green/ })).toHaveAttribute("href", "https://github.com/choco-green");
  await expect(contactTabs.getByRole("link", { name: /GitHub: github.com\/choco-green/ })).toHaveAttribute("rel", "me noreferrer");
  await expect(contactTabs.getByRole("link", { name: /LinkedIn/ })).toHaveCount(0);
  await expect(contactTabs.getByText("LinkedIn", { exact: true })).toBeVisible();
  await expect(contactTabs.getByText("linkedin.com/in/justin-fung-nsb", { exact: true })).toBeVisible();
  await expect(page.getByTestId("contact-resume-callout")).toHaveAttribute("href", "/resume/download");
  await expect(page.getByTestId("contact-resume-callout")).toContainText("Download resume");
  await expect(page.getByRole("heading", { name: "Contact me" })).toBeVisible();

  const contactLayout = await page.locator("#contact").evaluate((section) => {
    const heading = section.querySelector("#contact-heading");
    const tabs = section.querySelector('[data-testid="contact-social-tabs"]');
    const callout = section.querySelector('[data-testid="contact-resume-callout"]');
    const headingRect = heading?.getBoundingClientRect();
    const tabsRect = tabs?.getBoundingClientRect();
    const calloutRect = callout?.getBoundingClientRect();

    return {
      calloutWidth: Math.round(calloutRect?.width ?? 0),
      headingBottom: Math.round(headingRect?.bottom ?? 0),
      tabsTop: Math.round(tabsRect?.top ?? 0),
      tabsWidth: Math.round(tabsRect?.width ?? 0)
    };
  });

  expect(contactLayout.tabsTop).toBeGreaterThan(contactLayout.headingBottom);
  expect(contactLayout.calloutWidth).toBe(contactLayout.tabsWidth);

  const contactBackground = await page.locator("#contact").evaluate((section) => getComputedStyle(section).backgroundColor);
  expect(contactBackground).toBe("rgb(17, 27, 24)");
});
