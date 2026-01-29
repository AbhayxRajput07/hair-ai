"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Role = "user" | "assistant";
type Tone = "Friendly" | "Professional" | "Funny" | "Empathetic";

type Message = {
  id: number;
  role: Role;
  text: string;
};

type ChatSession = {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
};

export default function HairAssistantPage() {
  const [aiName, setAiName] = useState("Aura");
  const [tone, setTone] = useState<Tone>("Friendly");
  const [showSettings, setShowSettings] = useState(false);
  const [conversationMode, setConversationMode] = useState(false);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  function createNewSession(): ChatSession {
    return {
      id: `session-${Date.now()}`,
      title: "New chat",
      createdAt: Date.now(),
      messages: [],
    };
  }

  function deriveTitleFromMessages(msgs: Message[]): string {
    const firstUser = msgs.find((m) => m.role === "user");
    if (!firstUser) return "New chat";
    const clean = firstUser.text.trim();
    return clean.length > 36 ? clean.slice(0, 33) + "…" : clean;
  }

  useEffect(() => {
    const saved = localStorage.getItem("hairAssistantSessions");
    const name = localStorage.getItem("hairAiName");
    const savedTone = localStorage.getItem("hairAiTone") as Tone | null;

    if (name) setAiName(name);
    if (savedTone) setTone(savedTone);

    if (saved) {
      const parsed = JSON.parse(saved) as ChatSession[];
      setSessions(parsed);
      setActiveSessionId(parsed[0]?.id ?? null);
      setMessages(parsed[0]?.messages ?? []);
      return;
    }

    const first = createNewSession();
    setSessions([first]);
    setActiveSessionId(first.id);
  }, []);

  useEffect(() => {
    localStorage.setItem("hairAssistantSessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem("hairAiName", aiName);
    localStorage.setItem("hairAiTone", tone);
  }, [aiName, tone]);

  useEffect(() => {
    const current = sessions.find((s) => s.id === activeSessionId);
    if (current) setMessages(current.messages);
  }, [activeSessionId, sessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.onresult = (e: any) => {
      setIsListening(false);
      handleSend(e.results[0][0].transcript);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);

    recognitionRef.current = rec;
  }, []);

  function startListening() {
    if (!recognitionRef.current) return;
    setIsListening(true);
    recognitionRef.current.start();
  }

  function speak(text: string) {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const u = new SpeechSynthesisUtterance(text);
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    synth.speak(u);
  }

  function buildReply(text: string) {
    return `I'm ${aiName}. Based on what you shared, here's my guidance:\n\n${text}`;
  }

  function syncMessages(updated: Message[]) {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? { ...s, messages: updated, title: deriveTitleFromMessages(updated) }
          : s
      )
    );
  }

  function handleSend(textOverride?: string) {
    const content = (textOverride ?? input).trim();
    if (!content) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: content,
    };

    const botText = buildReply(content);
    const botMsg: Message = {
      id: Date.now() + 1,
      role: "assistant",
      text: botText,
    };

    const updated = [...messages, userMsg, botMsg];
    setMessages(updated);
    syncMessages(updated);
    setInput("");

    if (conversationMode) speak(botText);
  }

  function handleNewChat() {
    const s = createNewSession();
    setSessions((prev) => [s, ...prev]);
    setActiveSessionId(s.id);
    setMessages([]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1020] via-[#06080f] to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-4">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-14"
          } transition-all bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3`}
        >
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="mb-4 w-full h-10 rounded-xl bg-white/10"
          >
            ☰
          </button>

          {sidebarOpen && (
            <>
              <button
                onClick={handleNewChat}
                className="w-full mb-3 py-2 rounded-xl bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] text-black font-semibold"
              >
                + New Chat
              </button>

              <div className="space-y-1 max-h-[520px] overflow-y-auto">
                {sessions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSessionId(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                      s.id === activeSessionId
                        ? "bg-white/15"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </>
          )}
        </aside>

        {/* Main */}
        <div className="flex-1 space-y-4">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                {aiName} — Hair AI Assistant
              </h1>
              <p className="text-sm text-gray-400">
                Personalised hair & scalp guidance
              </p>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              ⚙ Customize
            </button>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Chat */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 flex flex-col min-h-[520px]">
              <div className="flex-1 space-y-3 overflow-y-auto">
                {messages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm text-center">
                    Start chatting with {aiName} about hair fall, scalp, routine
                    or diet.
                  </div>
                )}

                <AnimatePresence>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        m.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                          m.role === "user"
                            ? "bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] text-black"
                            : "bg-white/10 border border-white/10"
                        }`}
                      >
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={startListening}
                  className={`w-10 h-10 rounded-full ${
                    isListening
                      ? "bg-red-500/30"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  🎤
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message…"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  className="px-4 py-2 rounded-full bg-white text-black font-semibold"
                >
                  Send
                </button>
              </div>
            </section>

            {/* Voice */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col items-center justify-center min-h-[520px]">
              <h2 className="text-lg font-semibold mb-2">Voice Conversation</h2>
              <p className="text-xs text-gray-400 mb-6 text-center">
                Tap and speak to {aiName}
              </p>

              <motion.div
                animate={{
                  scale: isListening || isSpeaking ? 1.08 : 1,
                }}
                onClick={startListening}
                className="w-64 h-64 rounded-full bg-gradient-to-br from-[#7c7cff] to-[#4fd1c5] shadow-[0_0_60px_rgba(124,124,255,0.7)] flex items-center justify-center cursor-pointer"
              >
                <div className="w-40 h-40 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-center text-sm px-4">
                  {isListening
                    ? "Listening…"
                    : isSpeaking
                    ? "Speaking…"
                    : `Talk to ${aiName}`}
                </div>
              </motion.div>

              <p className="mt-5 text-[11px] text-gray-400">
                Allow microphone access in your browser
              </p>
            </section>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="w-full max-w-md rounded-2xl bg-[#0b1020] border border-white/10 p-6">
            <h3 className="text-xl font-semibold mb-4">Customize Assistant</h3>

            <div className="space-y-4">
              <input
                value={aiName}
                onChange={(e) => setAiName(e.target.value)}
                placeholder="AI Name"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
              />
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
              >
                <option>Friendly</option>
                <option>Professional</option>
                <option>Funny</option>
                <option>Empathetic</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded-full bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConversationMode(true);
                  setShowSettings(false);
                }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] text-black font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
