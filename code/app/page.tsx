"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, MessageCircle, Brain, FileText } from "lucide-react"
import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-background to-blue-950 opacity-50" />
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? "bg-background/80 backdrop-blur-lg border-b border-border" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 float-up">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Agent
            </span>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 scale-in">
            Get Started
          </Button>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Powered by Advanced AI</span>
          </div>

          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-6 transition-all duration-1000 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <span className="bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200 bg-clip-text text-transparent animate-gradient-shift">
              AI Agent Assistant
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Your intelligent companion for summarizing content, answering questions, and seamless conversations. Powered
            by cutting-edge AI technology.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              onClick={() => setShowChat(true)}
              className="px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
            >
              Try Chat Demo
              <MessageCircle className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-500/30 rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-purple-500 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Everything you need to work smarter with AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: "Summarize",
                description:
                  "Extract key insights from any content instantly. Perfect for documents, articles, and long-form text.",
                color: "from-purple-500/20 to-purple-600/20",
                border: "border-purple-500/30",
                delay: "0s",
              },
              {
                icon: Brain,
                title: "Q&A",
                description:
                  "Get instant answers to your questions with contextual understanding and detailed explanations.",
                color: "from-blue-500/20 to-cyan-600/20",
                border: "border-blue-500/30",
                delay: "0.2s",
              },
              {
                icon: MessageCircle,
                title: "Chat",
                description:
                  "Have natural conversations with AI. Ask follow-ups, refine answers, and explore topics deeply.",
                color: "from-pink-500/20 to-purple-600/20",
                border: "border-pink-500/30",
                delay: "0.4s",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className={`group relative scale-in`} style={{ animationDelay: feature.delay }}>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />

                  <div
                    className={`relative bg-background/50 backdrop-blur-xl border-2 ${feature.border} rounded-xl p-8 hover:bg-background/80 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2`}
                  >
                    <div
                      className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} border ${feature.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-purple-300" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-0 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {showChat && (
        <section className="relative py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Try It Now
                </span>
              </h2>
              <Button
                onClick={() => setShowChat(false)}
                variant="outline"
                className="border-purple-500/30 hover:bg-purple-500/10"
              >
                Close
              </Button>
            </div>
            <ChatInterface />
          </div>
        </section>
      )}

      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 p-12 text-center backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience the Future?</h2>
              <p className="text-gray-300 text-lg mb-8">
                Join thousands of users already using AI Agent Assistant to boost their productivity.
              </p>
              <Button className="px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-border/50 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 sm:mb-0">© 2025 AI Agent Assistant. All rights reserved.</div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
