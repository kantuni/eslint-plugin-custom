const { avoidWhileLoopsRule } = require("./rules/avoid-while-loops")

module.exports = {
  meta: {
    name: "eslint-plugin-custom",
    version: "1.0.0",
  },
  rules: {
    "avoid-while-loops": avoidWhileLoopsRule,
  },
}
