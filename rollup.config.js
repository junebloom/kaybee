import filesize from 'rollup-plugin-filesize'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/index.js',
  dest: 'dist/kaybee.js',
  sourceMap: true,

  format: 'umd',
  moduleName: 'kaybee',

  plugins: [
    filesize(),
    buble(),
    uglify()
  ]
}
