"use client";

// /pricing: the full plan comparison. Hero with the plan cards, then a sticky-headed comparison
// table grouped like the pricing sheet, how tokens are counted, top-ups, billing, FAQ and an
// Enterprise band. Same vocabulary as the home page: railed frame, mono labels, hairlines,
// square corners, the house blue as accent. All figures come from src/lib/pricing.ts.
import { Fragment, useId, useState } from "react";
import { ArrowUpRight, Check, Crown, FileText, Layers, Minus, Plus, RefreshCw, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { useNavigate } from "@/lib/router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlurReveal, { BlurWords } from "@/components/motion/BlurReveal";
import PlanCards, { BillingSwitch, Cross } from "@/components/pricing/PlanCards";
import {
  PLAN_IDS,
  billing,
  comparison,
  plans,
  pricingFaqs,
  tokenEstimates,
  tokenRates,
  topUps,
  type Cell,
  type PlanId,
} from "@/lib/pricing";

/** One icon per token rate row, in the same order as tokenRates. */
const RATE_ICONS: LucideIcon[] = [Zap, Sparkles, Crown, FileText, RefreshCw, Layers];

const FRAME = "relative mx-auto w-[min(1600px,calc(100%-2*clamp(12px,2.4vw,36px)))] border-x border-black/[0.08]";
const PAD = "px-[clamp(20px,3vw,48px)]";

/** Feature column + four plan columns on desktop; feature + the chosen plan on phones. */
const GRID = "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(180px,1.15fr)_repeat(4,minmax(0,1fr))]";

function Crumb({ label }: { label: string }) {
  return (
    <p className="m-0 font-mono text-[13px] uppercase leading-none tracking-[0.1em] text-neutral-500">
      <span className="text-brand-ink">OpenPlan</span> <span className="text-neutral-300">/</span> {label}
    </p>
  );
}

function SectionHead({ crumb, title, muted, lede }: { crumb: string; title: string; muted: string; lede?: string }) {
  return (
    <div className="grid items-end gap-x-[clamp(32px,5vw,80px)] gap-y-6 lg:grid-cols-2">
      <div>
        <BlurReveal>
          <Crumb label={crumb} />
        </BlurReveal>
        <h2 className="mb-0 mt-7 text-balance text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          <BlurWords text={title} delay={0.05} />{" "}
          <span className="block text-neutral-400">
            <BlurWords text={muted} delay={0.15} />
          </span>
        </h2>
      </div>
      {lede && (
        <BlurReveal delay={0.2} className="lg:justify-self-end">
          <p className="m-0 max-w-[44ch] text-pretty text-[16.5px] leading-[1.6] text-neutral-600">{lede}</p>
        </BlurReveal>
      )}
    </div>
  );
}

function CellValue({ cell, highlight }: { cell: Cell; highlight: boolean }) {
  if (cell === true)
    return (
      <>
        <Check className={`h-4 w-4 ${highlight ? "text-brand" : "text-brand-ink"}`} strokeWidth={2} aria-hidden />
        <span className="sr-only">Included</span>
      </>
    );
  if (cell === false)
    return (
      <>
        <Minus className="h-4 w-4 text-neutral-300" strokeWidth={1.75} aria-hidden />
        <span className="sr-only">Not included</span>
      </>
    );
  if (typeof cell === "string") return <span className="text-[14.5px] leading-snug text-brand-ink">{cell}</span>;
  if ("lines" in cell)
    return (
      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
        {cell.lines.map((l) => (
          <li key={l.label} className="text-[13.5px] leading-snug text-neutral-500">
            <span className="font-medium tabular-nums text-brand-ink">{l.figure}</span> {l.label}
          </li>
        ))}
      </ul>
    );
  return (
    <span className="flex flex-col gap-1.5">
      <span className="text-[14.5px] leading-snug text-brand-ink">{cell.value}</span>
      {cell.note && <span className="text-[12.5px] leading-[1.45] text-neutral-500">{cell.note}</span>}
      {cell.roadmap && (
        <span className="inline-flex w-fit items-center gap-1.5 border border-black/[0.12] px-1.5 py-[3px] font-mono text-[10px] uppercase leading-none tracking-[0.1em] text-neutral-500">
          <span aria-hidden className="h-1 w-1 rounded-full bg-amber-500" />
          Roadmap
        </span>
      )}
    </span>
  );
}

function Comparison({ yearly, onYearlyChange }: { yearly: boolean; onYearlyChange: (yearly: boolean) => void }) {
  const [mobilePlan, setMobilePlan] = useState<PlanId>("proSmall");
  const period = yearly ? "yearly" : "monthly";
  const show = (id: PlanId) => (id === mobilePlan ? "flex" : "hidden md:flex");

  return (
    <div className="relative mt-3">
      {/* Sticky billing switch + plan header (sits under the fixed navigation) */}
      <div className="sticky top-16 z-20 bg-white/90 backdrop-blur-xl backdrop-saturate-150 md:top-[68px]">
        <div className="flex pb-6 pt-3 md:justify-end">
          <BillingSwitch yearly={yearly} onChange={onYearlyChange} />
        </div>
        <div className="border-y border-black/[0.1]">
        {/* Phones: pick the plan column to compare */}
        <div role="tablist" aria-label="Plan to compare" className="grid grid-cols-4 border-b border-black/[0.08] md:hidden">
          {PLAN_IDS.map((id) => {
            const on = id === mobilePlan;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setMobilePlan(id)}
                className={`relative h-11 px-1 font-mono text-[10.5px] uppercase tracking-[0.08em] transition-colors ${on ? "text-brand-ink" : "text-neutral-400"}`}
              >
                {plans[id].name}
                {on && <span aria-hidden className="absolute inset-x-2 bottom-0 h-[2px] bg-brand" />}
              </button>
            );
          })}
        </div>
        <div className={GRID}>
          <div className="flex items-end px-4 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400 md:px-5">Compare plans</div>
          {PLAN_IDS.map((id) => {
            const plan = plans[id];
            const hl = id === "proSmall";
            return (
              <div key={id} className={`${show(id)} flex-col justify-end border-l border-black/[0.08] px-4 py-4 md:px-5`}>
                <div>
                  <p className={`m-0 font-mono text-[11.5px] uppercase tracking-[0.1em] ${hl ? "text-brand" : "text-brand-ink"}`}>{plan.name}</p>
                  <p className="mb-0 mt-1.5 text-[13.5px] text-neutral-500">
                    {plan.prefix ? `${plan.prefix} ` : ""}
                    <span className="font-medium tabular-nums text-brand-ink">{plan.price[period]}</span> {plan.cadence}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Groups */}
      {comparison.map((group) => (
        <Fragment key={group.title}>
          <div className="flex items-center gap-2.5 border-b border-black/[0.1] bg-[#FAFAFB] px-4 pb-3 pt-9 md:px-5">
            <span aria-hidden className="h-[7px] w-[7px] bg-brand" />
            <h3 className="m-0 font-mono text-[12px] font-normal uppercase tracking-[0.12em] text-brand-ink">{group.title}</h3>
          </div>
          <div role="table" aria-label={group.title}>
            {group.rows.map((base) => {
              // rows with a monthly variant follow the billing switch
              const alt = !yearly ? base.monthly : undefined;
              const r = { ...base, label: alt?.label ?? base.label, values: alt?.values ?? base.values };
              return (
              <div key={base.label} role="row" className={`${GRID} border-b border-black/[0.06] transition-colors hover:bg-black/[0.015]`}>
                <div role="rowheader" className="flex flex-col justify-center gap-1 px-4 py-4 md:px-5">
                  <span className="text-[14.5px] leading-snug text-neutral-700">{r.label}</span>
                  {r.hint && <span className="font-mono text-[11px] tracking-[0.02em] text-neutral-400">{r.hint}</span>}
                </div>
                {PLAN_IDS.map((id) => (
                  <div
                    key={id}
                    role="cell"
                    className={`${show(id)} items-center border-l border-black/[0.06] px-4 py-4 md:px-5 ${id === "proSmall" ? "bg-brand/[0.025]" : ""}`}
                  >
                    <CellValue cell={r.values[id]} highlight={id === "proSmall"} />
                  </div>
                ))}
              </div>
              );
            })}
          </div>
        </Fragment>
      ))}
      <p className="mb-0 mt-5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-neutral-400">
        Prices in USD unless noted · Taxes may apply · Compliance packs marked roadmap are not yet available
      </p>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  const uid = useId();
  return (
    <ul className="relative m-0 list-none border-t border-black/[0.1] p-0">
      <Cross className="-left-[5px] -top-[5px]" />
      <Cross className="-right-[5px] -top-[5px]" />
      {pricingFaqs.map((f, i) => {
        const on = open === i;
        const panel = `${uid}-a${i}`;
        const button = `${uid}-q${i}`;
        return (
          <li key={f.q} className="group relative border-b border-black/[0.1]">
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 top-[-1px] h-[2px] origin-left bg-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
            <h3 className="m-0">
              <button
                id={button}
                type="button"
                aria-expanded={on}
                aria-controls={panel}
                onClick={() => setOpen(on ? -1 : i)}
                className="flex w-full items-start gap-4 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/40 sm:gap-6"
              >
                <span className={`mt-[6px] font-mono text-[11.5px] tracking-[0.1em] transition-colors duration-300 ${on ? "text-brand" : "text-neutral-400"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[clamp(1.05rem,1.4vw,1.25rem)] font-medium leading-[1.3] tracking-[-0.02em]">{f.q}</span>
                <span
                  aria-hidden
                  className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-[background-color,border-color,color] duration-500 ${
                    on ? "border-brand bg-brand text-white" : "border-black/[0.12] text-brand-ink group-hover:border-brand-ink"
                  }`}
                >
                  <Plus className={`h-4 w-4 transition-transform duration-500 ${on ? "rotate-45" : ""}`} strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={button}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden" inert={!on}>
                <div className="flex gap-4 pb-7 sm:gap-6">
                  <span aria-hidden className="invisible font-mono text-[11.5px] tracking-[0.1em]">00</span>
                  <p className="m-0 max-w-[64ch] flex-1 text-[15.5px] leading-[1.65] text-neutral-600 sm:pr-14">{f.a}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const PricingPage = () => {
  const [yearly, setYearly] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <Navigation />

      <main>
        {/* Hero + plans */}
        <section className="bg-white">
          <div className={FRAME}>
            <div className={`${PAD} pb-[clamp(56px,7vw,96px)] pt-[clamp(120px,13vw,176px)]`}>
              <div className="grid items-end gap-x-[clamp(32px,5vw,80px)] gap-y-8 lg:grid-cols-2">
                <div>
                  <BlurReveal>
                    <Crumb label="Pricing" />
                  </BlurReveal>
                  <h1 className="mb-0 mt-7 text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.045em]">
                    <BlurWords text="Pay for the projects you run." delay={0.05} />{" "}
                    <span className="block text-neutral-400">
                      <BlurWords text="Not for seats." delay={0.25} />
                    </span>
                  </h1>
                </div>
                <BlurReveal delay={0.3} className="lg:justify-self-end">
                  <p className="m-0 max-w-[42ch] text-pretty text-[17px] leading-[1.55] text-neutral-600">
                    Every plan is priced per active project per month, with AI, storage and users included. Start free and
                    add projects as your programs grow.
                  </p>
                  <div className="mt-6">
                    <BillingSwitch yearly={yearly} onChange={setYearly} />
                  </div>
                </BlurReveal>
              </div>

              <BlurReveal delay={0.1} y={24} blur={12} className="mt-[clamp(48px,6vw,80px)]">
                <PlanCards yearly={yearly} detailHref="#compare" />
              </BlurReveal>
            </div>
          </div>
        </section>

        {/* Full comparison */}
        <section id="compare" className="scroll-mt-16 bg-white md:scroll-mt-[68px]">
          <div className={FRAME}>
            <div className={`${PAD} py-[clamp(56px,7vw,96px)]`}>
              <SectionHead
                crumb="Compare"
                title="Every plan,"
                muted="line by line."
                lede="Prices, allowances, capacity, security and support for each plan. Starter and Pro allowances are per project and pooled across your organization."
              />
              <Comparison yearly={yearly} onYearlyChange={setYearly} />
            </div>
          </div>
        </section>

        {/* Tokens */}
        <section id="tokens" className="bg-white">
          <div className={FRAME}>
            <div className={`${PAD} border-t border-black/[0.08] py-[clamp(56px,7vw,96px)]`}>
              <SectionHead
                crumb="AI tokens"
                title="How tokens"
                muted="are counted."
                lede="Usage is measured in Standard tokens. 1 Standard token is 1 token processed by our Standard AI model. Included tokens reset monthly, and the dashboard token counter shows usage by project, user and feature."
              />
              <div className="mt-[clamp(40px,5vw,64px)] grid gap-[clamp(24px,3vw,40px)] lg:grid-cols-2">
                <BlurReveal y={14} blur={8}>
                  <div className="border border-black/[0.1]">
                    <div className="flex items-center justify-between border-b border-black/[0.08] px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400">
                      <span>What you use</span>
                      <span>Counts as</span>
                    </div>
                    <ul className="m-0 list-none p-0">
                      {tokenRates.map((t, i) => {
                        const Icon = RATE_ICONS[i];
                        return (
                        <li key={t.model} className="group flex items-center justify-between gap-4 border-b border-black/[0.06] px-5 py-4 last:border-b-0">
                          <span className="flex items-center gap-4">
                            <span
                              aria-hidden
                              className="flex h-10 w-10 shrink-0 items-center justify-center bg-black/[0.05] text-brand-ink transition-colors duration-300 group-hover:bg-black/[0.09]"
                            >
                              {Icon && <Icon className="h-5 w-5" strokeWidth={1.75} />}
                            </span>
                            <span>
                              <span className="block text-[15px] text-brand-ink">{t.model}</span>
                              <span className="mt-0.5 block text-[13px] text-neutral-500">{t.detail}</span>
                            </span>
                          </span>
                          <span className="font-mono text-[20px] tabular-nums tracking-[-0.02em] text-brand-ink">{t.rate}</span>
                        </li>
                        );
                      })}
                    </ul>
                  </div>
                </BlurReveal>
                <BlurReveal y={14} blur={8} delay={0.08}>
                  <div className="border border-black/[0.1]">
                    <div className="border-b border-black/[0.08] px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400">
                      What an allowance gets you (Standard model)
                    </div>
                    <ul className="m-0 list-none p-0">
                      {tokenEstimates.map((e) => (
                        <li key={e.plan} className="border-b border-black/[0.06] px-5 py-5 last:border-b-0">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-brand-ink">{e.plan}</span>
                            <span className="font-mono text-[12px] text-neutral-400">{e.allowance}</span>
                          </div>
                          <p className="mb-0 mt-2 text-[17px] leading-snug tracking-[-0.01em] text-brand-ink">{e.actions}</p>
                        </li>
                      ))}
                    </ul>
                    <p className="m-0 border-t border-black/[0.08] px-5 py-3.5 text-[12.5px] leading-[1.5] text-neutral-500">
                      Estimates. Actual usage depends on prompt length, attachments and model choice.
                    </p>
                  </div>
                </BlurReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Top-ups */}
        <section id="top-ups" className="bg-white">
          <div className={FRAME}>
            <div className={`${PAD} border-t border-black/[0.08] py-[clamp(56px,7vw,96px)]`}>
              <SectionHead
                crumb="Top-ups"
                title="Need more AI?"
                muted="Top up any time."
                lede="Token packs are sold separately from plans and available on Starter, Pro and Enterprise. Top-up tokens never expire while your account is active."
              />
              <BlurReveal y={14} blur={8} className="mt-[clamp(40px,5vw,64px)]">
                <div className="relative grid border-t border-black/[0.1] sm:grid-cols-2 lg:grid-cols-4">
                  <Cross className="-left-[5px] -top-[5px]" />
                  <Cross className="-right-[5px] -top-[5px]" />
                  {topUps.map((t, i) => (
                    <div
                      key={t.tokens}
                      className={`border-b border-black/[0.1] px-[clamp(20px,2.4vw,32px)] py-8 ${i % 2 === 1 ? "sm:border-l" : ""} ${i > 0 ? "lg:border-l" : ""}`}
                    >
                      <p className="m-0 font-mono text-[11.5px] uppercase tracking-[0.1em] text-neutral-400">
                        {String(i + 1).padStart(2, "0")} <span className="text-brand-ink">Pack</span>
                      </p>
                      <p className="mb-0 mt-6 text-[clamp(2.4rem,3.4vw,3.2rem)] font-medium leading-none tracking-[-0.05em] tabular-nums">{t.tokens}</p>
                      <p className="mb-0 mt-2 font-mono text-[12px] text-neutral-500">Standard tokens</p>
                      <p className="mb-0 mt-6 flex items-baseline gap-2">
                        <span className="text-[22px] font-medium tracking-[-0.02em] tabular-nums">{t.price}</span>
                        {t.note && <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-brand">{t.note}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </BlurReveal>
              <p className="mb-0 mt-5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-neutral-400">
                Accounts lapse after 24 consecutive months of inactivity · Balances are non-refundable
              </p>
            </div>
          </div>
        </section>

        {/* Billing */}
        <section id="billing" className="bg-white">
          <div className={FRAME}>
            <div className={`${PAD} border-t border-black/[0.08] py-[clamp(56px,7vw,96px)]`}>
              <SectionHead crumb="Billing" title="Simple billing," muted="in USD or INR." />
              <div className="mt-[clamp(40px,5vw,64px)] grid gap-px border border-black/[0.1] bg-black/[0.1] sm:grid-cols-2 lg:grid-cols-4">
                {billing.map((b, i) => (
                  <BlurReveal key={b.title} y={12} blur={8} delay={i * 0.05} className="bg-white px-6 py-7">
                    <p className="m-0 font-mono text-[11.5px] uppercase tracking-[0.1em] text-neutral-400">
                      {String(i + 1).padStart(2, "0")} <span className="text-brand-ink">{b.title}</span>
                    </p>
                    <p className="mb-0 mt-4 text-[15px] leading-[1.6] text-neutral-600">{b.body}</p>
                  </BlurReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white">
          <div className={FRAME}>
            <div className={`${PAD} border-t border-black/[0.08] py-[clamp(56px,7vw,96px)]`}>
              <div className="grid gap-x-[clamp(32px,5vw,80px)] gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <BlurReveal>
                    <Crumb label="Pricing FAQ" />
                  </BlurReveal>
                  <h2 className="mb-0 mt-7 text-balance text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                    <BlurWords text="Pricing," delay={0.05} />{" "}
                    <span className="block text-neutral-400">
                      <BlurWords text="answered." delay={0.15} />
                    </span>
                  </h2>
                </div>
                <BlurReveal delay={0.1} y={20} blur={10}>
                  <Faq />
                </BlurReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise band */}
        <section className="bg-[#0A0A0B] text-white">
          <div className="relative mx-auto w-[min(1600px,calc(100%-2*clamp(12px,2.4vw,36px)))] border-x border-white/[0.08]">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(47,91,255,0.28),transparent_70%)]" />
            <div className={`relative ${PAD} grid items-end gap-10 py-[clamp(64px,8vw,112px)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]`}>
              <div>
                <p className="m-0 font-mono text-[13px] uppercase leading-none tracking-[0.1em] text-white/50">
                  <span className="text-white">OpenPlan</span> <span className="text-white/30">/</span> Enterprise
                </p>
                <h2 className="mb-0 mt-7 text-balance text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                  Governance, scale and a partner in the rollout.{" "}
                  <span className="text-white/45">Priced for your programs.</span>
                </h2>
                <p className="mb-0 mt-6 max-w-[56ch] text-[16px] leading-[1.6] text-white/60">
                  15 projects, 150 users and 600M tokens included. SAML and SCIM, a 99.9% uptime SLA, a named CSM and
                  data residency options in India, the EU or the US.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="group/cta flex h-12 items-center sm:flex-1 lg:flex-none justify-between bg-brand px-5 font-mono text-[12px] uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-hover"
                >
                  Contact sales
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/waitlist")}
                  className="group/cta flex h-12 items-center sm:flex-1 lg:flex-none justify-between border border-white/20 px-5 font-mono text-[12px] uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#0A0A0B]"
                >
                  Start free
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
