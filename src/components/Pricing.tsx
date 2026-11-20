"use client";

// Pricing as a spec sheet inside the page's railed frame: Free, Starter and Pro on one
// hairline-ruled row with Enterprise as a full-width plate underneath. The full plan comparison
// lives on /pricing. Mono labels, square corners, the house blue as accent.
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "@/lib/router";
import BlurReveal, { BlurWords } from "@/components/motion/BlurReveal";
import PlanCards, { BillingSwitch } from "@/components/pricing/PlanCards";

const Pricing = () => {
  const [yearly, setYearly] = useState(true);
  const navigate = useNavigate();

  return (
    <section id="pricing" className="relative bg-white text-brand-ink">
      <div className="relative mx-auto w-[min(1600px,calc(100%-2*clamp(12px,2.4vw,36px)))] border-x border-black/[0.08]">
        <div className="px-[clamp(20px,3vw,48px)] py-[clamp(88px,10vw,136px)]">
          {/* Header: title left, lede and billing switch right */}
          <div className="grid items-end gap-x-[clamp(32px,5vw,80px)] gap-y-8 lg:grid-cols-2">
            <div>
              <BlurReveal>
                <p className="m-0 font-mono text-[13px] uppercase leading-none tracking-[0.1em] text-neutral-500">
                  <span className="text-brand-ink">OpenPlan</span> <span className="text-neutral-300">/</span> Pricing
                </p>
              </BlurReveal>
              <h2 className="mt-7 text-balance text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.04em]">
                <BlurWords text="Start free." delay={0.05} />{" "}
                <span className="block text-neutral-400">
                  <BlurWords text="Scale with the program." delay={0.18} />
                </span>
              </h2>
            </div>
            <BlurReveal delay={0.25} className="lg:justify-self-end">
              <p className="m-0 max-w-[42ch] text-pretty text-[17px] leading-[1.55] text-neutral-600">
                Priced per active project per month, with AI, storage and users included. Pay for the projects you
                run, not for seats.
              </p>
              <div className="mt-6">
                <BillingSwitch yearly={yearly} onChange={setYearly} />
              </div>
            </BlurReveal>
          </div>

          {/* Plans: one ruled sheet */}
          <BlurReveal delay={0.1} y={24} blur={12} className="mt-[clamp(48px,6vw,80px)]">
            <PlanCards yearly={yearly} />
          </BlurReveal>

          {/* Foot */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[11.5px] uppercase tracking-[0.1em] text-neutral-400">
            <span>Prices in USD · Taxes may apply</span>
            <button
              type="button"
              onClick={() => navigate("/pricing#compare")}
              className="group inline-flex items-center gap-1.5 text-brand-ink transition-colors hover:text-brand"
            >
              Compare all plans in detail
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
