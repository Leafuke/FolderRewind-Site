# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm ci
```

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

To preview the English locale:

```bash
npm run start:en
```

## Quality Checks

```bash
npm run check:i18n
npm run typecheck
npm run build
```

`check:i18n` verifies that the English documentation and blog content stay in sync with the default Chinese locale. The local search index is generated during `npm run build` and includes documentation and blog content for each locale. When adding or changing content, update the corresponding English translation files and run the parity check.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
