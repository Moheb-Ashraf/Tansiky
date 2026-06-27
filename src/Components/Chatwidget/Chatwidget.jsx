import { useState, useRef, useEffect, useCallback } from "react";

const API_URL = "https://keufwvyslwdptjxspupy.supabase.co/functions/v1/chat";
const API_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtldWZ3dnlzbHdkcHRqeHNwdXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTYyNDYsImV4cCI6MjA4MDYzMjI0Nn0.8EfLc2zORekbucHYurumc4P6BROkjLmY4_IgZeZAGiE";

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "أهلاً بك في بحر 🌊\nأنا مساعدك الذكي للتنسيق والقبول.\nاسألني عن أي جامعة أو كلية!",
  local: true,
};

/** رسائل تُعرض في الواجهة فقط — لا تُرسل للـ API */
function messagesForApi(messages) {
  return messages
    .filter((m) => !m.local && String(m.content || "").trim())
    .map(({ role, content }) => ({ role, content }));
}

function extractSseToken(raw) {
  if (!raw || raw === "[DONE]") return { done: raw === "[DONE]", token: "" };
  try {
    const json = JSON.parse(raw);
    const token = json?.choices?.[0]?.delta?.content;
    if (token) return { done: false, token };
    const err = json?.error?.message || json?.error;
    if (typeof err === "string") return { done: false, token: "", error: err };
  } catch {
    /* سطر JSON غير مكتمل — يُعاد لاحقاً عبر الـ buffer */
  }
  return { done: false, token: "" };
}

function getClientPoint(e) {
  const t = e.touches?.[0] ?? e.changedTouches?.[0];
  if (t) return { x: t.clientX, y: t.clientY };
  return { x: e.clientX, y: e.clientY };
}

// ── Quick option steps shown once at the start ──────────────────────────────
// Step 0: what kind of help?  Step 1: what university type?
const QUICK_STEPS = [
  {
    title: "كيف أقدر أساعدك؟",
    options: [
      { id: "colleges", icon: "🎓", label: "الكليات المتاحة لمجموعي",  message: "عايز أعرف الكليات المتاحة لمجموعي" },
      { id: "compare",  icon: "⚖️", label: "أقارن بين كليتين",          message: "عايز أقارن بين كليتين" },
      { id: "jobs",     icon: "💼", label: "فرص الشغل لتخصص معين",      message: "عايز أعرف فرص الشغل لتخصص معين" },
      { id: "tips",     icon: "💡", label: "نصائح للتنسيق",             message: "إيه أهم النصائح للتنسيق؟" },
    ],
  },
  {
    title: "إيه نوع الجامعة اللي بتدور عليها؟",
    options: [
      { id: "gov",        icon: "🏛️", label: "حكومية",     message: "أنا مهتم بجامعات حكومية" },
      { id: "private",    icon: "🏢", label: "خاصة",       message: "أنا مهتم بجامعات خاصة" },
      { id: "national",   icon: "🏫", label: "أهلية",      message: "أنا مهتم بجامعات أهلية" },
      { id: "tech",       icon: "💻", label: "تكنولوجية",  message: "أنا مهتم بجامعات تكنولوجية" },
      { id: "foreign",    icon: "🌍", label: "أجنبية",     message: "أنا مهتم بجامعات أجنبية" },
      { id: "institutes", icon: "📚", label: "معاهد عليا", message: "أنا مهتم بالمعاهد العليا" },
    ],
  },
];

