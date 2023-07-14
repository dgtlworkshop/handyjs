# DGTL Handy JS 🖐

A collection of handy functions and reference types used across DGTL's Javascript projects. All functions are as close to pure as they can get and are designed to run in the browser or NodeJs. No modules have top-level `await`. All

_"Because JavaScript doesn't really have a standard library"_

```bash
echo "@dgtlworkshop:registry=https://npm.pkg.github.com" >> .npmrc
npm install @dgtlworkshop/handyjs
```

## Usage

```js
import { Chrono, Maths } from "@dgtlworkshop/handyjs";

await Chrono.timeout(500);

console.info("0.5 of 4 is equal to", Maths.mapRange(0.5, 0, 4, 0, 12), "of 12");
```
