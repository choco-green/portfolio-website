export const prerender = true;

const siteUrl = "https://justinfung.com";

const apiCatalog = {
  linkset: [
    {
      anchor: `${siteUrl}/`,
      "service-desc": [
        {
          href: `${siteUrl}/openapi.json`,
          title: "Justin Fung portfolio public endpoint description",
          type: "application/vnd.oai.openapi+json;version=3.1"
        }
      ],
      "service-doc": [
        {
          href: `${siteUrl}/docs/api`,
          title: "Justin Fung portfolio public endpoint documentation",
          type: "text/html"
        }
      ],
      status: [
        {
          href: `${siteUrl}/health.json`,
          title: "Justin Fung portfolio health status",
          type: "application/json"
        }
      ]
    },
    {
      anchor: `${siteUrl}/resume/download`,
      item: [
        {
          href: `${siteUrl}/resume/download`,
          title: "Localized resume PDF download",
          type: "application/pdf"
        }
      ],
      "service-desc": [
        {
          href: `${siteUrl}/openapi.json`,
          title: "Resume download OpenAPI operation",
          type: "application/vnd.oai.openapi+json;version=3.1"
        }
      ],
      "service-doc": [
        {
          href: `${siteUrl}/docs/api#resume-download`,
          title: "Resume download documentation",
          type: "text/html"
        }
      ],
      status: [
        {
          href: `${siteUrl}/health.json`,
          title: "Portfolio health status",
          type: "application/json"
        }
      ]
    }
  ]
};

export function GET() {
  return new Response(`${JSON.stringify(apiCatalog, null, 2)}\n`, {
    headers: {
      "Content-Type": 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8'
    }
  });
}
