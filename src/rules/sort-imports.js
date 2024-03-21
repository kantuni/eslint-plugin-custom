const sortImportsRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce that imports are sorted.",
    },
    fixable: "code",
    messages: {
      importsAreNotSorted: "Imports are not sorted.",
    },
  },
  create: (context) => {
    const importNodes = []

    return {
      // NOTE: We should probably sort them after the whole program has been provided
      ImportDeclaration: (node) => {
        importNodes.push({ ...node })

        const sorted = importNodes.every(
          (importNode) => importNode.source.value <= node.source.value
        )

        if (!sorted) {
          context.report({
            node,
            messageId: "importsAreNotSorted",
            fix(fixer) {
              const sortedImportNodes = importNodes.toSorted((a, b) => {
                if (a.source.value < b.source.value) {
                  return -1
                } else if (a.source.value > b.source.value) {
                  return 1
                }
                return 0
              })

              const fixes = []

              for (let i = 0; i < importNodes.length; i++) {
                if (
                  sortedImportNodes[i].source.value !==
                  importNodes[i].source.value
                ) {
                  console.log(
                    "replace ",
                    context.sourceCode.getText(importNodes[i]),
                    " with ",
                    context.sourceCode.getText(sortedImportNodes[i])
                  )

                  fixes.push(
                    fixer.replaceText(
                      importNodes[i],
                      context.sourceCode.getText(sortedImportNodes[i])
                    )
                  )

                  // Properly sort the imports array
                  // let tmpNode = sortedImportNodes[i]
                  // sortedImportNodes[i] = importNodes[i]
                  // importNodes[i] = tmpNode
                }
              }

              console.log(
                "possibly sorted",
                importNodes.map((n) => n.source.value)
              )
              return fixes
            },
          })
        }
      },
    }
  },
}

module.exports = {
  sortImportsRule,
}
