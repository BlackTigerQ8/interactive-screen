import { motion } from "framer-motion";
import type { FC, MouseEvent } from "react";
import type { MenuItem } from "./InfiniteMenu";
import content from "../content.json";

type KerpSectionContent = {
  title: string;
  area: string;
  role: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
  focus: string[];
};

type ContentFile = {
  kerpSections?: Record<string, KerpSectionContent>;
};

const KERP_SECTIONS: Record<string, KerpSectionContent> =
  (content as ContentFile).kerpSections ?? {};

export interface KerpModalProps {
  item: MenuItem;
  onClose: () => void;
}

const KerpFullScreenModal: FC<KerpModalProps> = ({ item, onClose }) => {
  const section = KERP_SECTIONS[item.title] ?? {
    title: item.title || "Kuwait Environmental Remediation Program (KERP)",
    area: "Kuwait Oil Company (KOC) areas",
    role: "Environmental remediation of oil-contaminated soil and related impacts",
    headline:
      "One of the largest environmental remediation programs in the world, restoring land impacted during the 1990–1991 conflict.",
    description:
      "KERP addresses legacy damage from oil lakes, contaminated soil and related impacts across the Kuwaiti desert. The program combines large‑scale earthworks, treatment technologies, engineered landfills and extensive monitoring to return land to a safe and sustainable condition.",
    metrics: [
      { label: "Total Soil Addressed", value: "≈ 25+ million m³" },
      { label: "Program Duration", value: "Multi‑year (≈ decade‑scale)" },
      { label: "Stakeholders", value: "KOC, contractors & regulators" },
    ],
    focus: [
      "Survey, design and prioritization of contaminated areas",
      "Selection and operation of appropriate treatment technologies",
      "Long‑term environmental monitoring and land restoration",
    ],
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex h-full w-full overflow-y-auto bg-sky-950/80 backdrop-blur-md"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <motion.div
        className="mx-auto my-4 flex min-h-[90vh] w-full max-w-5xl flex-col gap-4 px-3 text-slate-900 sm:my-6 sm:px-4 lg:my-8 lg:max-w-6xl lg:flex-row lg:gap-6"
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Left: large image / visual */}
        <div className="relative w-full shrink-0 min-h-[220px] overflow-hidden rounded-2xl border border-sky-200 bg-sky-50 sm:min-h-[260px] sm:rounded-3xl md:min-h-[300px] lg:h-auto lg:w-auto lg:flex-1">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-900/70 via-sky-700/10 to-transparent" />
          <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-sky-300/70 bg-sky-500/20 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-50">
            Kuwait Environmental Remediation Program
          </div>
        </div>

        {/* Right: KERP narrative */}
        <div className="mt-3 flex w-full flex-col rounded-2xl border border-sky-200 bg-white p-4 shadow-xl sm:mt-4 sm:rounded-3xl sm:p-5 lg:mt-0 lg:w-auto lg:flex-1 lg:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-sky-600">
                KERP Project Detail
              </p>
              <h2 className="mt-1 text-lg font-semibold leading-snug text-sky-700 lg:text-xl">
                {section.title}
              </h2>
              <p className="mt-1 text-[11px] text-slate-500">
                Area: {section.area} · Role: {section.role}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="cursor-pointer rounded-full border border-slate-300 px-3 py-1 text-[11px] text-slate-700 hover:border-sky-500 hover:text-sky-700"
                onClick={onClose}
              >
                Close ✕
              </button>
            </div>
          </div>

          <p className="mt-3 text-[13px] font-medium text-sky-700">
            {section.headline}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-sky-700">
            {section.description}
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Key Focus on Site
              </p>
              <div className="mt-2 grid gap-2">
                {section.focus.map((itemFocus) => (
                  <div
                    key={itemFocus}
                    className="flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3 py-2 text-[11px] text-slate-800"
                  >
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                    <p>{itemFocus}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-sky-100 bg-sky-50 p-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600">
                Program Metrics (Indicative)
              </p>
              <div className="grid gap-2">
                {section.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-baseline justify-between rounded-xl bg-white px-3 py-2 shadow-sm"
                  >
                    <span className="text-[11px] text-slate-500">
                      {metric.label}
                    </span>
                    <span className="text-[13px] font-semibold text-sky-700">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* {item.link && (
                <button
                  type="button"
                  className="cursor-pointer mt-3 w-full rounded-full bg-sky-600 px-4 py-2 text-[12px] font-semibold text-white hover:bg-sky-500"
                  onClick={onOpenLink}
                >
                  Open Related Document / Link
                </button>
              )} */}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default KerpFullScreenModal;
