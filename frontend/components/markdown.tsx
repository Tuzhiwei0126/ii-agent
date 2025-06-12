"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeMathJax from "rehype-mathjax";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";
import "./markdown.css";

interface MarkdownProps {
  children: string | null | undefined;
}

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, rehypeHighlight, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeMathJax, rehypeKatex]}
        components={{
          a: ({ ...props }) => (
            <a target="_blank" rel="noopener noreferrer" className="markdown-link" {...props} />
          ),
          code: ({ inline, children, ...props }) => (
            <code className={`markdown-code ${inline ? 'inline-code' : 'block-code'}`} {...props}>
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="markdown-pre">{children}</pre>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
