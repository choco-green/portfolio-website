const homepagePaths = new Set(["/", "/index.html"]);

const discoveryLinkHeader = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</docs/api>; rel="service-doc"; type="text/html"',
  '</auth.md>; rel="service-doc"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"'
].join(", ");

const homepageMarkdown = `# Justin Fung

Full-stack engineer building polished web products with robust backend systems and a keen eye for UI/UX.

## Profile

- Location: Germany
- Focus: full-stack product engineering
- Stack: React, Next.js, Astro, TypeScript, Node.js, Rust, Postgres, Docker, Playwright
- Languages: English, Chinese, German

## Experience

- Clinify: full-stack engineer building UKMLA medical education features with Next.js, React, TypeScript, Supabase, and OpenAI API integrations.
- IBM CIC Hackathon: finalist project for peer-to-peer skill sharing and event management.
- University of Leicester: BSc Computer Science.
- Damage Inc: frontend engineering for an 80k-user gaming community platform.

## Projects

- Rust Traffic Simulator: microscopic motorway traffic simulator with tests, benchmarks, visual output, emissions, and deterministic analytics.
- UniSkill: API-backed peer-to-peer skill-sharing and event-management platform built during the IBM CIC Innovation Hackathon.
- EPQ: TensorFlow/Keras image-classification notebook using transfer learning with InceptionResNetV2.
- Brainfuck Interpreter: Rust interpreter with tokenisation, parsing, loop handling, and file execution.
- SquareCrop: browser-based React image cropping and square JPG export tool.
- Portfolio Website: Astro/React portfolio with accessible command navigation, SEO metadata, TypeScript content models, and static checks.

## Contact

- Email: justin--fung@outlook.com
- GitHub: https://github.com/choco-green
- LinkedIn: https://www.linkedin.com/in/justin-fung-nsb
- Resume: https://justinfung.com/resume/download
`;

const contentTypes = new Map([
  ["/.well-known/api-catalog", 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8'],
  ["/auth.md", "text/markdown; charset=utf-8"],
  ["/openapi.json", 'application/vnd.oai.openapi+json;version=3.1; charset=utf-8'],
  ["/health.json", "application/json; charset=utf-8"],
  ["/.well-known/agent-skills/index.json", "application/json; charset=utf-8"],
  ["/.well-known/mcp/server-card.json", "application/json; charset=utf-8"]
]);

function acceptedMediaTypes(header) {
  return header
    .split(",")
    .map((part, order) => {
      const [mediaType = "", ...parameters] = part.split(";").map((value) => value.trim());
      const qParameter = parameters.find((parameter) => parameter.toLowerCase().startsWith("q="));
      const q = qParameter ? Number.parseFloat(qParameter.slice(2)) : 1;

      return {
        mediaType: mediaType.toLowerCase(),
        order,
        q: Number.isFinite(q) ? q : 0
      };
    })
    .filter((type) => type.mediaType && type.q > 0)
    .sort((a, b) => b.q - a.q || a.order - b.order);
}

function acceptsMarkdown(request) {
  const acceptHeader = request.headers.get("Accept") ?? "";
  const accepted = acceptedMediaTypes(acceptHeader);
  const markdown = accepted.find((type) => type.mediaType === "text/markdown");

  if (!markdown) {
    return false;
  }

  const htmlQuality = Math.max(
    0,
    ...accepted
      .filter((type) => type.mediaType === "text/html" || type.mediaType === "application/xhtml+xml")
      .map((type) => type.q)
  );

  return markdown.q >= htmlQuality;
}

function appendHeader(headers, name, value) {
  const existing = headers.get(name);
  headers.set(name, existing ? `${existing}, ${value}` : value);
}

function appendVary(headers, value) {
  const existing = headers.get("Vary");
  const values = new Set(
    (existing ? existing.split(",") : [])
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => entry.toLowerCase())
  );

  if (!values.has(value.toLowerCase())) {
    appendHeader(headers, "Vary", value);
  }
}

function markdownTokenCount(markdown) {
  return markdown.trim().split(/\s+/).filter(Boolean).length.toString();
}

function withDiscoveryHeaders(response, pathname) {
  const headers = new Headers(response.headers);
  const contentType = contentTypes.get(pathname);

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  if (homepagePaths.has(pathname)) {
    appendHeader(headers, "Link", discoveryLinkHeader);
    appendVary(headers, "Accept");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function markdownHomepageResponse(request) {
  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    "x-markdown-tokens": markdownTokenCount(homepageMarkdown)
  });

  appendHeader(headers, "Link", discoveryLinkHeader);
  appendVary(headers, "Accept");

  return new Response(request.method === "HEAD" ? null : homepageMarkdown, {
    status: 200,
    headers
  });
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (homepagePaths.has(url.pathname) && (request.method === "GET" || request.method === "HEAD") && acceptsMarkdown(request)) {
    return markdownHomepageResponse(request);
  }

  return withDiscoveryHeaders(await context.next(), url.pathname);
}
