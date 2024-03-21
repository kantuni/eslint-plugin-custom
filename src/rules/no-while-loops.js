const noWhileLoopsRule = {
  meta: {
    messages: {
      noWhileLoops: "Do not use while loops.",
    },
  },
  create: (context) => {
    return {
      WhileStatement: (node) => {
        context.report({ node, messageId: "noWhileLoops" })
      },
    }
  },
}

module.exports = {
  noWhileLoopsRule,
}
