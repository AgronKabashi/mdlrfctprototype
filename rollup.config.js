import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import includepaths from "rollup-plugin-includepaths";

const dependencies = require("./package.json").dependencies;

export default {
  entry: "src/main.js",
  dest: "build/main.js",
  format: "iife",
  plugins: [
    includepaths({
      paths: ["src"]
    }),
    babel()
  ],
  external: Object.keys(dependencies),
  globals: Object.keys(dependencies).reduce((result, key) => {
    result[key] = `vendors.${key.replace(/[@\-\/\.]/g, '_')}`;
    return result;
  }, {})
};