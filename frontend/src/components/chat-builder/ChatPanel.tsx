"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot } from "lucide-react";

export interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatPanelProps {
    botName: string;
    initialMessage?: string;
    onSend?: (message: string) => Promise<string>;
    className?: string;
    showHeader?: boolean;
}

export function ChatPanel({ 
    botName, 
    initialMessage, 
    onSend,
    className = "",
    showHeader = true 
}: ChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: initialMessage || `Hello! I am ${botName}. How can I assist you?` }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([
            { role: "assistant", content: initialMessage || `Hello! I am ${botName}. How can I assist you?` }
        ]);
    }, [botName, initialMessage]);

    const handleSend = async () => {
        if (!input.trim() || !onSend) return;

        const userMessage = { role: "user" as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await onSend(input);
            setMessages(prev => [...prev, { role: "assistant", content: response }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: "assistant", content: "Error occurred." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`h-full flex flex-col overflow-hidden ${className}`}>
            {showHeader && (
                <div className="flex items-center gap-3 border-b px-5 py-4">
                    <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white dark:text-black" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-foreground">{botName}</h2>
                        <p className="text-xs text-green-600 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
            )}

            <ScrollArea className="flex-1 min-h-0 h-0 p-5 space-y-4" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                            m.role === 'user'
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white'
                        }`}>
                            {m.content === "..." ? (
                                <div className="flex justify-start">
                                    <div className="flex gap-1.5 rounded-2xl bg-zinc-100 px-5 py-4 dark:bg-zinc-800">
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "0ms" }} />
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "150ms" }} />
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            ) : m.content}
                        </div>
                    </div>
                ))}
                {loading && messages[messages.length - 1]?.role !== "assistant" && (
                    <div className="flex justify-start">
                        <div className="flex gap-1.5 rounded-2xl bg-zinc-100 px-5 py-4 dark:bg-zinc-800">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "0ms" }} />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "150ms" }} />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </ScrollArea>

            <div className="flex items-center gap-3 border-t px-5 py-4">
                <div className="flex h-10 w-full items-center rounded-full bg-zinc-100 px-5 text-sm text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
                    <Input
                        className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="shrink-0 -mr-2"
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                    >
                        <Send className="w-4 h-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
