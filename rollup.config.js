import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/kaybee.ts",
  output: {
    name: "kaybee",
    dir: "dist/",
    format: "es",
    sourcemap: true,
  },
  plugins: [typescript(), terser()],
};
