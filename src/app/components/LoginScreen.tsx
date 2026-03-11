import React, { useState } from "react";
import { useNavigate } from "react-router";
import { RMark } from "./RMark";

export function LoginScreen() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ["", "#EF4444", "#F59E0B", "#22C55E"];

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="h-[52px] shrink-0" />

      <div className="flex flex-col items-center px-5 pb-4">
        <RMark size={44} variant="light" />
        <h1 className="mt-3" style={{ fontSize: 24, fontWeight: 800, color: "#111111", lineHeight: 1.2 }}>
          {mode === "signin" ? "Welcome back" : "Create account"}
        </h1>
        <p className="mt-1" style={{ fontSize: 13, fontWeight: 500, color: "#999999" }}>
          {mode === "signin" ? "Sign in to ReeveOS" : "Free to start. No card required."}
        </p>
      </div>

      {/* Tab toggle */}
      <div className="flex mx-5 mb-4 p-1" style={{ borderRadius: 14, backgroundColor: "#F0F0F0" }}>
        <button
          onClick={() => setMode("signin")}
          className="flex-1 py-2.5"
          style={{
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            backgroundColor: mode === "signin" ? "#111111" : "transparent",
            color: mode === "signin" ? "#C9A84C" : "#999999",
          }}
        >
          Sign in
        </button>
        <button
          onClick={() => setMode("register")}
          className="flex-1 py-2.5"
          style={{
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            backgroundColor: mode === "register" ? "#111111" : "transparent",
            color: mode === "register" ? "#C9A84C" : "#999999",
          }}
        >
          Create account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="px-5 flex flex-col gap-3">
        {mode === "register" && (
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3.5 outline-none"
            style={{ borderRadius: 14, border: "1.5px solid #F0F0F0", fontSize: 14, fontWeight: 500, color: "#111111", backgroundColor: "#FFFFFF" }}
          />
        )}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3.5 outline-none"
          style={{ borderRadius: 14, border: "1.5px solid #F0F0F0", fontSize: 14, fontWeight: 500, color: "#111111", backgroundColor: "#FFFFFF" }}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3.5 pr-14 outline-none"
            style={{ borderRadius: 14, border: "1.5px solid #F0F0F0", fontSize: 14, fontWeight: 500, color: "#111111", backgroundColor: "#FFFFFF" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ width: 44, height: 44, borderRadius: 10 }}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="#BBB" strokeWidth="1.3" />
                <circle cx="9" cy="9" r="2.5" stroke="#BBB" strokeWidth="1.3" />
                <path d="M3 15L15 3" stroke="#BBB" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="#BBB" strokeWidth="1.3" />
                <circle cx="9" cy="9" r="2.5" stroke="#BBB" strokeWidth="1.3" />
              </svg>
            )}
          </button>
        </div>

        {mode === "register" && password.length > 0 && (
          <div className="flex gap-1.5">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className="flex-1 h-1 rounded-full transition-colors"
                style={{ backgroundColor: passwordStrength >= level ? strengthColors[level] : "#F0F0F0" }}
              />
            ))}
          </div>
        )}

        {mode === "signin" && (
          <div className="flex justify-end">
            <button type="button" style={{ fontSize: 12, fontWeight: 700, color: "#C9A84C" }}>Forgot password?</button>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 mt-1"
          style={{ borderRadius: 16, backgroundColor: "#111111", boxShadow: "0 4px 16px rgba(17,17,17,0.25)" }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: "#C9A84C" }}>
            {mode === "signin" ? "Sign in" : "Create account"}
          </span>
        </button>

        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px" style={{ backgroundColor: "#F0F0F0" }} />
          <span style={{ fontSize: 11, fontWeight: 500, color: "#999999" }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#F0F0F0" }} />
        </div>

        {/* Social buttons — custom, no lucide */}
        <button
          type="button"
          className="w-full py-3.5 flex items-center justify-center gap-3"
          style={{ borderRadius: 14, border: "1.5px solid #F0F0F0", fontSize: 13, fontWeight: 700, color: "#111" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-1.15.69-2.53 1.09-3.91 1.09-3.35 0-6.16-2.25-7.17-5.27l-.02-.06-1.46-1.12-.5.38C5.49 18.48 8.49 21.37 12.14 21.37c1.65 0 3.22-.52 4.56-1.5l-.02-.01-1.63-1.58z" fill="#34A853"/>
            <path d="M12.14 9.73c1.68 0 2.81.72 3.45 1.33l2.52-2.46C16.52 7.15 14.52 6.23 12.14 6.23c-3.65 0-6.65 2.89-8.15 6.07l1.98 1.53c.73-2.18 2.77-4.1 6.17-4.1z" fill="#EA4335"/>
            <path d="M20.25 12.23c0-.71-.06-1.24-.2-1.78H12.14v3.24h4.66c-.1.64-.59 1.61-1.7 2.26l1.63 1.58c1.56-1.44 2.52-3.56 2.52-5.3z" fill="#4285F4"/>
            <path d="M4 12.14c0-.68.12-1.34.32-1.96l-1.98-1.53A9.94 9.94 0 001 12.14c0 1.59.39 3.09 1.07 4.42l1.97-1.53c-.22-.59-.34-1.22-.34-1.89h.3z" fill="#FBBC05"/>
          </svg>
          Continue with Google
        </button>
        <button
          type="button"
          className="w-full py-3.5 flex items-center justify-center gap-3"
          style={{ borderRadius: 14, border: "1.5px solid #F0F0F0", fontSize: 13, fontWeight: 700, color: "#111" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#111"><path d="M17.05 12.536c-.024-2.416 1.98-3.584 2.072-3.64-1.132-1.652-2.892-1.876-3.516-1.904-1.488-.156-2.928.892-3.684.892-.768 0-1.932-.876-3.18-.852-1.62.024-3.132.96-3.972 2.424-1.716 2.964-.436 7.344 1.212 9.744.82 1.176 1.788 2.496 3.06 2.448 1.236-.048 1.7-.792 3.192-.792 1.476 0 1.908.792 3.192.768 1.32-.024 2.16-1.188 2.952-2.376.948-1.356 1.332-2.688 1.344-2.76-.024-.012-2.568-1.008-2.592-3.952h-.08zM14.628 5.492c.66-.816 1.116-1.932.996-3.06-.96.048-2.16.66-2.856 1.464-.624.72-1.176 1.896-1.032 3.012 1.08.084 2.184-.552 2.892-1.416z"/></svg>
          Continue with Apple
        </button>
      </form>

      <div className="text-center mt-3 pb-8 px-5">
        <p style={{ fontSize: 13, fontWeight: 500, color: "#999999" }}>
          {mode === "signin" ? (
            <>Don't have an account? <button onClick={() => setMode("register")} style={{ fontWeight: 700, color: "#C9A84C" }}>Create one free</button></>
          ) : (
            <>Already have an account? <button onClick={() => setMode("signin")} style={{ fontWeight: 700, color: "#C9A84C" }}>Sign in</button></>
          )}
        </p>
        {mode === "register" && (
          <p className="mt-2 px-4" style={{ fontSize: 10, color: "#999999", lineHeight: 1.4 }}>
            By creating an account you agree to our <span style={{ color: "#C9A84C" }}>Terms</span> and <span style={{ color: "#C9A84C" }}>Privacy Policy</span>
          </p>
        )}
      </div>
    </div>
  );
}