import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"

export default [
  {
    input: "lib/be-lang-switcher.ts",
    output: [
      {
        file: "dist/lib/esm/be-lang-switcher.js",
        format: "es",
      },

      {
        file: "dist/lib/node/be-lang-switcher.js",
        format: "cjs",
      },
    ],

    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      json(),
    ],
  },
]
