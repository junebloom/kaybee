import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

export default {
  input: 'src/index.js',
  output: {
    name: 'kaybee',
    file: 'dist/kaybee.js',
    sourceMap: true,
    format: 'umd'
  },
  plugins: [resolve(), commonjs(), buble(), uglify(), filesize()]
}
