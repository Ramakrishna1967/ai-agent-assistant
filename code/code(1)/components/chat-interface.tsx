"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm the AI Agent Assistant. How can I help you today? You can ask me to summarize content, answer questions, or just chat!",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const responses: { [key: string]: string[] } = {
      summarize: [
        "I can summarize any text, article, or document for you! Just paste the content and I'll extract the key points and main ideas in a concise format.",
        "Summarization is my specialty. I can condense long documents into brief, digestible summaries while preserving the important information.",
        "Need a summary? I excel at analyzing content and providing you with the essential insights you need to know quickly.",
      ],
      "q&a": [
        "I'm great at answering questions! Ask me anything about your documents, topics, or anything you'd like to know more about.",
        "Questions are my jam! Whether it's specific facts, explanations, or deeper insights, I can help you find the answers you're looking for.",
        "Feel free to ask me any questions. I'll provide detailed, contextual answers tailored to what you need.",
      ],
      chat: [
        "I love chatting! We can have natural conversations where you can ask follow-up questions and explore topics in depth.",
        "Chat away! I'm here for natural, ongoing conversations where we can dive deeper into any topic you're interested in.",
        "Let's have a conversation! I'm designed to handle back-and-forth discussions where we can really explore ideas together.",
      ],
      hello: [
        "Hi there! How can I assist you today? Whether you need summaries, answers, or just a chat, I'm ready to help!",
        "Hey! Great to meet you. What can I do for you? I can summarize, answer questions, or just have a conversation.",
        "Hello! I'm here and ready to help. What would you like to do today?",
      ],
      help: [
        "I can help you in three main ways: 1) Summarize content - extract key insights from any text. 2) Answer questions - get detailed answers to your queries. 3) Chat - have natural conversations about any topic.",
        "I'm here to help! I specialize in summarizing content, answering your questions, and having meaningful conversations. What do you need?",
        "Of course! I can summarize documents, answer any questions you have, or just chat with you about topics you're interested in.",
      ],
      default: [
        "That's interesting! I'm always learning and improving. Feel free to ask me to summarize something, answer questions, or just chat more about this topic.",
        "I appreciate that! If you'd like, I can help you summarize content, answer specific questions, or continue our conversation deeper.",
        "Great point! Would you like me to help with anything specific, like summarizing content or answering questions about this topic?",
      ],
    }

    const lowerMessage = userMessage.toLowerCase()
    let category = "default"

    if (lowerMessage.includes("summarize") || lowerMessage.includes("summary")) {
      category = "summarize"
    } else if (lowerMessage.includes("question") || lowerMessage.includes("q&a") || lowerMessage.includes("qa")) {
      category = "q&a"
    } else if (lowerMessage.includes("chat")) {
      category = "chat"
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      category = "hello"
    } else if (lowerMessage.includes("help")) {
      category = "help"
    }

    const categoryResponses = responses[category]
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-purple-500/30 backdrop-blur-xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-b border-purple-500/20 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-white">Chat with AI Agent</h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Try asking about summarize, Q&A, or just chat</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-96">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-xs sm:max-w-sm px-4 py-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none"
                  : "bg-slate-800/60 text-gray-100 border border-purple-500/30 rounded-bl-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/60 text-gray-100 border border-purple-500/30 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              <span className="text-sm">AI Agent is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-purple-500/20 p-4 sm:p-6 bg-slate-950/50">
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me something..."
            className="flex-1 bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 sm:px-6 transition-all"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
