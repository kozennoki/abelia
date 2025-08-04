"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return extractTextFromChildren(children.props.children);
  }
  return '';
};

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeText = extractTextFromChildren(children);
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group">
      <pre className={className}>
        {children}
        <button
          onClick={handleCopy}
          className="copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded transition-all duration-200"
          aria-label="Copy code"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </pre>
    </div>
  );
}