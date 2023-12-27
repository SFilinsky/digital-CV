# Digital CV Tool

You can see hosted version here - https://sfilinsky.github.io/digital-CV-tool/

This is CV project of Siarhei Filinski ([Linked In](https://www.linkedin.com/in/sergey-filinsky/)). The idea behind it is:
- make it possible to create CV using my frontend skills
- scale CV into my personal website while sharing common elements between them
- briefly showcase my skills through source code for this small project

## Features 

The tool allows to:
- create CV using modern frontend technology
  - build and host CV as website
  - render CV as PDF from the same code
  - develop both versions locally using dev tools with hot reload
- maintain several CV versions simultaneously

The tech tool is based on:
- Typescript
- SCSS
- Webpack for local and production build
  - Supports hot reload for dev server
- Puppeteer (for rendering PDF)
- Web components for few UI elements used widely in CV
- Node.js scripts for build pipeline

All the build scripts and configs are written by me from scratch, 
no template was used for this project.

Web version is also aimed to responsively support mobile.

## Running

To run local dev server run:

```bash
npm run dev -- --variant=base
```

`variant` option allows to specify which variant should be built and hosted. In example below, it will try to
use CV variant located in `src/variants/base`.

It will be available on http://localhost:8080 and hot reloaded whenever you change files in `/src`.

Also, `.pdf` version will be created and can be found in `/dist`.

## Releasing

When new commits are added to `main`, two things will happen automatically:
- `main` will be auto-merged into `release` branch
- `release` branch will build and commit output on top of the branch

Since build output goes into `docs` folder, GitHub Pages will pick it up automatically and update hosted website.

## Maintaining multiple versions

It's possible to have several CV variants that are being developed in parallel. To allow that, there is `src/variants` 
folder, each directory in which is considered separate CV versions, that can be developed and built separately.

Each variant is minimally required to have `index.ts` and `index.html` files.

Variant that should be used for production hosting should be specified in `src/variants/hosted-variant.config.js`;

## Additional notes:

### Typescript execution in PDF

When PDF render happens, Puppeteer runs headless version of Chrome and opens page like 
actual website. Then it creates PDF from page snapshots using browser `Print` functionality.

Actual render will happen after synchronous phase of page load is finishes, which means 
 it will also execute any blocking scripts that are attached to the page.

`index.ts` is used as Webpack build entry point and will be attached as blocking script 
(this also includes any imports that are done in this script). For example, this is used 
to initialise and hydrate Web Components during PDF render as well.

Obviously, any interactivity available in web-version will be removed during PDF render, 
only relying on initial script execution.

### Accessibility

PDF export is configured the way to preserve all the `aria-` information, allowing it to 
be used we screen readers and other a11y tech.

Good a11y markup will make PDF better parsed by automatic systems that extract CV information.

### Transparency and gradients

Transparency doesn't work well in PDF format, including gradients. It causes visual issues like 
random lines and other glitches.

To avoid it there is simple rule:
All additional styles that include transparency should be wrapped into `@media screen {}`.
Styles for PDF should be provided as default and use straight color values.

### Responsive breakpoints

Breakpoints are defined in `src/styles/breakpoints.scss`. 

PDF and web versions are using the same content are width whenever possible.
It means that if there is too much space on the screen - margins are added on left and right
to keep page look uniform.

### Page height in PDF

By default, Chrome exports PDF with page breaks, and there is no way to disable it natively.

However, there is a workaround: 

During PDF export Chrome allows to define page size. If it's height set to actual
content height, one page will include whole website content.

Since I use automatic build scripts, this value is derived automatically making whole
process much simpler.

