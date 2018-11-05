import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import { version } from './package.json'

const preamble = `// kaybee ${version} | MIT License | Copyright (c) 2018 Sam Woodruff`

export default {
  input: 'src/Kaybee.js',
  output: {
    file: 'dist/Kaybee.js',
    sourceMap: true,
    format: 'umd',
    name: 'kaybee'
  },
  plugins: [
    filesize(),
    resolve(),
    commonjs(),
    json(),
    babel(),
    uglify({
      output: { preamble }
    })
  ]
}
