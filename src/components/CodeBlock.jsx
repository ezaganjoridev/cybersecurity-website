import React, { useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';

/**
 * CodeBlock
 * Monospace block for detection queries and shell commands. Long lines scroll
 * inside the block rather than widening the article column, and the copy
 * button hands the reader the rule without a lossy manual selection.
 *
 * `label` names the platform the snippet targets (e.g. "Microsoft Sentinel"),
 * not just the language, because the same KQL runs against different schemas
 * in Sentinel and Defender XDR.
 */
const CodeBlock = ({ code, label, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    // clipboard API is unavailable over plain http and in some embedded
    // browsers; failing silently here is better than throwing at the reader.
    navigator.clipboard?.writeText(code).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
      () => {}
    );
  }, [code]);

  return (
    <div className={`terminal-surface ${className}`}>
      <div className="terminal-bar flex items-center justify-between gap-3 px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider terminal-muted">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] terminal-muted transition-colors hover:text-[rgb(var(--color-term-accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-term-accent))]"
          aria-label={`Copy ${label} snippet`}
        >
          {copied
            ? <><Check className="h-3 w-3" aria-hidden="true" />Copied</>
            : <><Copy className="h-3 w-3" aria-hidden="true" />Copy</>}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 text-[12.5px] leading-relaxed">
        <code className="font-mono terminal-ink whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
