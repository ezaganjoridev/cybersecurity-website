import React from 'react';
import { AlertTriangle, ArrowRight, GitBranch, ShieldCheck } from 'lucide-react';

const PostDiagram = ({ diagram }) => {
  if (!diagram) return null;

  return (
    <figure className="my-10 overflow-hidden border border-dark-700 bg-dark-800/80" aria-labelledby="article-flow-title">
      <div className="post-diagram-header border-b border-dark-700 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-primary-400">
          <GitBranch className="h-4 w-4" aria-hidden="true" />
          {diagram.kicker}
        </div>
        <h2 id="article-flow-title" className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl">
          {diagram.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{diagram.summary}</p>
      </div>

      <div className="p-4 sm:p-6">
        <ol className="flex flex-col md:flex-row" aria-label={diagram.title}>
          {diagram.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative min-w-0 flex-1 pb-8 last:pb-0 md:pb-0 md:pr-6 md:last:pr-0"
            >
              <div className="h-full border border-dark-700 bg-dark-900/80 p-3.5">
                <span className="font-mono text-[10px] tracking-[0.16em] text-primary-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1.5 text-sm font-semibold leading-snug text-gray-100">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{step.detail}</p>
              </div>
              {index < diagram.steps.length - 1 && (
                <ArrowRight
                  className="absolute bottom-1 left-1/2 h-4 w-4 -translate-x-1/2 rotate-90 text-primary-500 md:bottom-auto md:left-auto md:right-1 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:rotate-0"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-5 grid gap-3 md:grid-cols-[1.05fr_0.95fr]">
          <div className="border border-amber-500/25 bg-amber-500/5 p-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-amber-300">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Why it matters
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{diagram.outcome}</p>
          </div>

          <div className="border border-primary-500/25 bg-primary-500/5 p-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-primary-300">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Break the chain
            </div>
            <ul className="mt-2 space-y-1.5">
              {diagram.controls.map((control) => (
                <li key={control} className="flex gap-2 text-xs leading-relaxed text-gray-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary-500" aria-hidden="true" />
                  <span>{control}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default PostDiagram;
