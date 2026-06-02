import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const AGENT_ENDPOINT = '/agent.php'; // For local dev, this might need proxy or absolute path if running separately
const MAX_HISTORY = 10;

function AgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping, isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const newHistory = [...history, { role: 'user', content: text }].slice(-MAX_HISTORY);
    setHistory(newHistory);
    setInput('');
    setIsTyping(true);

    try {
      // In dev environment, this fetches from the Vite proxy or the actual URL if hosted together
      const resp = await fetch(AGENT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          page: location.pathname.split('/').pop().replace(/\.html?$/, '') || 'index',
        }),
      });
      const data = await resp.json();
      const reply = data.reply || 'Javob olishda xatolik.';
      setHistory(prev => [...prev, { role: 'assistant', content: reply }].slice(-MAX_HISTORY));
    } catch (err) {
      setHistory(prev => [...prev, { role: 'assistant', content: "Tarmoq xatosi yuz berdi." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatText = (text) => {
    // Parse markdown links
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return <a key={i} href={match[2]} className="text-[#a89aee] underline font-semibold">{match[1]}</a>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-7 right-7 w-14 h-14 bg-[#0a0a0a] border-[1.5px] border-white/10 rounded-full flex items-center justify-center z-[9990] shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:scale-110 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <path d="M8 12h8M12 8v8" stroke="#a89aee" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="rgba(168,154,238,0.25)" stroke="#a89aee" strokeWidth="1.2" />
        </svg>
      </button>

      {/* Chat Panel */}
      <div className={`fixed bottom-[100px] right-7 w-[380px] h-[520px] bg-[#0c0e14] border border-white/10 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.5)] flex flex-col z-[9991] transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <div className="flex-shrink-0 h-14 flex items-center px-4 gap-3 border-b border-white/5">
          <div className="w-8 h-8 bg-[#5028c833] border border-[#5028c84d] rounded-lg flex items-center justify-center text-sm">✦</div>
          <div className="flex-1">
            <div className="text-white font-bold text-[0.83rem] font-sans">Texnikum Agenti</div>
            <div className="text-white/30 text-[0.68rem] font-sans">Har doim yordam berishga tayyorman</div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-7 h-7 bg-white/5 border border-white/10 rounded-md text-white/50 flex items-center justify-center text-xs hover:bg-white/10 hover:text-white transition">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
          <div className="text-center p-4">
            <strong className="block text-white/75 font-bold text-sm mb-2">Salom! Men Texnikum Agentiman.</strong>
            <p className="text-white/30 text-xs leading-relaxed">Sayt haqida istalgan savolingizni bering — manzil, sahifalar, yangiliklar, yo'nalishlar haqida yordam beraman.</p>
          </div>
          
          {history.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center text-xs font-bold ${msg.role === 'user' ? 'bg-[#d4171e40] text-[#ff7a7a]' : 'bg-[#5028c833] text-[#a89aee]'}`}>
                {msg.role === 'user' ? 'S' : '✦'}
              </div>
              <div className={`max-w-[82%] p-3 rounded-xl text-[0.82rem] leading-relaxed ${msg.role === 'user' ? 'bg-[#d4171e1a] border border-[#d4171e2e] rounded-tr-sm text-[#e2e2e2]' : 'bg-white/5 border border-white/10 rounded-tl-sm text-white/80'}`}>
                {formatText(msg.content)}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center text-xs font-bold bg-[#5028c833] text-[#a89aee]">✦</div>
              <div className="max-w-[82%] p-3 rounded-xl bg-white/5 border border-white/10 rounded-tl-sm text-white/80 flex items-center">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#a89aee]/70 rounded-full animate-pulse"></span>
                  <span className="w-1.5 h-1.5 bg-[#a89aee]/70 rounded-full animate-pulse delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-[#a89aee]/70 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex-shrink-0 p-3 border-t border-white/5">
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Savol bering..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2.5 text-[#e2e2e2] text-[0.83rem] outline-none resize-none min-h-[40px] max-h-[120px] focus:border-[#5028c873] transition"
              rows={1}
            />
            <button onClick={handleSend} disabled={isTyping} className="w-9 h-9 flex-shrink-0 bg-[#5028c8b3] rounded-lg text-white flex items-center justify-center hover:bg-[#5028c8e6] disabled:opacity-50 transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <div className="text-center text-[0.64rem] text-white/15 mt-2">Texnikum Agenti · AI yordamchi</div>
        </div>
      </div>
    </>
  );
}

export default AgentWidget;
