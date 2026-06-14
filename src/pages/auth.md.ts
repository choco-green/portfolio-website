export const prerender = true;

const authMarkdown = `# Agent Authentication

No OAuth registration is required to access the public Justin Fung portfolio resources.

## Public Resources

- Homepage: https://justinfung.com/
- Markdown homepage representation: request https://justinfung.com/ with \`Accept: text/markdown\`
- API catalog: https://justinfung.com/.well-known/api-catalog
- Public endpoint description: https://justinfung.com/openapi.json
- Resume download: https://justinfung.com/resume/download
- Contact email: justin--fung@outlook.com

## Authentication Policy

The portfolio currently exposes public, read-only resources only. Agents do not need client registration, OAuth tokens, API keys, or custom scopes to retrieve the published profile, project metadata, health metadata, or resume download.

If protected APIs are introduced later, this document should be updated alongside OAuth Authorization Server Metadata and OAuth Protected Resource Metadata.
`;

export function GET() {
  return new Response(authMarkdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8"
    }
  });
}
