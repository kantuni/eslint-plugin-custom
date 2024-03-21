const { noWhileLoopsRule } = require("./rules/no-while-loops")
const { sortImportsRule } = require("./rules/sort-imports")

module.exports = {
  meta: {
    name: "eslint-plugin-custom",
    version: "1.0.0",
  },
  rules: {
    "no-while-loops": noWhileLoopsRule,
    "sort-imports": sortImportsRule,
  },
}
