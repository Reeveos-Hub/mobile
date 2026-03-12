import { useAuth } from "../lib/AuthContext";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

type Step = "amount" | "tap" | "done";

export function PaymentScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("85.00");

  const handleCharge = () => {
    setStep("tap");
    setTimeout(() => setStep("done"), 3000);
  };

  const handleNumPad = (val: string) => {
    if (val === "back") {
      setAmount((prev) => prev.length > 1 ? prev.slice(0, -1) : "0");
    } else if (val === ".") {
      if (!amount.includes(".")) setAmount((prev) => prev + ".");
    } else {
      setAmount((prev) => prev === "0" ? val : prev + val);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-5 pt-[56px] pb-2.5 flex items-center gap-3 shrink-0" style={{ borderBottom: "1px solid #F0F0F0" }}>
        <button
          onClick={() => navigate(-1 as any)}
          className="flex items-center justify-center"
          style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#F3F4F6" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p style={{ fontSize: 15, fontWeight: 800, color: "#111111", lineHeight: 1.2 }}>Take Payment</p>
          <p style={{ fontSize: 10, fontWeight: 500, color: "#999" }}>Stripe Tap to Pay</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "amount" && (
          <motion.div key="amount" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
            {/* Amount display */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <p style={{ fontSize: 10, fontWeight: 600, color: "#BBBBBB", letterSpacing: 1, textTransform: "uppercase" }}>Amount to charge</p>
              <div className="flex items-baseline mt-2">
                <span style={{ fontSize: 24, fontWeight: 800, color: "#111111" }}>£</span>
                <span style={{ fontSize: 44, fontWeight: 800, color: "#111111", lineHeight: 1, letterSpacing: -2 }}>{amount}</span>
              </div>
              <p className="mt-1.5" style={{ fontSize: 11, fontWeight: 500, color: "#BBBBBB" }}>Charging as {user?.name}</p>
            </div>

            {/* Custom number pad */}
            <div className="px-5 pb-3">
              <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleNumPad(key)}
                    className="flex items-center justify-center"
                    style={{
                      height: 46,
                      borderRadius: 12,
                      backgroundColor: key === "back" || key === "." ? "transparent" : "#F5F5F5",
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#111111",
                    }}
                  >
                    {key === "back" ? (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M8 6l-4 5 4 5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 11h14" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    ) : key}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCharge}
                className="w-full py-3.5"
                style={{
                  borderRadius: 14,
                  backgroundColor: "#111111",
                  boxShadow: "0 4px 16px rgba(17,17,17,0.25)",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: "#C9A84C" }}>Charge £{amount}</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === "tap" && (
          <motion.div key="tap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center px-6">
            {/* Pulsing NFC indicator */}
            <div className="relative" style={{ width: 120, height: 120 }}>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid rgba(201,168,76,0.15)" }}
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid rgba(201,168,76,0.15)" }}
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.5 }}
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))" }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M14 26c-3.3-3.3-3.3-8.7 0-12" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                  <path d="M10 30c-5.5-5.5-5.5-14.5 0-20" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                  <path d="M26 14c3.3 3.3 3.3 8.7 0 12" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                  <path d="M30 10c5.5 5.5 5.5 14.5 0 20" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                  <rect x="16" y="16" width="8" height="8" rx="2" stroke="#C9A84C" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <p className="mt-5" style={{ fontSize: 18, fontWeight: 800, color: "#111111" }}>Hold card near iPhone</p>
            <p className="mt-1.5" style={{ fontSize: 13, fontWeight: 600, color: "#999" }}>£{amount}</p>
            <button
              onClick={() => setStep("amount")}
              className="mt-6 px-5 py-2"
              style={{ borderRadius: 50, border: "1.5px solid #EBEBEB", fontSize: 12, fontWeight: 700, color: "#999" }}
            >
              Cancel
            </button>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center px-6">
            {/* Success */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="flex items-center justify-center rounded-full"
              style={{ width: 72, height: 72, background: "linear-gradient(135deg, #22C55E, #16A34A)" }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M9 16.5l5 5 9-10" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            <p className="mt-3" style={{ fontSize: 18, fontWeight: 800, color: "#111111" }}>Payment received</p>
            <p className="mt-0.5" style={{ fontSize: 24, fontWeight: 800, color: "#111111", letterSpacing: -1 }}>£{amount}</p>

            {/* Split breakdown */}
            <div
              className="w-full mt-5 p-3.5"
              style={{ borderRadius: 14, backgroundColor: "#FAFAF8", border: "1px solid #F0F0F0" }}
            >
              <p style={{ fontSize: 9, fontWeight: 700, color: "#BBBBBB", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Revenue Split</p>
              <div className="flex justify-between mb-1.5">
                <span style={{ fontSize: 12, fontWeight: 500, color: "#666" }}>{user?.name?.split(" ")[0]} receives</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>£59.50</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: 12, fontWeight: 500, color: "#666" }}>Salon receives</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>£25.50</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 mt-5">
              <button className="w-full py-3" style={{ borderRadius: 12, border: "1.5px solid #EBEBEB", fontSize: 12, fontWeight: 700, color: "#111" }}>
                Send receipt
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full py-3"
                style={{ borderRadius: 12, backgroundColor: "#111111", fontSize: 13, fontWeight: 700, color: "#C9A84C" }}
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}