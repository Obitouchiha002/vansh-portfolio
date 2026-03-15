import { useState } from 'react';
import { Copy, RefreshCw, Type, AlignLeft, Scissors } from 'lucide-react';

interface TextToolsProps {
  toolType: 'word-counter' | 'text-formatter' | 'remove-spaces';
}

export default function TextTools({ toolType }: TextToolsProps) {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWordCount = () => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharCount = () => {
    return text.length;
  };

  const formatText = (type: 'upper' | 'lower' | 'capitalize') => {
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'capitalize') {
      setText(text.replace(/\b\w/g, char => char.toUpperCase()));
    }
  };

  const removeExtraSpaces = () => {
    setText(text.replace(/\s+/g, ' ').trim());
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          {toolType === 'word-counter' && <><Type size={20} className="text-purple-500" /> Word Counter</>}
          {toolType === 'text-formatter' && <><AlignLeft size={20} className="text-purple-500" /> Text Formatter</>}
          {toolType === 'remove-spaces' && <><Scissors size={20} className="text-purple-500" /> Remove Extra Spaces</>}
        </h3>
        {toolType === 'word-counter' && (
          <div className="flex gap-4 text-sm font-mono bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800">
            <span className="text-zinc-400">Words: <span className="text-neon-green font-bold">{getWordCount()}</span></span>
            <span className="text-zinc-400">Chars: <span className="text-neon-blue font-bold">{getCharCount()}</span></span>
          </div>
        )}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full h-64 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 focus:border-purple-500 focus:outline-none resize-none font-mono text-sm"
      />

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
        <div className="flex flex-wrap gap-2">
          {toolType === 'text-formatter' && (
            <>
              <button onClick={() => formatText('upper')} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition-colors">UPPERCASE</button>
              <button onClick={() => formatText('lower')} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition-colors">lowercase</button>
              <button onClick={() => formatText('capitalize')} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition-colors">Capitalize</button>
            </>
          )}
          {toolType === 'remove-spaces' && (
            <button onClick={removeExtraSpaces} className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-bold transition-colors">
              Remove Extra Spaces
            </button>
          )}
          <button onClick={() => setText('')} className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <RefreshCw size={14} /> Clear
          </button>
        </div>

        <button 
          onClick={handleCopy}
          disabled={!text}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-green text-zinc-950 font-bold hover:bg-neon-green/90 transition-colors disabled:opacity-50"
        >
          <Copy size={18} />
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>
    </div>
  );
}
