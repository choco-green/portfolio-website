# Resume Download Skill

Use this skill when an agent needs Justin Fung's resume.

## Endpoint

`GET https://justinfung.com/resume/download`

## Behavior

The endpoint returns a PDF attachment named `justin-fung-resume.pdf`.

When deployed on Cloudflare Pages, Germany visitors may receive the Germany-specific resume PDF based on Cloudflare country metadata. Other visitors receive the fallback resume PDF.

## Authentication

No authentication is required.
