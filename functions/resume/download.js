const resumeDownloads = {
  germany: {
    country: "DE",
    path: "/resume/justin-fung-resume-de.pdf"
  },
  fallback: {
    path: "/resume/justin-fung-resume-uk.pdf"
  }
};

const downloadFileName = "justin-fung-resume.pdf";

function visitorCountry(request) {
  return request.cf?.country || request.headers.get("CF-IPCountry") || "";
}

function selectedResume(request) {
  return visitorCountry(request).toUpperCase() === resumeDownloads.germany.country
    ? resumeDownloads.germany
    : resumeDownloads.fallback;
}

function attachmentDisposition(fileName) {
  return `attachment; filename="${fileName}"`;
}

export async function onRequest(context) {
  const { request } = context;

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        Allow: "GET, HEAD"
      }
    });
  }

  const resume = selectedResume(request);
  const resumeUrl = new URL(resume.path, request.url);
  const resumeResponse = await fetch(resumeUrl.toString());

  if (!resumeResponse.ok) {
    return resumeResponse;
  }

  const headers = new Headers(resumeResponse.headers);
  headers.set("Content-Type", "application/pdf");
  headers.set("Content-Disposition", attachmentDisposition(downloadFileName));
  headers.set("Cache-Control", "no-store");

  return new Response(request.method === "HEAD" ? null : resumeResponse.body, {
    status: resumeResponse.status,
    statusText: resumeResponse.statusText,
    headers
  });
}
