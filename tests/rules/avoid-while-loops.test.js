const { RuleTester } = require("eslint")
const { noWhileLoopsRule } = require("../../src/rules/no-while-loops")

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
  },
})

ruleTester.run("no-while-loops", noWhileLoopsRule, {
  valid: ["const foo = 1", "for(;;) {}", "do {} while(condition)"],
  invalid: [
    {
      code: "while(condition) {}",
      errors: [{ messageId: "noWhileLoops" }],
    },
  ],
})
