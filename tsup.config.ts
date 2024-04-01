import { defineConfig } from "tsup";

export default defineConfig([
  {
    name: "tpl",
    target: "node16",
    sourcemap: true,
    format: ["cjs", "esm"],
    entry: ["src/index.ts"],
    dts: true,
  },
]);
