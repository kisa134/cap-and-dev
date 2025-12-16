import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeHighlightProps {
  code: string;
}

export function CodeHighlight({ code }: CodeHighlightProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightRustSyntax = (code: string) => {
    let highlighted = code
      .replace(/\b(fn|let|mut|pub|impl|match|return|struct|enum|use|mod)\b/g, '<span class="text-cyan-400">$1</span>')
      .replace(/\b(f64|usize|Vec|&|->)\b/g, '<span class="text-cyan-300">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-green-400">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="text-yellow-400">"$1"</span>')
      .replace(/\/\/(.*)/g, '<span class="text-gray-500">//$1</span>')
      .replace(/(\w+)\s*\(/g, '<span class="text-blue-400">$1</span>(');

    return highlighted;
  };

  return (
    <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 font-mono text-sm overflow-x-auto">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-700 transition-colors"
        title="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>

      <pre className="text-gray-300 leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlightRustSyntax(code) }} />
      </pre>
    </div>
  );
}
