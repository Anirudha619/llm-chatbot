"use client";

import { useState, useEffect } from "react";
import { ChatPanel } from "./ChatPanel";
import { AlertCircle } from "lucide-react";

interface RightPanelProps {
    botName: string | null;
    systemPrompt: string | null;
    chatBotId: string | null;
}

export function RightPanel({ botName, systemPrompt, chatBotId }: RightPanelProps) {
    if (!botName) {
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

    const handleSend = async (message: string): Promise<string> => {
        if (!chatBotId) throw new Error("No chatbot ID");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/chatbot/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatBotId, question: message })
        });
        const data = await res.json();

        if (!data.status) {
            throw new Error(data.error || "Unknown error");
        }

        if (Array.isArray(data.result)) {
            return data.result.map((r: any) => r?.payload?.text || JSON.stringify(r.payload || r)).join("\n\n");
        } else if (typeof data.result === "string") {
            return data.result;
        } else {
            return JSON.stringify(data.result);
        }
    };

    return (
        <ChatPanel
            botName={botName}
            onSend={handleSend}
        />
    );
}
