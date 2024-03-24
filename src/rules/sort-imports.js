module.exports = {
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
      ImportDeclaration: (node) => {
        if (importNodes.length === 0) {
          importNodes.push(node)
          return
        }

        const lastImportNode = importNodes.at(-1)
        const tokensBetween = context.sourceCode.getTokensBetween(
          lastImportNode,
          node
        )
        if (tokensBetween.length === 0) {
          importNodes.push(node)
        }
      },
      onCodePathEnd: () => {
        const lastImportNode = importNodes.at(-1)
        // Next: https://stackoverflow.com/questions/31973278/iterate-an-array-as-a-pair-current-next-in-javascript
        // Check if ALL pairs are sorted (use the idea from the callback function of the `importNodes.reduce` below).
        const sorted = importNodes.every(
          (importNode) => importNode.source.value <= lastImportNode.source.value
        )

        if (!sorted) {
          context.report({
            node: lastImportNode,
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

              return importNodes.reduce((fixes, importNode, index) => {
                const sortedImportNode = sortedImportNodes[index]
                if (sortedImportNode.source.value !== importNode.source.value) {
                  fixes.push(
                    fixer.replaceText(
                      importNode,
                      context.sourceCode.getText(sortedImportNode)
                    )
                  )
                }
                return fixes
              }, [])
            },
          })
        }
      },
    }
  },
}