// ── Cycling tooltip messages on the FAB ─────────────────────────────────────
const TOOLTIP_MESSAGES = [
  "أنا بحر 🌊 اسألني عن أي جامعة!",
  "ابحث عن كليتك المثالية معي ✨",
  "تنسيقك يهمني، تفضل 🎓",
  "عايز تعرف المصاريف والتنسيق؟ 📊",
  "بحر هنا، جاهز يساعدك 💬",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);

  // Quick options state — tracks which step we're on (-1 = done, show nothing)
  const [quickStep, setQuickStep] = useState(0);

  // Tooltip
  const [tooltipIndex, setTooltipIndex] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(true);

  // Chat window drag
  const [position, setPosition] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef(null);

  // FAB drag
  const [fabPosition, setFabPosition] = useState({ x: null, y: null });
  const [fabDragging, setFabDragging] = useState(false);
  const fabDragOffset = useRef({ x: 0, y: 0 });
  const fabRef = useRef(null);
  const fabDragMoved = useRef(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, quickStep]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  // ── Tooltip cycling ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (open) return;
    const cycle = setInterval(() => {
      setTooltipVisible(false);
      setTimeout(() => {
        setTooltipIndex((i) => (i + 1) % TOOLTIP_MESSAGES.length);
        setTooltipVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(cycle);
  }, [open]);

  // ── FAB drag (mouse + touch) ────────────────────────────────────────────────
  const startFabDrag = useCallback((e) => {
    fabDragMoved.current = false;
    setFabDragging(true);
    const rect = fabRef.current.getBoundingClientRect();
    const { x, y } = getClientPoint(e);
    fabDragOffset.current = { x: x - rect.left, y: y - rect.top };
    if (e.type === "mousedown") e.preventDefault();
  }, []);

  useEffect(() => {
    if (!fabDragging) return;

    const onMove = (e) => {
      fabDragMoved.current = true;
      if (e.cancelable) e.preventDefault();
      const { x, y } = getClientPoint(e);
      const maxX = window.innerWidth - (fabRef.current?.offsetWidth || 62);
      const maxY = window.innerHeight - (fabRef.current?.offsetHeight || 100);
      setFabPosition({
        x: Math.max(0, Math.min(x - fabDragOffset.current.x, maxX)),
        y: Math.max(0, Math.min(y - fabDragOffset.current.y, maxY)),
      });
    };
    const onUp = () => setFabDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchcancel", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchcancel", onUp);
    };
  }, [fabDragging]);

  // ── Chat window drag (mouse + touch) — header only to preserve message scroll ─
  const startWindowDrag = useCallback((e) => {
    if (e.target.closest("button, input, textarea")) return;
    setDragging(true);
    const rect = widgetRef.current.getBoundingClientRect();
    const { x, y } = getClientPoint(e);
    dragOffset.current = { x: x - rect.left, y: y - rect.top };
    if (e.type === "mousedown") e.preventDefault();
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e) => {
      if (e.cancelable) e.preventDefault();
      const { x, y } = getClientPoint(e);
      const maxX = window.innerWidth - (widgetRef.current?.offsetWidth || 370);
      const maxY = window.innerHeight - (widgetRef.current?.offsetHeight || 530);
      setPosition({
        x: Math.max(0, Math.min(x - dragOffset.current.x, maxX)),
        y: Math.max(0, Math.min(y - dragOffset.current.y, maxY)),
      });
    };
    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchcancel", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchcancel", onUp);
    };
  }, [dragging]);

  // ── Handle quick option selection ───────────────────────────────────────────
  const handleQuickOption = (message) => {
    if (message === "__ASK_CUSTOM__") {
      setQuickStep(-1);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    const userMsg = { role: "user", content: message };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    const isLastQuickStep = quickStep >= QUICK_STEPS.length - 1;
    if (!isLastQuickStep) {
      setQuickStep(quickStep + 1);
      return;
    }

    setQuickStep(-1);
    sendToAPI(updatedMessages);
  };

  const setLastAssistantContent = useCallback((content) => {
    setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content }]);
  }, []);

  const appendAssistantToken = useCallback((token) => {
    setMessages((prev) => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      updated[updated.length - 1] = {
        role: "assistant",
        content: (last?.content || "") + token,
      };
      return updated;
    });
  }, []);

  // ── Core API call (shared by quick options + manual input) ──────────────────
  const sendToAPI = async (updatedMessages) => {
    const apiMessages = messagesForApi(updatedMessages);
    if (apiMessages.length === 0) return;

    setStreaming(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    let gotContent = false;

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
        body: JSON.stringify({ messages: apiMessages }),
        signal: controller.signal,
      });

      if (response.status === 429) {
        setLastAssistantContent("⚠️ كثير من الطلبات، انتظر قليلاً وحاول مرة أخرى.");
        return;
      }
      if (response.status === 402) {
        setLastAssistantContent("⚠️ الخدمة غير متاحة حالياً (انتهى رصيد الاستخدام).");
        return;
      }

      if (!response.ok) {
        let detail = `خطأ من الخادم (${response.status})`;
        try {
          const errJson = await response.json();
          detail = errJson.error || errJson.message || detail;
        } catch {
          try {
            const errText = await response.text();
            if (errText) detail = errText.slice(0, 200);
          } catch { /* ignore */ }
        }
        setLastAssistantContent(`⚠️ ${detail}`);
        return;
      }

      if (!response.body) {
        setLastAssistantContent("⚠️ لم يصل رد من الخادم. تحقق من الاتصال وحاول مرة أخرى.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let sseBuffer = "";
      let streamDone = false;

      const consumeSseLines = (lines) => {
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const raw = trimmed.slice(5).trim();
          const { done, token, error } = extractSseToken(raw);
          if (done) {
            streamDone = true;
            return;
          }
          if (error) {
            setLastAssistantContent(`⚠️ ${error}`);
            streamDone = true;
            return;
          }
          if (token) {
            gotContent = true;
            appendAssistantToken(token);
          }
        }
      };

      const feedSseChunk = (chunkText) => {
        sseBuffer += chunkText;
        const lines = sseBuffer.split("\n");
        sseBuffer = lines.pop() ?? "";
        consumeSseLines(lines);
      };

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        feedSseChunk(decoder.decode(value, { stream: true }));
      }

      feedSseChunk(decoder.decode());
      if (sseBuffer.trim()) consumeSseLines([sseBuffer]);

      if (!gotContent) {
        setLastAssistantContent(
          "⚠️ لم يصل نص للرد. قد يكون السيرفر مشغولاً أو تم تجاوز الحد — انتظر دقيقة وحاول مرة أخرى."
        );
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setLastAssistantContent("⚠️ حدث خطأ في الاتصال، يرجى المحاولة مرة أخرى.");
      } else {
        setMessages((prev) => prev.slice(0, -1));
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  // ── Manual send ─────────────────────────────────────────────────────────────
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    const updatedMessages = [...messages, { role: "user", content: text }];
    setMessages(updatedMessages);
    setInput("");
    setQuickStep(-1); // Dismiss quick options once user types manually
    sendToAPI(updatedMessages);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // ── Clear / reset ────────────────────────────────────────────────────────────
  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([WELCOME_MESSAGE]);
    setStreaming(false);
    setQuickStep(0); // Reset quick options on new chat
  };

  // ── Position styles ─────────────────────────────────────────────────────────
  const fabStyle = fabPosition.x !== null
    ? { left: fabPosition.x, top: fabPosition.y, bottom: "auto", right: "auto" }
    : { bottom: 24, right: 24 };

  const windowStyle = position.x !== null
    ? { left: position.x, top: position.y, bottom: "auto", right: "auto" }
    : fabPosition.x !== null
      ? { left: Math.max(0, fabPosition.x - 308), top: Math.max(0, fabPosition.y - 540) }
      : { bottom: 96, right: 24 };

  const currentStep = quickStep >= 0 && quickStep < QUICK_STEPS.length ? QUICK_STEPS[quickStep] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        .bahr-widget * { box-sizing: border-box; font-family: 'Cairo', sans-serif; }

        /* ── FAB wrapper ── */
        .bahr-fab-wrapper {
          position: fixed; z-index: 9999;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          cursor: grab; user-select: none;
          touch-action: none;
        }
        .bahr-fab-wrapper.bahr-fab-dragging { cursor: grabbing; }

        /* ── Tooltip ── */
        .bahr-tooltip {
          background: var(--theme-surface, #fff);
          color: var(--theme-text, #1f2937);
          border: 1px solid var(--theme-border, #e5e7eb);
          border-radius: 20px; padding: 7px 14px;
          font-size: 12.5px; font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 6px 20px rgba(10,30,60,0.12);
          position: relative; pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .bahr-tooltip.visible   { opacity: 1; transform: translateY(0); }
        .bahr-tooltip.invisible { opacity: 0; transform: translateY(5px); }
        .bahr-tooltip::after {
          content: ''; position: absolute;
          bottom: -7px; left: 50%; transform: translateX(-50%);
          border: 7px solid transparent;
          border-top-color: var(--theme-surface, #fff);
        }

        /* ── FAB ── */
        .bahr-fab {
          width: 62px; height: 62px; border-radius: 50%;
          border: none; cursor: inherit;
          background: linear-gradient(145deg, #26547d, #3a7aad);
          box-shadow: 0 8px 28px rgba(42,100,148,0.5);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
          padding: 0; overflow: hidden; position: relative;
        }
        .bahr-fab-wrapper:not(.bahr-fab-dragging):hover .bahr-fab {
          transform: scale(1.1); box-shadow: 0 12px 36px rgba(42,100,148,0.6);
        }
        .bahr-fab::after {
          content: ''; position: absolute; inset: -5px; border-radius: 50%;
          border: 2.5px solid rgba(58,122,173,0.5);
          animation: bahr-ripple 2.4s ease-out infinite;
        }
        @keyframes bahr-ripple {
          0%   { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.65); opacity: 0; }
        }

        /* ── Icon animations ── */
        .bahr-wave-1 { animation: bahr-wave-move 2s linear infinite; }
        .bahr-wave-2 { animation: bahr-wave-move 2s linear infinite reverse; animation-delay: -0.5s; }
        @keyframes bahr-wave-move {
          0%  { transform: translateX(0); } 50% { transform: translateX(3px); } 100% { transform: translateX(0); }
        }
        .bahr-cap { animation: bahr-cap-float 2.6s ease-in-out infinite; }
        @keyframes bahr-cap-float {
          0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.5px); }
        }
        .bahr-tassel { animation: bahr-tassel-swing 2.6s ease-in-out infinite; transform-origin: 25px 9px; }
        @keyframes bahr-tassel-swing {
          0%,100% { transform: rotate(0deg); } 50% { transform: rotate(14deg); }
        }

        /* ── Chat window ── */
        .bahr-window {
          position: fixed; z-index: 9998;
          width: 370px; height: 530px;
          border-radius: 22px; display: flex; flex-direction: column; overflow: hidden;
          background: var(--theme-surface, #fff);
          border: 1px solid var(--theme-border, #e5e7eb);
          box-shadow: 0 28px 72px rgba(10,30,60,0.18), 0 4px 16px rgba(10,30,60,0.08);
          animation: bahr-in 0.28s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes bahr-in {
          from { opacity: 0; transform: translateY(24px) scale(0.93); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .bahr-window.bahr-dragging { cursor: grabbing !important; user-select: none; }

        /* ── Header ── */
        .bahr-header {
          background: linear-gradient(135deg, #1a384f 0%, #26547d 55%, #3a7aad 100%);
          padding: 13px 15px; display: flex; align-items: center; justify-content: space-between;
          cursor: grab; user-select: none; flex-shrink: 0; position: relative; overflow: hidden;
          touch-action: none;
        }
        .bahr-header::before {
          content: ''; position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 60'%3E%3Cpath d='M0 30 Q50 10 100 30 Q150 50 200 30 Q250 10 300 30 Q350 50 400 30 L400 60 L0 60Z' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E") bottom/cover no-repeat;
          pointer-events: none;
        }
        .bahr-header:active { cursor: grabbing; }
        .bahr-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .bahr-header-info { display: flex; align-items: center; gap: 10px; }
        .bahr-title { color: #fff; font-weight: 900; font-size: 15px; line-height: 1.2; }
        .bahr-status { display: flex; align-items: center; gap: 5px; margin-top: 2px; }
        .bahr-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.8);
          animation: bahr-pulse-dot 2s ease-in-out infinite;
        }
        .bahr-dot.typing { background: #f59e0b; box-shadow: 0 0 6px rgba(245,158,11,0.8); }
        @keyframes bahr-pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        .bahr-status-text { color: rgba(255,255,255,0.75); font-size: 11px; }
        .bahr-actions { display: flex; gap: 6px; position: relative; z-index: 1; }
        .bahr-icon-btn {
          width: 32px; height: 32px; border-radius: 9px;
          background: rgba(255,255,255,0.13); border: 1px solid rgba(255,255,255,0.18);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.9); transition: background 0.15s, transform 0.15s;
        }
        .bahr-icon-btn:hover { background: rgba(255,255,255,0.25); transform: scale(1.05); }

        /* ── Messages ── */
        .bahr-messages {
          flex: 1; overflow-y: auto; padding: 16px 14px;
          display: flex; flex-direction: column; gap: 10px;
          background: var(--theme-bg, #f5f1e2); direction: rtl;
        }
        .bahr-messages::-webkit-scrollbar { width: 3px; }
        .bahr-messages::-webkit-scrollbar-thumb { background: #b8d4eb; border-radius: 4px; }
        .bahr-date-chip {
          align-self: center; font-size: 10px; color: #94a3b8;
          background: var(--theme-surface, #fff);
          border: 1px solid var(--theme-border, #e5e7eb);
          padding: 3px 10px; border-radius: 20px; margin-bottom: 4px;
        }
        .bahr-bubble {
          max-width: 83%; padding: 10px 14px;
          font-size: 13.5px; line-height: 1.65;
          white-space: pre-wrap; word-break: break-word;
          animation: bahr-bubble-in 0.22s ease;
        }
        @keyframes bahr-bubble-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bahr-bubble.user {
          align-self: flex-start;
          background: linear-gradient(135deg, #26547d, #3a7aad);
          color: #fff; border-radius: 18px 18px 4px 18px;
          box-shadow: 0 4px 14px rgba(42,100,148,0.25);
        }
        .bahr-bubble.assistant {
          align-self: flex-end;
          background: var(--theme-surface, #fff); color: var(--theme-text, #1f2937);
          border-radius: 18px 18px 18px 4px;
          border: 1px solid var(--theme-border, #e5e7eb);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .bahr-dots { display: flex; gap: 5px; padding: 4px 2px; align-items: center; }
        .bahr-dots span {
          width: 8px; height: 8px; border-radius: 50%; background: #8ab9db;
          animation: bahr-dot-bounce 1.3s infinite;
        }
        .bahr-dots span:nth-child(2) { animation-delay: 0.18s; }
        .bahr-dots span:nth-child(3) { animation-delay: 0.36s; }
        @keyframes bahr-dot-bounce {
          0%,80%,100% { transform: translateY(0); opacity: 0.6; }
          40% { transform: translateY(-7px); opacity: 1; }
        }

        /* ── Quick options panel ── */
        .bahr-quick-panel {
          padding: 10px 13px 4px;
          background: var(--theme-surface, #fff);
          border-top: 1px solid var(--theme-border, #e5e7eb);
          flex-shrink: 0;
          animation: bahr-bubble-in 0.2s ease;
          direction: rtl;
        }
        .bahr-quick-title {
          font-size: 11px; font-weight: 700;
          color: var(--theme-soft-text, #4b5563);
          margin-bottom: 7px; text-align: center;
        }
        .bahr-quick-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 7px;
        }
        .bahr-quick-btn {
          display: flex; align-items: center; gap-7px; gap: 7px;
          padding: 8px 10px; border-radius: 12px;
          background: var(--theme-muted, #f3f4f6);
          border: 1.5px solid var(--theme-border, #e5e7eb);
          cursor: pointer; text-align: right;
          font-size: 12px; font-weight: 700;
          color: var(--theme-text, #1f2937);
          font-family: 'Cairo', sans-serif;
          transition: background 0.15s, border-color 0.15s, transform 0.15s;
          line-height: 1.3;
        }
        .bahr-quick-btn:hover:not(:disabled) {
          background: #edf4fa;
          border-color: #3a7aad;
          transform: translateY(-1px);
        }
        .bahr-quick-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .bahr-quick-btn-icon { font-size: 16px; flex-shrink: 0; }
        .bahr-custom-btn {
          width: 100%; padding: 8px; border-radius: 12px;
          background: transparent;
          border: 1.5px dashed #b8d4eb;
          cursor: pointer; font-size: 12px; font-weight: 700;
          color: #3a7aad; font-family: 'Cairo', sans-serif;
          transition: background 0.15s, border-color 0.15s;
          margin-bottom: 3px;
        }
        .bahr-custom-btn:hover:not(:disabled) { background: #edf4fa; border-color: #3a7aad; }
        .bahr-custom-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        /* ── Input area ── */
        .bahr-input-area {
          padding: 11px 13px;
          background: var(--theme-surface, #fff);
          border-top: 1px solid var(--theme-border, #e5e7eb);
          display: flex; gap: 8px; align-items: flex-end;
          flex-shrink: 0; direction: rtl;
        }
        .bahr-textarea {
          flex: 1; resize: none;
          border: 1.5px solid var(--theme-border, #e5e7eb);
          border-radius: 14px; padding: 10px 13px;
          font-size: 13.5px; font-family: 'Cairo', sans-serif;
          outline: none; color: var(--theme-text, #1f2937);
          background: var(--theme-muted, #f3f4f6);
          max-height: 100px; direction: rtl; line-height: 1.5;
          transition: border-color 0.15s, background 0.15s;
        }
        .bahr-textarea:focus { border-color: #3a7aad; background: var(--theme-surface, #fff); }
        .bahr-textarea::placeholder { color: #94a3b8; }
        .bahr-textarea:disabled { opacity: 0.6; }
        .bahr-send {
          width: 42px; height: 42px; border-radius: 13px;
          background: linear-gradient(135deg, #26547d, #3a7aad);
          border: none; cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(42,100,148,0.4);
          transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .bahr-send:hover:not(:disabled) { transform: scale(1.07); box-shadow: 0 6px 20px rgba(42,100,148,0.5); }
        .bahr-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .bahr-footer {
          text-align: center; font-size: 10px;
          color: var(--theme-soft-text, #4b5563);
          padding: 5px 0 7px;
          background: var(--theme-surface, #fff);
          opacity: 0.7; flex-shrink: 0;
        }

        @media (max-width: 500px) {
          .bahr-window { width: calc(100vw - 20px); }
        }
      `}</style>

      <div className="bahr-widget">

        {/* ── FAB + Tooltip ────────────────────────────────────────────────── */}
        {!open && (
          <div
            ref={fabRef}
            className={`bahr-fab-wrapper${fabDragging ? " bahr-fab-dragging" : ""}`}
            style={fabStyle}
            onMouseDown={startFabDrag}
            onTouchStart={startFabDrag}
          >
            <div className={`bahr-tooltip ${tooltipVisible ? "visible" : "invisible"}`}>
              {TOOLTIP_MESSAGES[tooltipIndex]}
            </div>
            <button
              className="bahr-fab"
              onClick={() => { if (!fabDragMoved.current) setOpen(true); }}
              aria-label="فتح بحر"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <g className="bahr-cap">
                  <path d="M16 5 L25 9 L16 13 L7 9 Z" fill="white" />
                  <path d="M12 11 L12 16 Q16 19 20 16 L20 11" fill="rgba(255,255,255,0.85)" />
                </g>
                <g className="bahr-tassel">
                  <line x1="25" y1="9" x2="25" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="25" cy="15" r="1.5" fill="white" />
                </g>
                <path className="bahr-wave-1"
                  d="M3 21 Q6.5 17 10 21 Q13.5 25 17 21 Q20.5 17 24 21 Q27.5 25 31 21"
                  stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path className="bahr-wave-2"
                  d="M3 25 Q6.5 21 10 25 Q13.5 29 17 25 Q20.5 21 24 25 Q27.5 29 31 25"
                  stroke="rgba(255,255,255,0.5)" strokeWidth="1.7" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>
        )}

        {/* ── Chat window ──────────────────────────────────────────────────── */}
        {open && (
          <div
            ref={widgetRef}
            className={`bahr-window${dragging ? " bahr-dragging" : ""}`}
            style={windowStyle}
          >
            {/* Header */}
            <div
              className="bahr-header"
              onMouseDown={startWindowDrag}
              onTouchStart={startWindowDrag}
            >
              <div className="bahr-header-info">
                <div className="bahr-avatar">
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                    <path d="M4 18 Q7 13 10 18 Q13 23 16 18 Q19 13 22 18 Q25 23 28 18"
                      stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M16 4 L24 8 L16 12 L8 8 Z" fill="white" />
                    <path d="M12 10 L12 15 Q16 18 20 15 L20 10" fill="rgba(255,255,255,0.75)" />
                  </svg>
                </div>
                <div>
                  <div className="bahr-title">بحر</div>
                  <div className="bahr-status">
                    <div className={`bahr-dot${streaming ? " typing" : ""}`} />
                    <span className="bahr-status-text">{streaming ? "يكتب..." : "مساعد ذكي • متصل"}</span>
                  </div>
                </div>
              </div>
              <div className="bahr-actions">
                <button className="bahr-icon-btn" onClick={clearChat} title="محادثة جديدة">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
                  </svg>
                </button>
                <button className="bahr-icon-btn" onClick={() => setOpen(false)} title="إغلاق">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="bahr-messages">
              <div className="bahr-date-chip">اليوم</div>
              {messages.map((msg, i) => (
                <div key={i} className={`bahr-bubble ${msg.role}`}>
                  {msg.role === "assistant" && msg.content === "" && streaming ? (
                    <div className="bahr-dots"><span /><span /><span /></div>
                  ) : msg.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick options — shown only during the initial steps */}
            {currentStep && !streaming && (
              <div className="bahr-quick-panel">
                <div className="bahr-quick-title">{currentStep.title}</div>
                <div className="bahr-quick-grid">
                  {currentStep.options.map((opt) => (
                    <button
                      key={opt.id}
                      className="bahr-quick-btn"
                      onClick={() => handleQuickOption(opt.message)}
                      disabled={streaming}
                    >
                      <span className="bahr-quick-btn-icon">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
                {/* Skip to free typing */}
                <button
                  className="bahr-custom-btn"
                  onClick={() => handleQuickOption("__ASK_CUSTOM__")}
                  disabled={streaming}
                >
                  ✏️ أريد أسأل سؤال بنفسي
                </button>
              </div>
            )}

            {/* Input */}
            <div className="bahr-input-area">
              <button
                className="bahr-send"
                onClick={sendMessage}
                disabled={!input.trim() || streaming}
                aria-label="إرسال"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
              <textarea
                ref={inputRef}
                className="bahr-textarea"
                rows={1}
                placeholder="اسأل بحر عن أي جامعة أو كلية..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={streaming}
              />
            </div>

            <div className="bahr-footer">مدعوم بالذكاء الاصطناعي • تنسيقي ايجي</div>
          </div>
        )}
      </div>
    </>
  );
}