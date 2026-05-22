# LLM Memory Guide

Interactive guide to 6 LLM memory management techniques with visualizations, calculators, and hands-on demos.

## Features

### 6 Memory Techniques

| Technique | Description | Best For |
|-----------|-------------|----------|
| **Summarization** | Compress conversation history into key points | Long conversations, token limits |
| **Hierarchical Memory** | Multi-level memory (working → episodic → long-term) | Complex agent systems |
| **RAG** | Retrieve relevant context from external knowledge | Knowledge-intensive tasks |
| **Fact Extraction** | Extract and store structured facts | Entity tracking, knowledge graphs |
| **Sliding Window** | Keep last N messages in context | Simple chatbots |
| **Semantic Cache** | Cache similar query responses | Cost optimization, speed |

### Interactive Tools

- **Cost Simulator** — Calculate API costs for different models and usage patterns
- **Token Calculator** — Estimate token counts for text (RU/EN)
- **API Matrix** — Compare 16+ LLM providers by price, context, speed
- **Technique Battle** — Compare techniques head-to-head
- **Decision Tree** — Find the right technique for your use case
- **Recommender** — Get personalized technique recommendations

### Learning

- **Interactive Explorer** — Visualize each technique step-by-step
- **Live Chat Demo** — See techniques in action with simulated LLM
- **Prompt Templates** — 18 ready-to-use prompts for each technique
- **Quick Quiz** — Test your knowledge with 20 questions

### Resources

- **Glossary** — 50+ terms explained
- **Case Studies** — 8 real-world implementations
- **FAQ** — Common questions answered
- **Community Insights** — Tips from practitioners

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **State**: Zustand
- **Language**: TypeScript
- **Fonts**: Inter (UI) + JetBrains Mono (code)

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page (5 tabs)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Design tokens + base styles
│
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer
│   ├── landing/           # Hero, TechniqueOverview, etc.
│   ├── tools/             # CostSimulator, TokenCalculator, etc.
│   ├── learn/             # PromptTemplates, QuickQuiz
│   ├── playground/        # LiveChatDemo, InteractiveExplorer
│   ├── resources/         # Glossary, CaseStudies, FAQ
│   ├── overlay/           # GlobalSearch, GuidedTour
│   └── effects/           # Visual effects
│
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, constants, store
├── data/                   # Static data (prompts, quiz, etc.)
└── types/                  # TypeScript definitions
```

## Architecture

After anti-monolith refactoring, all components follow a modular structure:

```
Component/
├── index.tsx              # Composer (orchestrates sections + hooks)
├── sections/              # Pure UI components (no state)
│   └── *.tsx
├── features/              # Custom hooks (state management)
│   └── use*.ts
└── types.ts               # Type definitions
```

**Rules:**
- Max 200 lines per file
- Max 2 useState per component
- sections/ = pure UI (props-driven)
- features/ = stateful hooks

## Design System

### Colors (WCAG AA Compliant)

```css
--zai-color-bg-primary: #0a0a0f;      /* Background */
--zai-color-text-primary: #E8E8ED;    /* Text (14.5:1 contrast) */
--zai-color-text-secondary: #B0B0B8;  /* Muted text (8.2:1) */
--zai-color-accent: #FFFFFF;          /* Accent */
```

### Spacing (Fibonacci Scale)

```css
--fib-1: 8px;    --fib-5: 40px;   --fib-13: 104px;
--fib-2: 16px;   --fib-8: 64px;   --fib-21: 168px;
--fib-3: 24px;
```

### Typography

| Element | Size | Weight |
|---------|------|--------|
| h1 | 64px | 700 |
| h2 | 40px | 700 |
| h3 | 24px | 600 |
| body | 16px | 400 |
| code | 14px | 400 |

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server on port 3000 |
| `bun run build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun db:push` | Push Prisma schema to database |

## Contributing

1. All components must follow the modular architecture
2. Run `bun lint` before committing
3. Keep files under 200 lines
4. Extract useState clusters to custom hooks

## License

MIT
