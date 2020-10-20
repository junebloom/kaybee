import { terser } from "rollup-plugin-terser";

export default {
  input: "src/Kaybee.js",
  output: {
    file: "dist/Kaybee.js",
    sourcemap: true,
    format: "es",
    name: "kaybee",
  },
  plugins: [terser()],
};
