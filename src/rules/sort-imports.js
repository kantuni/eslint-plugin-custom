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
      ImportDeclaration: (node) => {
        importNodes.push(node)
      },
      onCodePathEnd: () => {
        const lastImportNode = importNodes.at(-1)
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

              const fixes = []
              importNodes.forEach((importNode, index) => {
                const sortedImportNode = sortedImportNodes[index]
                if (sortedImportNode.source.value !== importNode.source.value) {
                  fixes.push(
                    fixer.replaceText(
                      importNode,
                      context.sourceCode.getText(sortedImportNode)
                    )
                  )
                }
              })
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
