import type { ESLint } from "eslint"
import sortImportsRule from "./rules/sort-imports"

const plugin = {
  meta: {
    name: "eslint-plugin-custom",
    version: "1.0.0",
  },
  rules: {
    "sort-imports": sortImportsRule,
  },
} as ESLint.Plugin

// NOTE: Although this syntax is a bit weird, this is the only
// way to achieve `module.exports` like functionality
// without using any CommonJS stuff.
export const { meta, rules } = plugin
