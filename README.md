# DGTL Handy JS 🖐

A collection of handy functions and reference types used across DGTL's Javascript projects. All functions are as close to pure as they can get and nearly all are designed to run in the browser or NodeJs. No modules have top-level `await`.

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

The **Browser** module can only be imported in the browser due to using document APIs.

```js
import { Downloads } from "@dgtlworkshop/handyjs/browser";

let my_blob = new Blob();
Downloads.downloadFileFromBlob("myimage.jpg", "image/jpg", my_blob);
```

Similarly, the **Server** module can only be imported in Node (or other compatible environments).

