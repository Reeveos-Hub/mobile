import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

const initialMessages: Message[] = [
  { id: 1, role: "ai", text: "Hey Natalie 👋 You've got 8 bookings today and you're tracking 12% ahead of last week. What do you need?" },
  { id: 2, role: "user", text: "How many no-shows this month?" },
  { id: 3, role: "ai", text: "Just 2 no-shows this month — that's a 1.8% rate, well below the industry average of 5%. Grace Williams and Amy Roberts. Want me to set up auto-reminders for them?" },
  { id: 4, role: "user", text: "Yes, send reminders" },
  { id: 5, role: "ai", text: "Done ✓ — I've added 24hr and 2hr SMS reminders for both clients. They'll go out automatically before their next appointments." },
];

export function AIChatSheet({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: Date.now(), role: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: "Let me check that for you... Based on your data, your busiest days are Tuesday and Thursday. Would you like me to block out some self-care time on quieter days?" },
      ]);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="absolute left-0 right-0 bottom-0 z-50 bg-white flex flex-col"
            style={{ borderRadius: "24px 24px 0 0", height: "75%", boxShadow: "0 -12px 48px rgba(0,0,0,0.15)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 shrink-0" style={{ borderBottom: "1px solid #F0F0F0" }}>
              <div className="flex items-center gap-2.5">
                <div className="relative" style={{ width: 28, height: 28 }}>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-full" style={{ backgroundColor: "rgba(201,168,76,0.2)" }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" fill="#C9A84C" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111111", lineHeight: 1.2 }}>ReeveOS</p>
                  <p style={{ fontSize: 10, fontWeight: 500, color: "#22C55E" }}>Online · knows your business</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center"
                style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#F3F4F6" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 4l6 6M10 4l-6 6" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[82%] ${msg.role === "user" ? "self-end" : "self-start"}`}
                >
                  <div
                    className="px-4 py-3"
                    style={{
                      backgroundColor: msg.role === "user" ? "#111111" : "#F5F3EE",
                      color: msg.role === "user" ? "#FFFFFF" : "#111111",
                      fontSize: 13,
                      fontWeight: 500,
                      lineHeight: 1.5,
                      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Suggestion chips */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto shrink-0" style={{ borderTop: "1px solid #F5F5F5" }}>
              {["Revenue this week", "Next gap today", "Send a reminder"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => { setInput(chip); }}
                  className="shrink-0 px-3.5 py-2"
                  style={{
                    borderRadius: 20,
                    border: "1.5px solid #EBEBEB",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#666",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 flex items-center gap-2.5 shrink-0">
              <div
                className="flex-1 flex items-center gap-2 px-4 py-2.5"
                style={{ borderRadius: 50, border: "1.5px solid #EBEBEB", backgroundColor: "#FAFAF8" }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: 13, fontWeight: 500, color: "#111111" }}
                />
              </div>
              {input.trim() ? (
                <motion.button
                  onClick={handleSend}
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: "#111111" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8l10-5-3 5 3 5L2 8z" fill="#C9A84C" />
                  </svg>
                </motion.button>
              ) : (
                <button
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: "#F5F5F5" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="5" y="2" width="6" height="8" rx="3" stroke="#999" strokeWidth="1.3" />
                    <path d="M3 8a5 5 0 0010 0" stroke="#999" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M8 13v2" stroke="#999" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
