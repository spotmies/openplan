"use client";

// Plan cards as a spec sheet: Free, Starter and Pro on one hairline-ruled row, Starter as
// the dark, raised column, and Enterprise as a full-width plate underneath. Shared by the home page
// pricing section and the /pricing detail page.
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CircleHelp } from "lucide-react";
import { useNavigate } from "@/lib/router";
import { revealEase } from "@/components/motion/BlurReveal";
import { NOT_INCLUDED, plans, type Coverage, type Highlight, type Plan } from "@/lib/pricing";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Period = "monthly" | "yearly";

/** A hairline "+" mark sitting on a ruled corner. */
export function Cross({ className }: { className: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute h-[9px] w-[9px] ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/30" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-black/30" />
    </span>
  );
}

export function BillingSwitch({ yearly, onChange }: { yearly: boolean; onChange: (yearly: boolean) => void }) {
  // Each switch needs its own layoutId: /pricing renders two, and a shared id makes framer
  // treat them as one pill, so the highlight jumps to the other switch.
  const pillId = `billing-pill-${useId()}`;
  return (
    <div role="radiogroup" aria-label="Billing period" className="inline-flex border border-black/[0.1] bg-white p-[3px]">
      {([false, true] as const).map((isYearly) => {
        const on = yearly === isYearly;
        return (
          <button
            key={String(isYearly)}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(isYearly)}
            className="relative h-9 px-4 font-mono text-[11.5px] uppercase tracking-[0.1em] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            {on && (
              <motion.span
                layoutId={pillId}
                className="absolute inset-0 bg-brand-ink"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className={`relative flex items-center gap-2 transition-colors duration-300 ${on ? "text-white" : "text-neutral-500 hover:text-brand-ink"}`}>
              {isYearly ? "Yearly" : "Monthly"}
              {isYearly && <span className={on ? "text-[#7C9BFF]" : "text-brand"}>−17%</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** The price, which flips with a blur when the billing period changes. */
function Price({ plan, period, dark, size = "lg" }: { plan: Plan; period: Period; dark: boolean; size?: "lg" | "xl" }) {
  const price = plan.price[period];
  const struck = period === "yearly" && plan.price.monthly !== plan.price.yearly ? plan.price.monthly : null;
  return (
    <div>
      <p className={`m-0 h-4 font-mono text-[11.5px] uppercase tracking-[0.1em] ${dark ? "text-white/45" : "text-neutral-400"}`}>{plan.prefix ?? ""}</p>
      <div className="mt-2 flex min-h-[64px] flex-wrap items-end gap-x-2.5 gap-y-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={price}
            className={`${size === "xl" ? "text-[clamp(3rem,5vw,4.75rem)]" : "text-[clamp(3rem,4.4vw,4.25rem)]"} font-medium leading-[0.9] tracking-[-0.05em] tabular-nums`}
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: revealEase }}
          >
            {price}
          </motion.span>
        </AnimatePresence>
        {plan.cadence && <span className={`mb-1 font-mono text-[12px] tracking-[0.02em] ${dark ? "text-white/50" : "text-neutral-500"}`}>{plan.cadence}</span>}
        {struck && <span className={`mb-1 font-mono text-[12px] line-through ${dark ? "text-white/35" : "text-neutral-400"}`}>{struck}</span>}
      </div>
      <p className={`mb-0 mt-3 min-h-4 font-mono text-[11.5px] tracking-[0.02em] ${dark ? "text-white/45" : "text-neutral-400"}`}>{plan.note[period]}</p>
    </div>
  );
}

function Cta({ plan, dark }: { plan: Plan; dark: boolean }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(plan.href)}
      className={`group/cta flex h-12 w-full items-center justify-between px-5 font-mono text-[12px] uppercase tracking-[0.1em] transition-[background-color,border-color,color] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
        dark
          ? "bg-brand text-white hover:bg-brand-hover"
          : "border border-black/[0.14] bg-white text-brand-ink hover:border-brand-ink hover:bg-brand-ink hover:text-white"
      }`}
    >
      {plan.cta}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 ease-out group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
        strokeWidth={1.75}
      />
    </button>
  );
}

/** "?" after a feature: hover, focus or tap to see what the allowance covers. */
function CoverageTip({ tip, label, dark }: { tip: Coverage; label: string; dark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen} delayDuration={80}>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`What ${label} covers`}
          onClick={() => setOpen((o) => !o)}
          className={`relative top-[3px] inline-flex shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
            dark ? "text-white/40 hover:text-white" : "text-neutral-400 hover:text-brand-ink"
          }`}
        >
          <CircleHelp className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="rounded-none border border-white/10 bg-[#0A0A0B] px-4 py-3 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.45)]"
      >
        <p className="m-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/45">Covers about, per month</p>
        <ul className="m-0 mt-2.5 list-none space-y-1.5 p-0">
          {tip.map((l) => (
            <li key={l.label} className="flex items-baseline justify-between gap-6 text-[13px]">
              <span className="text-white/70">{l.label}</span>
              <span className="font-medium tabular-nums text-white">{l.figure}</span>
            </li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  );
}

function Features({ items, dark, columns = 1 }: { items: Highlight[]; dark: boolean; columns?: 1 | 2 }) {
  return (
    <ul className={`m-0 mt-4 list-none p-0 ${columns === 2 ? "sm:grid sm:grid-cols-2 sm:gap-x-8" : ""}`}>
      {items.map((item) => {
        const feature = typeof item === "string" ? item : item.text;
        return (
        <li
          key={feature}
          className={`flex items-baseline gap-3 border-b py-[11px] text-[14.5px] leading-snug ${columns === 1 ? "last:border-b-0" : ""} ${
            dark ? "border-white/[0.07] text-white/85" : "border-black/[0.05] text-neutral-700"
          }`}
        >
          <span
            aria-hidden
            className={`relative top-[-2px] h-[7px] w-[7px] shrink-0 ${item === NOT_INCLUDED ? "invisible" : ""} ${dark ? "bg-[#7C9BFF]" : "border border-neutral-400"}`}
          />
          {item === NOT_INCLUDED ? (
            <>
              <span aria-hidden className={dark ? "text-white/25" : "text-neutral-300"}>—</span>
              <span className="sr-only">Not included</span>
            </>
          ) : typeof item === "string" ? (
            feature
          ) : (
            // keep the "?" glued to the last word so it never wraps onto a line of its own
            <span>
              {feature.slice(0, feature.lastIndexOf(" ") + 1)}
              <span className="whitespace-nowrap">
                {feature.slice(feature.lastIndexOf(" ") + 1)}{" "}
                <CoverageTip tip={item.tip} label={feature} dark={dark} />
              </span>
            </span>
          )}
        </li>
        );
      })}
    </ul>
  );
}

/** "See all features": goes to the comparison table on the detail page. */
function DetailLink({ href, dark, label = "See all features" }: { href: string; dark: boolean; label?: string }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        // On the detail page the link is an in-page anchor; elsewhere it opens /pricing.
        const el = href.startsWith("#") ? document.getElementById(href.slice(1)) : null;
        if (el) {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        } else navigate(href);
      }}
      className={`group/link mt-6 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.1em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
        dark ? "text-[#7C9BFF] hover:text-white" : "text-brand-ink hover:text-brand"
      }`}
    >
      {label}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5" strokeWidth={1.75} />
    </button>
  );
}

