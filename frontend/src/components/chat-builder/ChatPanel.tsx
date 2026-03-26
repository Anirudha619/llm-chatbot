"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

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
                <div className="p-4 border-b bg-white flex items-center space-x-3 shadow-sm z-10">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-800">{botName}</h2>
                        <p className="text-xs text-green-600 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
            )}

            <ScrollArea className="flex-1 min-h-0 h-0 p-4" ref={scrollRef}>
                <div className="space-y-4">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-2xl p-3 ${m.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-br-sm'
                                : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                                }`}>
                                <div className="flex items-center space-x-2 mb-1">
                                    {m.role === 'assistant' ? <Bot className="w-4 h-4 opacity-70" /> : <User className="w-4 h-4 opacity-70" />}
                                    <span className="text-xs font-medium opacity-70">
                                        {m.role === 'assistant' ? botName : 'You'}
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {m.content === "..." ? <span className="animate-pulse">Thinking...</span> : m.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="p-4 bg-white border-t shrink-0">
                <div className="flex items-center space-x-2 bg-slate-50 border rounded-full px-2 py-1 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <Input
                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-3"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <Button
                        size="icon"
                        className="rounded-full shrink-0"
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
