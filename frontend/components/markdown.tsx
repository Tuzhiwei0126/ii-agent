"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeMathJax from "rehype-mathjax";
import rehypeKatex from "rehype-katex";
import { Components } from "react-markdown";

import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import "./markdown.css";

interface MarkdownProps {
  children: string | null | undefined;
}

const Markdown = ({ children }: MarkdownProps) => {
  const components: Components = {
    a: ({ ...props }) => (
      <a target="_blank" rel="noopener noreferrer" className="markdown-link" {...props} />
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <pre className="markdown-pre">
          <code className={`markdown-code block-code ${className}`} {...props}>
            {children}
          </code>
        </pre>
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
