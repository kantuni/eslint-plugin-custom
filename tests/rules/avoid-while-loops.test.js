const { RuleTester } = require("eslint")
const { avoidWhileLoopsRule } = require("../../src/rules/avoid-while-loops")

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
  },
})

ruleTester.run("avoid-while-loops", avoidWhileLoopsRule, {
  valid: ["const foo = 1", "for(;;) {}", "do {} while(condition)"],
  invalid: [
    {
      code: "while(condition) {}",
      errors: [{ messageId: "avoidWhileLoops" }],
    },
  ],
})
