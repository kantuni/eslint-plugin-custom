module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that imports are sorted.",
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
        const sortedImportNodes = importNodes.toSorted((a, b) => {
          if (a.source.value < b.source.value) {
            return -1
          } else if (a.source.value > b.source.value) {
            return 1
          }
          return 0
        })
        const isSorted = importNodes.every(
          (importNode, index) => importNode === sortedImportNodes[index]
        )

        if (!isSorted) {
          const lastImportNode = importNodes.at(-1)
          context.report({
            node: lastImportNode,
            messageId: "importsAreNotSorted",
            fix(fixer) {
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
