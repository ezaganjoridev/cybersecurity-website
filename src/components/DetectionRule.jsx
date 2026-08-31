import React, { useId, useState } from 'react';
import { Crosshair, ShieldAlert, Info } from 'lucide-react';
import CodeBlock from './CodeBlock';

/**
 * DetectionRule
 * One detection presented across every query language it applies to. The
 * languages are tabbed rather than stacked because a reader runs exactly one
 * SIEM and stacking four dialects makes the article four times as long for no
 * added value to any individual reader.
 *
 * `logic` states what the rule keys on, `fp` states what will fire it
 * legitimately. A rule shipped without its false-positive profile is how a
 * SOC ends up tuning it to death in week two.
 */
const DetectionRule = ({ rule }) => {
  const [active, setActive] = useState(0);
  const uid = useId();
  const queries = rule.queries || [];
  const current = queries[active];

  return (
    <section className="my-10 border border-dark-700 bg-dark-800/40">
      <header className="border-b border-dark-700 px-5 py-4">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="font-mono text-xs text-primary-400">{rule.id}</span>
          <h3 className="text-base font-semibold leading-snug text-white">{rule.name}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {rule.technique && (
            <span className="inline-flex items-center gap-1 border border-primary-500/25 bg-primary-500/5 px-2 py-0.5 font-mono text-[11px] text-primary-300/90">
              <Crosshair className="h-3 w-3" aria-hidden="true" />
              {rule.technique}
            </span>
          )}
          {(rule.tags || []).map((t) => (
            <span key={t} className="border border-dark-700 bg-dark-900/60 px-2 py-0.5 font-mono text-[11px] text-gray-500">
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="space-y-3 px-5 py-4">
        <p className="flex gap-2.5 text-sm leading-relaxed text-gray-300">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" aria-hidden="true" />
          <span>{rule.logic}</span>
        </p>
        {rule.fp && (
          <p className="flex gap-2.5 text-sm leading-relaxed text-gray-400">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" aria-hidden="true" />
            <span><span className="text-gray-300">Expect to tune out:</span> {rule.fp}</span>
          </p>
        )}
      </div>

      {queries.length > 0 && (
        <div className="px-5 pb-5">
          <div role="tablist" aria-label={`Query language for ${rule.name}`} className="mb-3 flex flex-wrap gap-1">
            {queries.map((q, i) => (
              <button
                key={q.lang}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${uid}-panel-${i}`}
                onClick={() => setActive(i)}
                className={`border px-2.5 py-1 font-mono text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 ${
                  i === active
                    ? 'border-primary-500/40 bg-primary-500/10 text-primary-200'
                    : 'border-dark-700 text-gray-500 hover:border-dark-600 hover:text-gray-300'
                }`}
              >
                {q.lang}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`${uid}-panel-${active}`} aria-labelledby={`${uid}-tab-${active}`}>
            <CodeBlock code={current.code} label={current.label} />
          </div>
        </div>
      )}
    </section>
  );
};

export default DetectionRule;
