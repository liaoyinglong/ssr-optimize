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
      // copy src/faker.js to dist/faker.js
      await fs.copyFile("src/faker.js", "dist/faker.js");
    },
  },
]);
