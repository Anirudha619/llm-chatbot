"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, AlertCircle } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface RightPanelProps {
    botName: string | null;
    systemPrompt: string | null;
    chatBotId: string | null;
}

export function RightPanel({ botName, systemPrompt, chatBotId }: RightPanelProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I am ready to help you." }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (botName) {
            setMessages([
                { role: "assistant", content: `Hello! I am ${botName}. How can I assist you?` }
            ]);
        }
    }, [botName]);

    const handleSend = async () => {
        if (!input.trim() || !botName || !chatBotId) return;

        const newMessages: Message[] = [
            ...messages,
            { role: "user", content: input }
        ];
        setMessages([...newMessages, { role: "assistant", content: "..." }]); // loading indicator
        setInput("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/chatbot/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chatBotId: chatBotId,
                    // chatBotId, 
                    question: input
                })
            });
            const data = await res.json();
            if (data.status) {
                let answer = "";
                if (Array.isArray(data.result)) {
                    answer = data.result.map((r: any) => r?.payload?.text || JSON.stringify(r.payload || r)).join("\n\n");
                } else if (typeof data.result === "string") {
                    answer = data.result;
                } else {
                    answer = JSON.stringify(data.result);
                }

                setMessages([
                    ...newMessages,
                    { role: "assistant", content: answer }
                ]);
            } else {
                setMessages([
                    ...newMessages,
                    { role: "assistant", content: "Error: " + (data.error || "Unknown error") }
                ]);
            }
        } catch (err) {
            console.error(err);
            setMessages([
                ...newMessages,
                { role: "assistant", content: "Network error occurred." }
            ]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!botName) {
        // if (false) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-slate-400" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">No Chatbot Configured</h2>
                <p className="text-slate-500 max-w-md">
                    Configure your chatbot on the left panel, upload documents, and click "Create Chatbot" to preview it here.
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Header */}
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

            {/* Messages */}
            <ScrollArea className="flex-1 min-h-0 h-0 p-4" ref={scrollRef}>
                <div className="space-y-4">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[75%] rounded-2xl p-3 ${m.role === 'user'
                                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                                    : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                                    }`}
                            >
                                <div className="flex items-center space-x-2 mb-1">
                                    {m.role === 'assistant' ? <Bot className="w-4 h-4 opacity-70" /> : <User className="w-4 h-4 opacity-70" />}
                                    <span className="text-xs font-medium opacity-70">
                                        {m.role === 'assistant' ? botName : 'You'}
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Input area */}
            <div className="p-4 bg-white border-t shrink-0">
                <div className="flex items-center space-x-2 bg-slate-50 border rounded-full px-2 py-1 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <Input
                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-3"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button
                        size="icon"
                        className="rounded-full shrink-0"
                        onClick={handleSend}
                        disabled={!input.trim()}
                    >
                        <Send className="w-4 h-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
                <p className="text-center text-[10px] text-muted-foreground mt-2">
                    Powered by {botName} • AI Preview
                </p>
            </div>
        </div>
    );
}
