import React from "react";
import { useNavigate } from "react-router";

// This is a route placeholder — the real AI chat opens as a bottom sheet from HomeScreen
export function AIChatScreen() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/app");
  }, [navigate]);
  return null;
}
