const { searchVectorInCollection } = require("./vector");
const {callLlm} = require('./llm')

function createPrompt(context, question){
  console.log("context ", context, "swe", context.trim())
  return `You have to answer user question with given context.  
    Here is users question:  ${question}.
    ${
      context && context.trim()
        ? `\nHere is context to answer user's question:\n${context}\n`
        : ""
    }
    answer the user's question based on context given if context is empty still answer question based on your knowledge.
  `
}

async function ragQuery({chatBotId, question}) {
  try {
    // 1️⃣ Vector retrieval
    const hits = await searchVectorInCollection(question, chatBotId);

    const contexts = [];
    let context = ""
    for (const h of hits) {
      const chunkId = h.id;
      context += h.payload.text;
      contexts.push({
        chunkId,
        score: h.score,
        payload: h.payload
      });
    }
    console.log("contexts ", contexts)
    const res = await callLlm(createPrompt(context, question))
    return {status : true, result: res}
  } catch(err){
    return {status : false, result: null}
  }
  
}

module.exports = {
  ragQuery
}