import React from 'react';
import EditorialImage from './EditorialImage';

const cyberScenes = [
  {
    base: '/images/engagements/incident-response-fieldwork',
    title: 'Incident response & DFIR',
    description: 'Coordinated containment and evidence review.',
    alt: 'Four professionals reviewing a laptop during a focused working session.',
  },
  {
    base: '/images/engagements/authorized-testing',
    title: 'Authorized security testing',
    description: 'Controlled validation against an agreed scope.',
    alt: 'Hands typing on a laptop with code softly out of focus on the screen.',
  },
  {
    base: '/images/engagements/detection-engineering',
    title: 'Detection engineering',
    description: 'Turning telemetry into actionable coverage.',
    alt: 'Analyst wearing a headset while reviewing dashboards across three monitors.',
  },
];

export const CyberFieldwork = () => (
  <figure className="mb-7 overflow-hidden border border-dark-700 bg-dark-800/55">
    <div className="grid grid-cols-1 sm:grid-cols-3">
      {cyberScenes.map((scene) => (
        <div key={scene.title} className="group border-b last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 border-dark-700">
          <div className="aspect-[16/10] overflow-hidden bg-dark-900">
            <EditorialImage
              base={scene.base}
              alt={scene.alt}
              sizes="(min-width: 1024px) 352px, (min-width: 640px) 33vw, 100vw"
              className="block w-full h-full"
              imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </div>
          <div className="p-4">
            <h4 className="text-sm font-semibold text-white">{scene.title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-gray-400">{scene.description}</p>
          </div>
        </div>
      ))}
    </div>
  </figure>
);

export const OperationsFieldwork = () => (
  <figure className="mb-7 grid overflow-hidden border border-dark-700 bg-dark-800/55 md:grid-cols-[1.45fr_0.55fr]">
    <div className="aspect-[16/9] overflow-hidden bg-dark-900 md:aspect-auto md:min-h-64">
      <EditorialImage
        base="/images/engagements/device-hardening"
        alt="Technician working on a laptop at an electronics workbench."
        sizes="(min-width: 768px) 700px, 100vw"
        className="block w-full h-full"
        imageClassName="w-full h-full object-cover"
      />
    </div>
    <figcaption className="flex flex-col justify-center border-t border-dark-700 p-5 md:border-l md:border-t-0">
      <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-primary-400">
        Operational fieldwork
      </span>
      <h4 className="mt-2 text-lg font-semibold text-white">Secure device lifecycle</h4>
      <p className="mt-2 text-sm leading-relaxed text-gray-400">
        Standard builds, asset visibility, endpoint controls, and clean handoff documentation.
      </p>
    </figcaption>
  </figure>
);
