const { RuleTester } = require("eslint")
const sortImportsRule = require("../../src/rules/sort-imports")

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
})

ruleTester.run("sort-imports", sortImportsRule, {
  valid: [
    'import a from "a";import b from "b";',
    'import a from "a";import b from "b";import c from "c";',
  ],
  invalid: [
    {
      code: 'import a from "b";import b from "a";',
      errors: [{ messageId: "importsAreNotSorted" }],
      output: 'import b from "a";import a from "b";',
    },
    {
      code: 'import a from "c";import b from "b";import c from "a";',
      errors: [{ messageId: "importsAreNotSorted" }],
      output: 'import c from "a";import b from "b";import a from "c";',
    },
  ],
})
