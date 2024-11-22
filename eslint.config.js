/**
 * @file The eslint config.
 */
// Espree is yet to support import-attributes
// eslint-disable-next-line import/namespace, import/no-deprecated
import {ConfigGenerator} from "@logicer/eslint-plugin";

export const options = {
  ecmaVersion: 2024,
  eslintPlugin: true,
  javascript: true,
  jsdoc: true,
  prettier: true,
  typescript: true
};

const generator = new ConfigGenerator(options);

/**
 * @type {import("eslint").Linter.FlatConfigFileSpec[]}
 */
const ignores = [
  "node_modules/**/*",
  "dist/**/*",
  ".type-coverage/**/*",

  "**/.eslint_report.json",
  "**/.eslintcache"
];

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
const eslintPluginConfigs = [
  {
    languageOptions: {
      ecmaVersion: 2024,
      parserOptions: {
        ecmaVersion: 2024,
        project: ["./tsconfig.json", "./tsconfig.*.json"],
        sourceType: "module"
      }
    },
    settings: {
      "import/parsers": {
        // Temporary until https://github.com/import-js/eslint-plugin-import/pull/2829
        espree: [".js", ".jsx", ".cjs", ".mjs"]
      },
      "import/resolver": {
        typescript: {
          project: ["tsconfig.json", "tsconfig.eslint.json"]
        }
      }
    }
  },
  {
    rules: {
      "@typescript-eslint/naming-convention": "off"
    }
  },
  {
    files: ["**/*.{test,spec}.ts{x,}", "**/*.{test,spec}.js{x,}"],
    rules: {"jsdoc/require-file-overview": "off"}
  }
];

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
const config = [
  {ignores},
  ...(await generator.config),
  ...eslintPluginConfigs,
  ...(await generator.endConfig)
];

export default config;
