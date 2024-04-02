import { defineConfig } from "tsup";
import fs from "node:fs/promises";

export default defineConfig([
  {
    name: "tpl",
    sourcemap: true,
    format: ["cjs"],
    entry: ["src/index.ts", "src/next.ts", "src/shared.ts"],
    dts: true,
    async onSuccess() {
      // copy src/mock.js to dist/mock.js
      await fs.copyFile("src/mock.js", "dist/mock.js");
    },
  },
]);
