const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { upsertVectorInCollection } = require("./vector");
const { Document } = require("@langchain/core/documents");
const nanoid = require("nanoid");

async function ingestDoc({ text }) {
  try{
    // const splitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 300,
    //   chunkOverlap: 50
    // });
    const chatBotId = nanoid(12)
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunkSentences = 3, overlap = 1;
    const rawChunks = [];
    for (let i = 0; i < sentences.length; i += chunkSentences - overlap) {
      rawChunks.push(sentences.slice(i, i + chunkSentences).join(" ").trim());
    }
    const chunks = rawChunks.map(c => new Document({ pageContent: c }));

    // const chunks = await splitter.createDocuments([text]);

    for (let i = 0; i < chunks.length; i++) {
      const chunkId = i;
      const chunkText = chunks[i].pageContent;

      // 1️⃣ Store in vector DB
      await upsertVectorInCollection(chunkId, chunkText, chatBotId);

    }
    return {status : true, chatBotId}
  } catch(err){
    console.log(err)
    return {status : false, chatBotId: null}
  }
}

module.exports = {
  ingestDoc
}