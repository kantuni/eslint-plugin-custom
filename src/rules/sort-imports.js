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
        importNodes.push({ ...node })

        const sorted = importNodes.every(
          (importNode) => importNode.source.value <= node.source.value
        )

        if (!sorted) {
          context.report({
            node,
            messageId: "importsAreNotSorted",
            *fix(fixer) {
              // NEW PLAN: Sort the array of imports. Then swap the corresponding elements.

              console.log(
                "aaa",
                importNodes.map((node_) => node_.source.value)
              )
              const badImportPos = importNodes.findIndex(
                (importNode) => importNode.source.value > node.source.value
              )
              // if (badImportPos === -1) {
              //   break
              // }

              const badImportNode = importNodes[badImportPos]
              const badImportSourceCode =
                context.sourceCode.getText(badImportNode)

              // Swap nodes in the imports array
              const currentImportPos = importNodes.length - 1
              const tmp = importNodes[currentImportPos]
              importNodes[currentImportPos] = importNodes[badImportPos]
              importNodes[badImportPos] = tmp

              console.log(
                "bbb",
                importNodes.map((node_) => node_.source.value)
              )

              const currentImportSourceCode = context.sourceCode.getText(node)

              yield fixer.replaceText(badImportNode, currentImportSourceCode)
              yield fixer.replaceText(node, badImportSourceCode)
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
