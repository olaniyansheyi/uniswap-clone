// init.js

import { Buffer } from "buffer";
if (typeof global === "undefined") {
  window.global = window;
}

if (typeof window !== "undefined") {
  window.Buffer = Buffer; // Make Buffer globally available
}
