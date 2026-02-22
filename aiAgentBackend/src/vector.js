const { QdrantClient } = require("@qdrant/js-client-rest");
const dotenv = require('dotenv')
dotenv.config()

const qdrant = new QdrantClient({ 
  url: process.env.QDRANT_URL || "http://localhost:6333",
  apiKey: process.env.QDRANT_API_KEY
});

const COLLECTION = "DOCUMENTS";

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function embed(text, taskType = "RETRIEVAL_DOCUMENT") {
  if (!text || typeof text !== "string") {
    throw new Error("embed(): invalid text");
  }

  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
    
      // outputDimensionality: 768,
    // taskType,                   // optimize for your use case
    // outputDimensionality: 768,  // optional; default is 3072
  });

  return response.embeddings[0].values; // 768-dim (or 3072 if no outputDimensionality set)
}

async function ensureCollection() {
  const collections = await qdrant.getCollections();
  const exists = collections.collections.find(c => c.name === COLLECTION);
  
  if (!exists) {
    await qdrant.createCollection(COLLECTION, {
      // vectors: { size: 384, distance: "Cosine" }

      vectors: { size: 3072, distance: "Cosine" }
    });
  }
}

async function ensureCollectionFor(collection) {
  const collections = await qdrant.getCollections();
  const exists = collections.collections.find(c => c.name === collection);
  
  if (!exists) {
    await qdrant.createCollection(collection, {
      // vectors: { size: 384, distance: "Cosine" }

      vectors: { size: 3072, distance: "Cosine" }
    });
  }
}

// function embed(text) {
//   const v =
//     Math.abs(
//       text.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
//     ) % 1000;
//   return new Array(384).fill(v / 1000);
// }



async function upsertVector(id, text) {
  await ensureCollection();
  await qdrant.upsert(COLLECTION, {
    points: [
      {
        id,
        vector: await embed(text),
        payload: { text },
      },
    ],
  });
}

async function upsertVectorInCollection(id, text, collection) {
  await ensureCollectionFor(collection);
  await qdrant.upsert(collection, {
    points: [
      {
        id,
        vector: await embed(text),
        payload: { text },
      },
    ],
  });
}


async function searchVector(query) {
  await ensureCollection();
  return qdrant.search(COLLECTION, {
    vector: await embed(query),
    limit: 3,
  });
}

async function searchVectorInCollection(query, collection) {
  await ensureCollectionFor(collection);
  return qdrant.search(collection, {
    vector: await embed(query),
    limit: 3,
  });
}


module.exports = { upsertVector, searchVector, embed, upsertVectorInCollection, searchVectorInCollection };