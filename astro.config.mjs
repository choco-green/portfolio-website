import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { createReadStream, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const resumeDownloadFileName = "justin-fung-resume.pdf";

const localResumeDownloads = {
  germany: {
    country: "DE",
    path: join(projectRoot, "public/resume/justin-fung-resume-de.pdf")
  },
  fallback: {
    path: join(projectRoot, "public/resume/justin-fung-resume-uk.pdf")
  }
};

function selectedLocalResume(headers) {
  const countryHeader = headers["cf-ipcountry"];
  const country = Array.isArray(countryHeader) ? countryHeader[0] : countryHeader;

  return country?.toUpperCase() === localResumeDownloads.germany.country ? localResumeDownloads.germany : localResumeDownloads.fallback;
}

function localResumeDownloadPlugin() {
  return {
    name: "local-resume-download",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url ?? "/", "http://localhost");

        if (url.pathname !== "/resume/download") {
          next();
          return;
        }

        if (request.method !== "GET" && request.method !== "HEAD") {
          response.statusCode = 405;
          response.setHeader("Allow", "GET, HEAD");
          response.end("Method Not Allowed");
          return;
        }

        const resume = selectedLocalResume(request.headers);

        try {
          const { size } = statSync(resume.path);
          response.statusCode = 200;
          response.setHeader("Content-Type", "application/pdf");
          response.setHeader("Content-Disposition", `attachment; filename="${resumeDownloadFileName}"`);
          response.setHeader("Cache-Control", "no-store");
          response.setHeader("Content-Length", size);

          if (request.method === "HEAD") {
            response.end();
            return;
          }

          createReadStream(resume.path).pipe(response);
        } catch {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  build: {
    inlineStylesheets: "always"
  },
  vite: {
    plugins: [tailwindcss(), localResumeDownloadPlugin()]
  },
  site: "https://justinfung.com",
  integrations: [react()]
});
