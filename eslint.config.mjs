import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    ignores: [
      "**/build/**",
      "**/dist/**",
      "eslint.config.mjs",
      "executable.config.cjs",
      "commitlint.config.mjs",
    ],
  },
  eslint.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: eslintConfigPrettier,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./packages/*/tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/console": "off",
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
)
