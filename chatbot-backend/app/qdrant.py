from qdrant_client import QdrantClient
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.core import StorageContext
from .config import settings


client = QdrantClient(url=settings.qdrant_url)


def get_storage():
    vector_store = QdrantVectorStore(
        client=client,
        collection_name=settings.collection_name,
    )

    return StorageContext.from_defaults(vector_store=vector_store)