const CARD_X = "px-[clamp(20px,2.4vw,36px)]";

export default function PlanCards({ yearly, detailHref = "/pricing#compare" }: { yearly: boolean; detailHref?: string }) {
  const period: Period = yearly ? "yearly" : "monthly";
  const row = [plans.free, plans.proSmall, plans.proTeam];
  const enterprise = plans.enterprise;

  return (
    <div className="relative border-t border-black/[0.1]">
      <Cross className="-left-[5px] -top-[5px]" />
      <Cross className="-right-[5px] -top-[5px]" />

      {/* Free, Starter, Pro */}
      <div className="grid md:grid-cols-3">
        {row.map((plan, i) => {
          const dark = plan.id === "proSmall";
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col border-b border-black/[0.1] ${i > 0 ? "md:border-l" : ""} ${
                dark
                  ? "z-[1] bg-brand-ink text-white md:-mt-6 md:border-b-0 md:border-l-0 md:shadow-[0_-24px_60px_-36px_rgba(47,91,255,0.5)]"
                  : "bg-white"
              }`}
            >
              {dark && <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-brand" />}
              {dark && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_45%_at_50%_0%,rgba(47,91,255,0.22),transparent_70%)]"
                />
              )}

              <div className={`relative ${CARD_X} pb-8 ${dark ? "pt-[calc(clamp(28px,3vw,40px)+24px)]" : "pt-[clamp(28px,3vw,40px)]"}`}>
                <div className="flex items-center justify-between gap-3 font-mono text-[11.5px] uppercase leading-none tracking-[0.1em]">
                  <span className={dark ? "text-white/50" : "text-neutral-400"}>
                    {String(i + 1).padStart(2, "0")} <span className={dark ? "text-white/90" : "text-brand-ink"}>{plan.name}</span>
                  </span>
                  {dark && (
                    <span className="flex items-center gap-2 text-[#7C9BFF]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7C9BFF]" />
                      Most popular
                    </span>
                  )}
                </div>
                <p className={`mb-0 mt-5 min-h-[48px] max-w-[30ch] text-[15px] leading-[1.55] ${dark ? "text-white/65" : "text-neutral-600"}`}>{plan.bestFor}</p>

                <div className="mt-6">
                  <Price plan={plan} period={period} dark={dark} />
                </div>

                <div className="mt-8">
                  <Cta plan={plan} dark={dark} />
                </div>
              </div>

              <div className={`relative flex flex-1 flex-col border-t ${CARD_X} pb-9 pt-7 ${dark ? "border-white/10" : "border-black/[0.08]"}`}>
                <p className={`m-0 font-mono text-[11px] uppercase tracking-[0.12em] ${dark ? "text-white/40" : "text-neutral-400"}`}>
                  What you get
                </p>
                <Features items={plan.highlights} dark={dark} />
                <div className="mt-auto">
                  <DetailLink href={detailHref} dark={dark} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Enterprise: a separate full-width plate under the three plans */}
      <article className="relative mt-[clamp(32px,4vw,56px)] grid border-y border-black/[0.1] bg-[#FAFAFB] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Cross className="-left-[5px] -top-[5px] z-[1]" />
        <Cross className="-right-[5px] -top-[5px] z-[1]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_right,black,transparent_70%)]" />
        <div className={`relative ${CARD_X} pb-9 pt-[clamp(28px,3vw,40px)] lg:border-r lg:border-black/[0.08]`}>
          <div className="flex items-center justify-between gap-3 font-mono text-[11.5px] uppercase leading-none tracking-[0.1em]">
            <span className="text-neutral-400">
              04 <span className="text-brand-ink">{enterprise.name}</span>
            </span>
            <span className="text-neutral-400">Annual agreement</span>
          </div>
          <p className="mb-0 mt-5 max-w-[34ch] text-[15px] leading-[1.55] text-neutral-600">{enterprise.bestFor}</p>
          <div className="mt-6">
            <Price plan={enterprise} period={period} dark={false} size="xl" />
          </div>
          <div className="mt-8 max-w-[420px]">
            <Cta plan={enterprise} dark={false} />
          </div>
        </div>
        <div className={`relative ${CARD_X} pb-9 pt-[clamp(28px,3vw,40px)] max-lg:border-t max-lg:border-black/[0.08]`}>
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400">What you get</p>
          <Features items={enterprise.highlights} dark={false} columns={2} />
          <DetailLink href={detailHref} dark={false} label="Compare Enterprise" />
        </div>
      </article>
    </div>
  );
}
