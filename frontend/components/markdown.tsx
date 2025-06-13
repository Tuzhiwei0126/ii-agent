"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeMathJax from "rehype-mathjax";
import rehypeKatex from "rehype-katex";
import { Components } from "react-markdown";
import { useState } from "react";

import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import "./markdown.css";

interface MarkdownProps {
  children: string | null | undefined;
}

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Markdown = ({ children }: MarkdownProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, language: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(language);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const components: Components = {
    a: ({ ...props }) => (
      <a target="_blank" rel="noopener noreferrer" className="markdown-link" {...props} />
    ),
    code: ({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const code = String(children).replace(/\n$/, '');

      return !inline && match ? (
        <div className="code-block-wrapper">
          <div className="code-block-header">
            <span className="code-language">{language}</span>
            <button
              className="copy-button"
              onClick={() => copyToClipboard(code, language)}
              title="复制代码"
            >
              {copied === language ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
          <div className="code-block-content">
            <pre className="markdown-pre">
              <code className={`markdown-code block-code ${className}`} {...props}>
                {children}
              </code>
            </pre>
          </div>
        </div>
      ) : (
        <code className={`markdown-code inline-code ${className}`} {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="markdown-pre">{children}</pre>
    ),
  };

  return (
    <div className="markdown-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeRaw,
          rehypeMathJax,
          rehypeKatex,
          [rehypeHighlight, { ignoreMissing: true }]
        ]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
