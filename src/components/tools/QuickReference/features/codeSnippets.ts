export const CODE_SNIPPETS: Record<string, { title: string; code: string }> = {
  summarization: {
    title: 'Суммаризация',
    code: `# Сжатие истории в краткое резюме
def summarize_context(messages: list, max_tokens: int = 500) -> list:
    if len(messages) <= 10:
        return messages
    
    # Суммаризируем старые сообщения
    old_messages = messages[:-10]
    summary_prompt = f"Суммаризируй диалог:\\n{old_messages}"
    summary = llm.invoke(summary_prompt)
    
    # Добавляем резюме + последние сообщения
    summary_msg = {"role": "system", "content": f"Контекст: {summary}"}
    return [summary_msg] + messages[-10:]`,
  },
  hierarchical: {
    title: 'Иерархическая память',
    code: `# Двухуровневая система памяти
class HierarchicalMemory:
    def __init__(self):
        self.short_term = []     # Последние сообщения
        self.long_term = ""      # Долгосрочное резюме
    
    def build_context(self, messages: list) -> str:
        self.short_term = messages[-5:]
        
        if len(messages) > 20:
            # Сжимаем старые сообщения в long_term
            old = messages[:-20]
            self.long_term = llm.invoke(
                f"Обнови резюме на основе:\\n{old}\\nТекущее резюме:\\n{self.long_term}"
            )
        
        return self.long_term + "\\n\\n" + str(self.short_term)`,
  },
  rag: {
    title: 'RAG (векторный поиск)',
    code: `# Поиск релевантных фрагментов из истории
from chromadb import Client

client = Client()
collection = client.create_collection("chat_history")

def retrieve_context(query: str, top_k: int = 5) -> list:
    # Векторный поиск по истории
    results = collection.query(
        query_texts=[query],
        n_results=top_k
    )
    
    # Возвращаем релевантные фрагменты
    return [doc for doc in results["documents"][0]]

# Сохраняем новые сообщения в БД
def store_message(msg: str, metadata: dict):
    collection.add(
        documents=[msg],
        metadatas=[metadata],
        ids=[f"msg_{uuid4()}"]
    )`,
  },
  'fact-extraction': {
    title: 'Извлечение фактов',
    code: `# Извлечение ключевых фактов в JSON-профиль
def extract_facts(messages: list) -> dict:
    prompt = """Извлеки ключевые факты из диалога в JSON:
    - имя, предпочтения, контекст работы
    - важные решения и дедлайны
    JSON формат: {"name": "", "prefs": [], "facts": []}"""
    
    result = llm.invoke(prompt + str(messages))
    return json.loads(result)

# Обновление профиля при каждом диалоге
def update_user_profile(user_id: str, messages: list):
    current = db.get_profile(user_id) or {}
    new_facts = extract_facts(messages)
    
    # Сливаем старый и новый профиль
    merged = merge_profiles(current, new_facts)
    db.save_profile(user_id, merged)
    
    return merged`,
  },
  'sliding-window': {
    title: 'Sliding Window',
    code: `# Самый простой подход — последние N сообщений
def sliding_window_context(messages: list, window_size: int = 10) -> list:
    """
    FIFO: сохраняем только последние window_size сообщений.
    Одна строка, нулевая инфраструктура.
    """
    return messages[-window_size:]

# Использование
context = sliding_window_context(conversation_history)
response = llm.invoke(context)`,
  },
  'semantic-cache': {
    title: 'Семантический кэш',
    code: `# Кэширование по семантическому сходству
import numpy as np
from sentence_transformers import SentenceTransformer

encoder = SentenceTransformer("all-MiniLM-L6-v2")
cache = {}  # {embedding: response}

def semantic_cache_lookup(query: str, threshold: float = 0.95) -> str | None:
    query_emb = encoder.encode(query)
    
    for cached_emb, response in cache.items():
        similarity = np.dot(query_emb, cached_emb) / (
            np.linalg.norm(query_emb) * np.linalg.norm(cached_emb)
        )
        if similarity >= threshold:
            return response  # Кэш-хит!
    
    return None  # Промах — идём к LLM`,
  },
};
