const avoidWhileLoopsRule = {
  meta: {
    messages: {
      avoidWhileLoops: "Do not use while loops.",
    },
  },
  create: (context) => {
    return {
      WhileStatement: (node) => {
        context.report({ node, messageId: "avoidWhileLoops" })
      },
    }
  },
}

module.exports = {
  avoidWhileLoopsRule,
}
