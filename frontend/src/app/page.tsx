import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, Zap, MessageSquare, Globe, ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative selection:bg-primary/20">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 right-0 -m-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 -m-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>

            {/* Navigation */}
            <nav className="relative z-10 border-b bg-white/60 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-bold text-xl tracking-tight text-slate-800">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <span>LLM Chatbot</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/chatbot-builder">
                            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium">Sign In</Button>
                        </Link>
                        <Link href="/chatbot-builder">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm font-medium">
                                Launch App
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center flex flex-col items-center">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 mb-8 shadow-sm">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">The ultimate AI Agent for your website</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-slate-900">
                    Deploy an Intelligent <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">LLM Chatbot</span> in Minutes.
                </h1>

                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
                    Train a custom AI on your own documents. Embed a powerful, conversational AI companion directly onto your website to engage visitors, answer questions, and drive conversions 24/7.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md mb-20">
                    <Link href="/chatbot-builder" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full h-14 px-8 text-lg font-medium bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all group">
                            Start Building Free
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    {/* <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-medium bg-white hover:bg-slate-50 text-slate-700 shadow-sm border-slate-200">
                        View Demo
                    </Button> */}
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full text-left">
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 transition-transform hover:-translate-y-1 hover:shadow-md">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary ring-1 ring-primary/20">
                            <Bot className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Custom Trained AI</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">Upload TXT documents directly to your knowledge base. Your bot learns your specific content instantly.</p>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 transition-transform hover:-translate-y-1 hover:shadow-md">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 ring-1 ring-blue-200">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Universal Integration</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">Drop a single line of script onto your website and go live. Compatible with React, HTML, Webflow and more.</p>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 transition-transform hover:-translate-y-1 hover:shadow-md">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600 ring-1 ring-purple-200">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Engage Visitors 24/7</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">Never miss a lead. Your intelligent assistant answers queries seamlessly, freeing up your team's time.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
