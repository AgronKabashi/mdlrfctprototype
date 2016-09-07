import nodeResolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";

export default {
  entry: "src/vendors.js",
  dest: "build/vendors.js",
  context: "window",
  format: "iife",
  moduleName: "vendors",
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      module: true
    }),
    commonjs(),
    buble(),
    uglify()
  ]
};