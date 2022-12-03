# @riccox/color-palette-generator

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/riccox/color-palette-generator-js/main)
![release](https://img.shields.io/github/v/release/riccox/color-palette-generator-js?display_name=release)
![stars](https://img.shields.io/github/stars/riccox/color-palette-generator-js)
![issues](https://img.shields.io/github/issues/riccox/color-palette-generator-js)
![last-commit](https://img.shields.io/github/last-commit/riccox/color-palette-generator-js)
![license](https://img.shields.io/github/license/riccox/color-palette-generator-js)

#### A type-safe, zero-deps, simple color palette generator javascript util lib

> [IMPORTANT] The main branch may be unstable or unavailable during development.
>
> Please use release instead of main branch to obtain a stable version app

## Demo

There is a live usage demo 👉 [color-palette-generator](https://codesandbox.io/s/riccox-color-palette-generator-f4ebid), deploy on Codesandbox.

## Usage

```sh
npm i @riccox/color-palette-generator --save
```

```typescript
import { generateColorPalette, guessForegroundColor } from '@riccox/color-palette-generator';

// returns a new hex color string array by given primary color.
console.log(generateColorPalette('#0f0',12))

// return a new hex color string (#000 or #FFF) by given background color.
console.log(guessForegroundColor('#0f0'))
```

## Development

```sh
git clone git@github.com:riccox/color-palette-generator-js.git

cd color-palette-generator-js

pnpm install
```
