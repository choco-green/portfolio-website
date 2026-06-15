export const prerender = true;

const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Justin Fung portfolio public endpoints",
    version: "1.0.0",
    description: "Public, unauthenticated endpoints exposed by the Justin Fung portfolio website."
  },
  servers: [
    {
      url: "https://justinfung.com"
    }
  ],
  paths: {
    "/health.json": {
      get: {
        operationId: "getPortfolioHealth",
        summary: "Read portfolio health metadata",
        responses: {
          "200": {
            description: "The static portfolio is available.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status", "service", "homepage"],
                  properties: {
                    status: { type: "string", const: "ok" },
                    service: { type: "string" },
                    homepage: { type: "string", format: "uri" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/resume/download": {
      get: {
        operationId: "downloadResume",
        summary: "Download Justin Fung's resume PDF",
        description: "Returns a localized resume PDF. Cloudflare country metadata may select a localized resume when available.",
        responses: {
          "200": {
            description: "Resume PDF.",
            headers: {
              "Content-Disposition": {
                schema: { type: "string" },
                description: "Attachment filename for the resume download."
              }
            },
            content: {
              "application/pdf": {
                schema: {
                  type: "string",
                  format: "binary"
                }
              }
            }
          },
          "405": {
            description: "Only GET and HEAD requests are allowed."
          }
        }
      },
      head: {
        operationId: "headResumeDownload",
        summary: "Read resume download headers",
        responses: {
          "200": {
            description: "Resume metadata headers without a response body."
          },
          "405": {
            description: "Only GET and HEAD requests are allowed."
          }
        }
      }
    }
  }
};

export function GET() {
  return new Response(`${JSON.stringify(openApiDocument, null, 2)}\n`, {
    headers: {
      "Content-Type": "application/vnd.oai.openapi+json;version=3.1; charset=utf-8"
    }
  });
}
