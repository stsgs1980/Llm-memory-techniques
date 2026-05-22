# Библиотеки для управления памятью LLM

Обзор инструментов для управления памятью AI-агентов.

---

## Mem0

**Открытая библиотека для управления памятью AI-агентов**

GitHub: [mem0ai/mem0](https://github.com/mem0ai/mem0) (25k+ ⭐)

### Возможности

- Хранение памяти между сессиями
- Автоматическое извлечение фактов из диалогов
- Поддержка векторных БД (PostgreSQL, Qdrant, Pinecone)
- Интеграция с OpenAI, Anthropic, LangChain

### Установка

```bash
pip install mem0ai
```

### Базовое использование

```python
from mem0 import Memory

# Инициализация
m = Memory()

# Добавить память
m.add("Пользователь любит пиццу", user_id="user_123")
m.add("Пользователь работает в IT", user_id="user_123")

# Поиск памяти
results = m.search("что любит пользователь?", user_id="user_123")
# → [{"memory": "Пользователь любит пиццу", "score": 0.95}]

# Получить всю память пользователя
all_memories = m.get_all(user_id="user_123")

# Удалить память
m.delete(memory_id="mem_abc123")
```

### Интеграция с OpenAI

```python
from mem0 import Memory
from openai import OpenAI

client = OpenAI()
m = Memory()

def chat_with_memory(user_id: str, message: str):
    # Сохранить сообщение пользователя
    m.add(message, user_id=user_id)

    # Получить релевантный контекст
    context = m.search(message, user_id=user_id, limit=5)

    # Отправить в LLM с контекстом
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": f"Контекст из памяти: {context}"
            },
            {"role": "user", "content": message}
        ]
    )

    return response.choices[0].message.content
```

### Конфигурация с Qdrant

```python
from mem0 import Memory

m = Memory({
    "vector_store": {
        "provider": "qdrant",
        "config": {
            "host": "localhost",
            "port": 6333,
            "collection_name": "memories"
        }
    },
    "llm": {
        "provider": "openai",
        "config": {
            "model": "gpt-4",
            "temperature": 0.1
        }
    }
})
```

### Конфигурация с PostgreSQL (pgvector)

```python
from mem0 import Memory

m = Memory({
    "vector_store": {
        "provider": "pgvector",
        "config": {
            "dbname": "mem0_db",
            "user": "postgres",
            "password": "password",
            "host": "localhost",
            "port": 5432,
        }
    }
})
```

---

## Letta

**Фреймворк для stateful AI-агентов с долгосрочной памятью**

GitHub: [letta-ai/letta](https://github.com/letta-ai/letta)

Основан на исследованиях UC Berkeley (MemGPT).

### Возможности

- Архитектура с тремя типами памяти
- Автоматическое управление контекстом
- Multi-agent системы
- Stateless API (вся память на сервере)

### Типы памяти

| Тип | Описание | Размер |
|-----|----------|--------|
| **Core Memory** | Всегда в контексте | ~2000 токенов |
| **Archival Memory** | Долгосрочное хранилище | Неограничен |
| **Recall Memory** | История диалогов | Неограничен |

### Установка

```bash
pip install letta
```

### Базовое использование

```python
from letta import create_client

# Создать клиента
client = create_client()

# Создать агента
agent = client.create_agent(
    name="assistant",
    system="Ты полезный ассистент, который помнит всё о пользователе"
)

# Отправить сообщение
response = client.send_message(
    agent_id=agent.id,
    message="Меня зовут Алексей, я бэкенд-разработчик"
)

# Агент автоматически извлекает факты в Core Memory
# При следующем запросе помнит имя и профессию
response = client.send_message(
    agent_id=agent.id,
    message="Посоветуй мне книгу"
)
# → Учтёт, что ты разработчик
```

### Работа с памятью напрямую

```python
# Core Memory — всегда в контексте
client.core_memory_append(
    agent_id=agent.id,
    label="user_info",
    content="Любит научную фантастику"
)

# Archival Memory — долгосрочное хранилище
client.insert_archival_memory(
    agent_id=agent.id,
    content="Прошёл курс по Machine Learning в 2023 году"
)

# Recall Memory — поиск по истории
messages = client.get_messages(
    agent_id=agent.id,
    limit=100
)
```

### Схема памяти агента

```
┌─────────────────────────────────────────────────┐
│                   Core Memory                    │
│  (Всегда в контексте LLM)                       │
│                                                 │
│  [User Info]                                    │
│  - Имя: Алексей                                 │
│  - Профессия: Backend Developer                 │
│  - Интересы: Python, ML                         │
│                                                 │
│  [Preferences]                                  │
│  - Язык: Русский                                │
│  - Стиль общения: Формальный                    │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│                 Archival Memory                  │
│  (Векторное хранилище, ищется по запросу)       │
│                                                 │
│  • "Прошёл курс ML в 2023"                      │
│  • "Любит научную фантастику"                   │
│  • "Работает над проектом X"                    │
│  • ...тысячи записей...                         │
└─────────────────────────────────────────────────┘
```

---

## Сравнение

| Критерий | Mem0 | Letta |
|----------|------|-------|
| **Простота** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Гибкость** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Интеграция с LLM** | OpenAI, Anthropic, LangChain | Свой API |
| **Хранение** | Внешние БД (Qdrant, Pinecone) | Встроенное |
| **Типы памяти** | Один тип | Три типа |
| **Подходит для** | Чат-боты, ассистенты | Сложные агенты |

---

## Когда что использовать

### Выбери Mem0 если:

- Нужно быстро добавить память к существующему чат-боту
- Уже используешь OpenAI/Anthropic API
- Нужна интеграция с LangChain
- Хочешь контролировать где хранить данные

### Выбери Letta если:

- Строишь сложного агента с разными типами памяти
- Нужна автоматическая работа с контекстом
- Важна история всех диалогов
- Делаешь multi-agent систему

---

## Ссылки

- [Mem0 Documentation](https://docs.mem0.ai/)
- [Letta Documentation](https://docs.letta.com/)
- [MemGPT Paper (Berkeley)](https://arxiv.org/abs/2310.08560)
