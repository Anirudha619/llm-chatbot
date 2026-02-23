# LLM Chatbot Builder

A full-stack application for creating custom AI chatbots for your website trained on your own documents. Deploy intelligent, conversational AI assistants to your website in minutes.

## Project Description

This platform allows users to:
- Upload text documents (TXT) to create a custom knowledge base
- Train an AI chatbot on their specific content using RAG (Retrieval-Augmented Generation)
- Preview and test the chatbot in real-time
- Embed the chatbot on any website via a simple script integration

The chatbot uses vector similarity search to find relevant context from your documents, then uses a large language model to generate accurate, context-aware responses.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                       │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ Landing Page │  │ Chatbot Builder  │  │ Chatbot Preview │  │
│  └──────────────┘  └──────────────────┘  └──────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP API
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Backend (Express.js)                        │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ /create      │  │ /query           │  │                  │  │
│  └──────────────┘  └──────────────────┘  └──────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
┌─────────────────┐  ┌──────────────┐  ┌──────────────────┐
│  RAG Ingest     │  │ RAG Query    │  │  LLM Service    │
│  (Text Chunking)│  │ (Vector      │  │  (Cerebras      │
│                 │  │  Retrieval)  │  │   GPT-OSS-120B) │
└────────┬────────┘  └──────┬───────┘  └──────────────────┘
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌──────────────┐
│  Qdrant (Vector │  │  Gemini      │
│  Database)      │  │  Embeddings │
└─────────────────┘  └──────────────┘
```

### Technology Stack

**Frontend:**
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS with shadcn/ui components
- Lucide React (icons)

**Backend:**
- Express.js
- Node.js

**AI/ML Services:**
- Cerebras (GPT-OSS-120B) - LLM for response generation
- Google Gemini (gemini-embedding-001) - Text embeddings
- Qdrant - Vector database for similarity search

## For Developers

### Prerequisites

- Node.js 18+
- npm or yarn
- Qdrant (running locally or cloud)
- API keys:
  - Cerebras API Key
  - Google Gemini API Key
  - Qdrant URL & API Key (if using cloud)

### Setup

1. **Clone and install dependencies:**

   ```bash
   # Backend
   cd aiAgentBackend
   npm install

   # Frontend
   cd frontend
   npm install
   ```

2. **Configure environment variables:**

   Create `.env` files in `aiAgentBackend/`:

   ```env
   CEREBRAS_API_KEY=your_cerebras_api_key
   GEMINI_API_KEY=your_gemini_api_key
   QDRANT_URL=http://localhost:6333
   QDRANT_API_KEY=your_qdrant_api_key (optional for local)
   ```

3. **Start Qdrant vector database:**

   ```bash
   # Using Docker
   docker run -p 6333:6333 qdrant/qdrant
   ```

4. **Run the application:**

   ```bash
   # Backend (from aiAgentBackend directory)
   node src/server.js
   # Or use a runner like nodemon

   # Frontend (from frontend directory)
   npm run dev
   ```

5. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/chatbot/create` | POST | Upload text to create a new chatbot |
| `/chatbot/query` | POST | Query a chatbot with a question |

**Request/Response Formats:**

```javascript
// POST /chatbot/create
// Request: { text: "Your training content here" }
// Response: { status: true, chatBotId: "abc123xyz" }

// POST /chatbot/query
// Request: { chatBotId: "abc123xyz", question: "What is this about?" }
// Response: { status: true, result: "AI-generated answer..." }
```

### Project Structure

```
chatbot/
├── aiAgentBackend/
│   └── src/
│       ├── server.js       # Express API routes
│       ├── llm.js          # Cerebras LLM integration
│       ├── vector.js       # Qdrant vector DB & Gemini embeddings
│       ├── ragIngest.js    # Text chunking & vector storage
│       └── ragQuery.js     # Retrieval & answer generation
│
└── frontend/
    └── src/
        ├── app/
        │   ├── page.tsx              # Landing page
        │   ├── chatbot-builder/      # Chatbot builder UI
        │   └── chatbot/[id]/         # Individual chatbot view
        └── components/
            └── chat-builder/         # Builder components
```

## Where to Use This

- **Customer Support** - Create chatbots that answer product/service questions from your documentation
- **Internal Knowledge Bases** - Build AI assistants for company internal docs
- **Educational Platforms** - Train bots on course materials for student Q&A
- **E-commerce** - Help customers find product information from catalogs
- **Documentation Sites** - Add AI-powered search to technical documentation

## License

ISC
