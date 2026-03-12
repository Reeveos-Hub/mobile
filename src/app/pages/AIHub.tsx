import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Calendar, TrendingUp, Users, MessageSquare, Clock, Scissors } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const C = {
  bg: "#FFFFFF",
  dark: "#111111",
  gold: "#C9A84C",
  goldLight: "#F5EDD6",
  muted: "#999999",
  subtle: "#F0F0F0",
};

interface Message {
  id: number;
  from: "ai" | "user";
  text: string;
  card?: { type: "draft" | "schedule" | "stats"; data: any };
}

const initialMessages: Message[] = [
  {
    id: 1,
    from: "ai",
    text: "Good morning. You have **2 gap hours** this afternoon (2–4 PM). Want me to create an Instagram story or notify waitlisted clients?",
  },
  {
    id: 2,
    from: "user",
    text: "Yes, draft an Instagram story for the 2PM slot.",
  },
  {
    id: 3,
    from: "ai",
    text: "Here's your draft — ready to copy:",
    card: {
      type: "draft",
      data: {
        text: '"Last minute opening today at 2 PM! Swipe up to grab a cut & style. First come, first served!"',
      },
    },
  },
];

const quickReplies = [
  { icon: Calendar, text: "Reschedule client" },
  { icon: TrendingUp, text: "This week's revenue" },
  { icon: Users, text: "Draft client reply" },
  { icon: MessageSquare, text: "Social post idea" },
  { icon: Clock, text: "Today's schedule" },
  { icon: Scissors, text: "Service suggestions" },
];

// Simulated AI responses
const aiResponses: Record<string, Message> = {
  "reschedule sarah": {
    id: 0, from: "ai",
    text: "Sarah Jenkins' Balayage & Cut is currently at **10:30 AM Thursday**. I found 3 available slots:",
    card: {
      type: "schedule",
      data: {
        slots: [
          { day: "Fri 14", time: "9:00 AM", duration: "2h 30m" },
          { day: "Sat 15", time: "11:00 AM", duration: "2h 30m" },
          { day: "Mon 17", time: "2:00 PM", duration: "2h 30m" },
        ],
      },
    },
  },
  "this week's revenue": {
    id: 0, from: "ai",
    text: "Here's your revenue breakdown for this week:",
    card: {
      type: "stats",
      data: {
        total: "£3,870",
        change: "+18%",
        breakdown: [
          { label: "Services", value: "£2,940" },
          { label: "Products", value: "£620" },
          { label: "Gift Cards", value: "£310" },
        ],
      },
    },
  },
};

