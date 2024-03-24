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
    'import a from "a";import c from "c";console.log("foo");import b from "b"',
  ],
  invalid: [
    // {
    //   code: 'import a from "b";import b from "a";',
    //   errors: [{ messageId: "importsAreNotSorted" }],
    //   output: 'import b from "a";import a from "b";',
    // },
    {
      code: `
        import b from "b";
        import a from "a";
        import c from "c";
      `,
      // .split(";")
      // .map((chunk) => chunk.trim())
      // .join(";"),
      errors: [{ messageId: "importsAreNotSorted" }],
      output: `
        import a from "a";
        import b from "b";
        import c from "c";
      `,
    },
    // {
    //   code: 'import a from "c";import b from "b";import c from "a";',
    //   errors: [{ messageId: "importsAreNotSorted" }],
    //   output: 'import c from "a";import b from "b";import a from "c";',
    // },
    // {
    //   code: 'import a from "a";import c from "c";console.log("foo");import d from "d";import b from "b"',
    //   errors: [{ messageId: "importsAreNotSorted" }],
    //   output:
    //     'import a from "a";import c from "c";console.log("foo");import b from "b";import d from "d"',
    // },
    // {
    //   code: 'import a from "a";import c from "c";console.log("foo");import d from "d";import b from "b"',
    //   errors: [{ messageId: "importsAreNotSorted" }],
    //   output: 'import a from "a";import c from "c";console.log("foo");import b from "b"',
    // },
  ],
})
