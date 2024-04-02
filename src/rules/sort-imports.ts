import type { Rule } from "eslint"
import type { ImportDeclaration } from "estree"

export default {
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
  create: (context: Rule.RuleContext) => {
    const importNodes: ImportDeclaration[] = []

    return {
      ImportDeclaration: (node: ImportDeclaration) => {
        if (importNodes.length === 0) {
          importNodes.push(node)
          return
        }

        const lastImportNode = importNodes.at(-1) as ImportDeclaration
        const tokensBetween = context.sourceCode.getTokensBetween(
          lastImportNode,
          node
        )
        if (tokensBetween.length === 0) {
          importNodes.push(node)
        }
      },
      onCodePathEnd: () => {
        const sortedImportNodes = importNodes.toSorted(
          (a: ImportDeclaration, b: ImportDeclaration) => {
            if (!a.source.value || !b.source.value) {
              return 0
            } else if (a.source.value < b.source.value) {
              return -1
            } else if (a.source.value > b.source.value) {
              return 1
            }
            return 0
          }
        )

        const isSorted = importNodes.every(
          (importNode, index) => importNode === sortedImportNodes[index]
        )

        if (!isSorted) {
          const lastImportNode = importNodes.at(-1) as ImportDeclaration
          context.report({
            node: lastImportNode,
            messageId: "importsAreNotSorted",
            fix: (fixer) =>
              importNodes.reduce((fixes: Rule.Fix[], importNode, index) => {
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
              }, []),
          })
        }
      },
    }
  },
} as Rule.RuleModule