function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: C.gold }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function AIHub() {
  const { user, businessId } = useAuth();
  const { data: summary } = useApi<any>(businessId ? `/dashboard/business/${businessId}/summary` : null);
  const firstName = user?.name?.split(' ')[0] || 'there';
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(4);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { id: nextId.current++, from: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const key = msg.toLowerCase();
      const matched = Object.entries(aiResponses).find(([k]) => key.includes(k));

      if (matched) {
        const response = { ...matched[1], id: nextId.current++ };
        setMessages((prev) => [...prev, response]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId.current++,
            from: "ai",
            text: `Got it! I'll look into "${msg}" for you. Based on your calendar and client data, I can help with scheduling, marketing, and analytics. What would you like me to focus on?`,
          },
        ]);
      }
      setIsTyping(false);
    }, 1500);
  };

  const renderCard = (card: Message["card"]) => {
    if (!card) return null;

    if (card.type === "draft") {
      return (
        <div className="mt-2">
          <div className="p-3 rounded-[10px]" style={{ backgroundColor: C.bg, border: `1px solid ${C.subtle}` }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: C.muted, fontStyle: "italic", lineHeight: 1.5 }}>
              {card.data.text}
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="px-2.5 py-1 rounded-full active:scale-95" style={{ backgroundColor: C.gold, fontSize: 10, fontWeight: 800, color: "#FFFFFF" }}>Copy</button>
            <button className="px-2.5 py-1 rounded-full active:scale-95" style={{ backgroundColor: C.subtle, fontSize: 10, fontWeight: 700, color: C.muted }}>Regenerate</button>
          </div>
        </div>
      );
    }

    if (card.type === "schedule") {
      return (
        <div className="mt-2 space-y-1.5">
          {card.data.slots.map((slot: any, i: number) => (
            <button
              key={i}
              className="w-full flex items-center justify-between px-3 py-2 rounded-[10px] active:scale-[0.98] transition-transform"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.subtle}` }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.gold }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>{slot.day}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>{slot.time}</span>
              </div>
              <span style={{ fontSize: 9, fontWeight: 600, color: C.muted }}>{slot.duration}</span>
            </button>
          ))}
          <p style={{ fontSize: 9, fontWeight: 500, color: C.muted, marginTop: 4 }}>Tap a slot to reschedule automatically</p>
        </div>
      );
    }

    if (card.type === "stats") {
      return (
        <div className="mt-2 p-3 rounded-[10px]" style={{ backgroundColor: C.bg, border: `1px solid ${C.subtle}` }}>
          <div className="flex items-end justify-between mb-2.5">
            <p style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -1, lineHeight: 1 }}>{card.data.total}</p>
            <span className="flex items-center gap-0.5" style={{ fontSize: 10, fontWeight: 800, color: "#10B981" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="m5 12 7-7 7 7"/></svg>
              {card.data.change}
            </span>
          </div>
          <div className="space-y-1.5">
            {card.data.breakdown.map((item: any) => (
              <div key={item.label} className="flex items-center justify-between">
                <span style={{ fontSize: 10, fontWeight: 500, color: C.muted }}>{item.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const formatText = (text: string) => {
    // Simple bold markdown parsing
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} style={{ color: C.gold, fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-full font-['Figtree']" style={{ backgroundColor: C.bg }}>
      {/* Header */}
      <header className="px-5 pt-[58px] pb-3 sticky top-0 z-20 shrink-0" style={{ backgroundColor: `${C.bg}EE`, backdropFilter: "blur(16px)" }}>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-1.5" style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>
            Reeve AI <Sparkles size={16} color={C.gold} />
          </h1>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: C.goldLight }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#10B981" }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: C.gold }}>Online</span>
          </div>
        </div>
        <p style={{ fontSize: 11, fontWeight: 500, color: C.muted, marginTop: 2 }}>Your premium salon assistant</p>
      </header>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 pt-2 pb-2 flex flex-col gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i < 3 ? i * 0.1 : 0 }}
            className={`flex gap-2.5 items-start ${msg.from === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.from === "ai" ? (
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md" style={{ backgroundColor: C.gold }}>
                <Sparkles size={12} color="#FFFFFF" />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border-[1.5px] flex items-center justify-center" style={{ borderColor: C.gold, backgroundColor: '#F5EDD6' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: C.gold }}>{firstName[0]}</span>
              </div>
            )}
            <div
              className={`rounded-[14px] p-3 max-w-[82%] ${msg.from === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
              style={{
                backgroundColor: msg.from === "user" ? C.goldLight : "#FFFFFF",
                border: msg.from === "ai" ? `1px solid ${C.subtle}` : "none",
              }}
            >
              <p style={{ fontSize: 12, lineHeight: 1.6, fontWeight: msg.from === "user" ? 600 : 500, color: C.dark }}>
                {formatText(msg.text)}
              </p>
              {renderCard(msg.card)}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex gap-2.5 items-start"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md" style={{ backgroundColor: C.gold }}>
                <Sparkles size={12} color="#FFFFFF" />
              </div>
              <div className="rounded-[14px] rounded-tl-sm px-4 py-3" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.subtle}` }}>
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick replies */}
      <div className="px-5 py-2 flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden shrink-0">
        {quickReplies.map((s, i) => (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.04 }}
            key={i}
            onClick={() => handleSend(s.text)}
            className="flex items-center gap-1.5 rounded-full px-3 py-2 whitespace-nowrap active:scale-95 shrink-0"
            style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.subtle}` }}
          >
            <s.icon size={11} color={C.gold} />
            <span style={{ fontSize: 10, fontWeight: 700, color: C.dark }}>{s.text}</span>
          </motion.button>
        ))}
      </div>

      {/* Input */}
      <div className="w-full px-5 pt-2 pb-4 z-10 shrink-0" style={{ background: `linear-gradient(to top, ${C.bg}, ${C.bg}EE, transparent)` }}>
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Reeve..."
            className="w-full rounded-full h-11 pl-4 pr-12 outline-none transition-colors"
            style={{ fontSize: 12, fontWeight: 500, color: C.dark, backgroundColor: "#FFFFFF", border: `1.5px solid ${C.subtle}` }}
          />
          <button
            type="submit"
            className="absolute right-1.5 w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{ backgroundColor: input.trim() ? C.gold : C.subtle }}
          >
            <Send size={14} className="ml-0.5" color={input.trim() ? "#FFFFFF" : C.muted} />
          </button>
        </form>
      </div>
    </div>
  );
}
