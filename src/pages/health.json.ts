export const prerender = true;

const health = {
  status: "ok",
  service: "justin-fung-portfolio",
  homepage: "https://justinfung.com/",
  checks: [
    {
      name: "static-site",
      status: "ok"
    },
    {
      name: "resume-download-route",
      status: "ok"
    }
  ]
};

export function GET() {
  return new Response(`${JSON.stringify(health, null, 2)}\n`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
