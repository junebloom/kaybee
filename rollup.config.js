import { terser } from "rollup-plugin-terser";

export default {
  input: "src/kaybee.js",
  output: {
    file: "dist/kaybee.js",
    sourcemap: true,
    format: "es",
    name: "kaybee",
  },
  plugins: [terser()],
};
