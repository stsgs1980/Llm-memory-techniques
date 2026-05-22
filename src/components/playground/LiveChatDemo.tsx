'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Trash2, Brain, Eye, EyeOff, Bot, User } from 'lucide-react';
import { estimateTokens } from '@/lib/constants';
import { useChatDemo, TECHNIQUE_IDS, TECHNIQUE_LABELS } from '@/hooks/useChatDemo';

export default function LiveChatDemo() {
  const {
    messages,
    inputText,
    activeTechnique,
    showMemory,
    isTyping,
    scrollRef,
    totalTokens,
    contextUsage,
    savings,
    estimatedCost,
    setInputText,
    setActiveTechnique,
    setShowMemory,
    handleSend,
    handleClear,
    getMemorySnapshot,
  } = useChatDemo();

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full min-h-[600px]">
      {/* Chat Panel */}
      <div className="lg:w-2/3 flex flex-col industrial-card overflow-hidden">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="font-mono text-sm text-primary flex items-center gap-2">
              <Bot className="h-4 w-4" />
              LIVE ЧАТ
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleClear} className="h-7 w-7">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMemory(!showMemory)}
                className="h-7 w-7"
              >
                {showMemory ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>

          {/* Technique Selector */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {TECHNIQUE_IDS.map(id => (
              <Button
                key={id}
                variant={activeTechnique === id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTechnique(id)}
                className={`text-xs font-mono h-7 px-2.5 ${
                  activeTechnique === id ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                {TECHNIQUE_LABELS[id]}
              </Button>
            ))}
          </div>
        </CardHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-industrial-slide-up`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-md p-3 ${
                    msg.role === 'user'
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-card border border-border'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {msg.role === 'user' ? (
                      <User className="h-3 w-3 text-primary" />
                    ) : (
                      <Bot className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      {msg.role === 'user' ? 'Вы' : 'AI'}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      ~{estimateTokens(msg.content)} токенов
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground/50">
                      {new Date(msg.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-industrial-pulse">
                <div className="bg-card border border-border rounded-md p-3">
                  <div className="flex items-center gap-1.5">
                    <Brain className="h-3 w-3 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground">Думает...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-3 border-t border-border">
          <div className="flex gap-2">
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Введите сообщение..."
              rows={1}
              className="flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono min-h-[36px] max-h-[120px]"
            />
            <Button
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              size="sm"
              className="bg-primary text-primary-foreground h-[36px] px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Memory Monitor Panel */}
      {showMemory && (
        <div className="lg:w-1/3 flex flex-col gap-4">
          <Card className="industrial-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-xs text-primary flex items-center gap-2">
                <Brain className="h-3.5 w-3.5" />
                МОНИТОР ПАМЯТИ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Active Technique */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">Техника</span>
                <Badge variant="outline" className="font-mono text-xs">
                  {TECHNIQUE_LABELS[activeTechnique]}
                </Badge>
              </div>

              {/* Token Counter */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-muted-foreground">Токены</span>
                  <span className="text-xs font-mono font-medium">
                    ~{totalTokens}
                    {activeTechnique !== 'none' && (
                      <span className="text-emerald-500 ml-1">(экономия: {savings}%)</span>
                    )}
                  </span>
                </div>
                {/* Context Usage Bar */}
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${contextUsage}%`,
                      backgroundColor:
                        contextUsage > 80
                          ? '#ef4444'
                          : contextUsage > 50
                            ? '#f59e0b'
                            : '#22c55e',
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] font-mono text-muted-foreground">0</span>
                  <span className="text-[10px] font-mono text-muted-foreground">128K</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded bg-muted/50">
                  <div className="text-sm font-mono font-medium">{messages.length}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">Сообщений</div>
                </div>
                <div className="text-center p-2 rounded bg-muted/50">
                  <div className="text-sm font-mono font-medium">~{totalTokens}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">Токенов</div>
                </div>
                <div className="text-center p-2 rounded bg-muted/50">
                  <div className="text-sm font-mono font-medium">${estimatedCost.toFixed(4)}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">Стоимость</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Memory Snapshot */}
          <Card className="industrial-card flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-xs text-primary flex items-center gap-2">
                <Eye className="h-3.5 w-3.5" />
                СНЕПШОТ ПАМЯТИ
              </CardTitle>
              <p className="text-[10px] text-muted-foreground">Что «видит» LLM прямо сейчас</p>
            </CardHeader>
            <CardContent>
              <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap bg-muted/30 rounded p-3 max-h-[240px] overflow-y-auto scrollbar-industrial border border-border/50">
                {getMemorySnapshot()}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
