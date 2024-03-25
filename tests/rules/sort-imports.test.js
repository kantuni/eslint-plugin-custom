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
    // Test 1
    {
      name: "a->b",
      code: `
        import a from "a";
        import b from "b";
      `,
    },
    {
      name: "a->b (no whitespace)",
      code: 'import a from "a";import b from "b";',
    },

    // Test 2
    {
      name: "a->b->c",
      code: `
        import a from "a";
        import b from "b";

        import c from "c";
      `,
    },
    {
      name: "a->b->c (no whitespace)",
      code: 'import a from "a";import b from "b";import c from "c";',
    },

    // Test 3
    {
      name: "a->c->console->d->b",
      code: `
      import a from "a";
      import c from "c";

      console.log("hi");

      import d from "d";
      import b from "b";
    `,
    },
    {
      name: "a->c->console->d->b (no whitespace)",
      code: 'import a from "a";import c from "c";console.log("hi");import d from "d";import b from "b";',
    },
  ],
  invalid: [
    // Test 1
    {
      name: "b->a (mixed)",
      code: `
        import a from "b";
        import b from "a";
      `,
      errors: [{ messageId: "importsAreNotSorted" }],
      output: `
        import b from "a";
        import a from "b";
      `,
    },
    {
      name: "b->a (mixed, no whitespace)",
      code: 'import a from "b";import b from "a";',
      errors: [{ messageId: "importsAreNotSorted" }],
      output: 'import b from "a";import a from "b";',
    },

    // Test 2
    {
      name: "b->a->c",
      code: `
        import b from "b";
        import a from "a";
        import c from "c";
      `,
      errors: [{ messageId: "importsAreNotSorted" }],
      output: `
        import a from "a";
        import b from "b";
        import c from "c";
      `,
    },
    {
      name: "b->a->c (no whitespace)",
      code: 'import b from "b";import a from "a";import c from "c";',
      errors: [{ messageId: "importsAreNotSorted" }],
      output: 'import a from "a";import b from "b";import c from "c";',
    },

    // Test 3
    {
      name: "c->b->a (mixed)",
      code: `
        import a from "c";
        import b from "b";
        import c from "a";
      `,
      errors: [{ messageId: "importsAreNotSorted" }],
      output: `
        import c from "a";
        import b from "b";
        import a from "c";
      `,
    },
    {
      name: "c->b->a (mixed, no whitespace)",
      code: 'import a from "c";import b from "b";import c from "a";',
      errors: [{ messageId: "importsAreNotSorted" }],
      output: 'import c from "a";import b from "b";import a from "c";',
    },

    // Test 4
    {
      name: "c->a->console->d->b",
      code: `
        import c from "c";
        import a from "a";
        
        console.log("hi");
        
        import d from "d";
        import b from "b";
      `,
      errors: [{ messageId: "importsAreNotSorted" }],
      output: `
        import a from "a";
        import c from "c";
        
        console.log("hi");
        
        import d from "d";
        import b from "b";
      `,
    },
    {
      name: "c->a->console->d->b (no whitespace)",
      code: 'import c from "c";import a from "a";console.log("hi");import d from "d";import b from "b";',
      errors: [{ messageId: "importsAreNotSorted" }],
      output:
        'import a from "a";import c from "c";console.log("hi");import d from "d";import b from "b";',
    },
  ],
})
