// Public pricing content, from "OpenPlan AI: Pricing Page Content (Public)", 16 Nov 2026.
// One source for the home page pricing section and the /pricing detail page.
// Internal cost and margin data lives elsewhere and must never be added here.

export type PlanId = "free" | "proSmall" | "proTeam" | "enterprise";

export const PLAN_IDS: PlanId[] = ["free", "proSmall", "proTeam", "enterprise"];

/** A figure and what it counts, e.g. "~1,000" "AI chat answers". */
export type Coverage = { figure: string; label: string }[];

/** What each plan's monthly token allowance covers: ~5K per chat answer, ~40K per BOM or architect run,
 * ~50K per change proposal. Shared by the plan card tooltips and the comparison table. */
const coverage = (chats: string, boms: string, proposals: string): Coverage => [
  { figure: chats, label: "AI chat answers" },
  { figure: boms, label: "BOM / architect runs" },
  { figure: proposals, label: "Agentic change proposals" },
];

export const tokenCoverage: Record<PlanId, Coverage> = {
  free: coverage("~1,000", "~125", "~100"),
  proSmall: coverage("~6,000", "~750", "~600"),
  proTeam: coverage("~12,000", "~1,500", "~1,200"),
  enterprise: coverage("~120,000", "~15,000", "~12,000"),
};

/** A placeholder card row, so the plan cards line up row by row. */
export const NOT_INCLUDED = "—";

/** A card feature: plain text, or text with a "?" tooltip listing what it covers. */
export type Highlight = string | { text: string; tip: Coverage };

export type Plan = {
  id: PlanId;
  name: string;
  bestFor: string;
  /** Headline price per billing period. */
  price: { monthly: string; yearly: string };
  /** Shown before the price, e.g. "From". */
  prefix?: string;
  cadence: string;
  note: { monthly: string; yearly: string };
  /** The short list shown on the home page cards. */
  highlights: Highlight[];
  cta: string;
  href: string;
};

export const plans: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Free",
    bestFor: "For a small team organising its first product.",
    price: { monthly: "$0", yearly: "$0" },
    cadence: "/ month",
    note: { monthly: "Free forever · 1 active project", yearly: "Free forever · 1 active project" },
    highlights: [
      "Up to 5 users",
      "1 active project",
      NOT_INCLUDED, // lines up with "Add more projects any time" on Starter and Pro
      "5 GB workspace",
      { text: "5M AI tokens / month", tip: tokenCoverage.free },
      "Limited integrations",
      "Limited AI capabilities",
      "Community support",
    ],
    cta: "Start for free",
    href: "/waitlist",
  },
  proSmall: {
    id: "proSmall",
    name: "Starter",
    bestFor: "For a hardware team running its first few programs.",
    price: { monthly: "$59", yearly: "$49" },
    cadence: "/ project / month",
    note: { monthly: "Billed monthly", yearly: "Billed yearly" },
    highlights: [
      "Up to 15 users",
      "Minimum 2 projects",
      "Add more projects any time",
      "50 GB storage per project",
      { text: "30M AI tokens / project", tip: tokenCoverage.proSmall },
      "Unlimited integrations",
      "Compliance support",
      "Dedicated support",
    ],
    cta: "Get Starter",
    href: "/waitlist",
  },
  proTeam: {
    id: "proTeam",
    name: "Pro",
    bestFor: "For growing teams shipping several products at once.",
    price: { monthly: "$95", yearly: "$79" },
    cadence: "/ project / month",
    note: { monthly: "Billed monthly", yearly: "Billed yearly" },
    highlights: [
      "Up to 50 users",
      "Minimum 3 projects",
      "Add more projects any time",
      "100 GB storage per project",
      { text: "60M AI tokens / project ", tip: tokenCoverage.proTeam },
      "Unlimited integrations",
      "Compliance support",
      "Dedicated support, under 3 hours",
    ],
    cta: "Get Pro",
    href: "/waitlist",
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    bestFor: "Governance, scale and a partner in the rollout.",
    price: { monthly: "Custom", yearly: "Custom" },
    cadence: "",
    note: { monthly: "Annual agreement · Priced with our team", yearly: "Annual agreement · Priced with our team" },
    highlights: [
      "Unlimited projects",
      "150 users included",
      { text: "600M AI tokens / organization / month, pooled", tip: tokenCoverage.enterprise },
      "All AI models, or bring your own provider key",
      "2 TB pooled storage, plus 100 GB per extra project",
      "SAML and SCIM",
      "99.9% uptime SLA with service credits",
      "P1 response in 1 hour, 24×7, and a named CSM",
      "EU, US or single-tenant data residency options",
      "21 CFR Part 11 e-signatures and audit trail",
    ],
    cta: "Contact sales",
    href: "/contact",
  },
};

/* ---------------- Comparison table ---------------- */

/** A cell: plain text, true (included) / false (not included), or text with a small note. */
export type Cell =
  | string
  | boolean
  | { value: string; note?: string; roadmap?: boolean }
  /** A short stacked list: a figure and what it counts. */
  | { lines: Coverage };

export type Row = {
  label: string;
  hint?: string;
  values: Record<PlanId, Cell>;
  /** Shown instead when the billing switch is on Monthly (the default values are the yearly ones). */
  monthly?: { label?: string; values: Record<PlanId, Cell> };
};
export type Group = { title: string; rows: Row[] };

const row = (label: string, free: Cell, proSmall: Cell, proTeam: Cell, enterprise: Cell, hint?: string): Row => ({
  label,
  hint,
  values: { free, proSmall, proTeam, enterprise },
});

export const comparison: Group[] = [
  {
    title: "Projects",
    rows: [
      {
        ...row(
          "Minimum projects",
          "1 active project",
          { value: "2 projects", note: "$98 / month minimum" },
          { value: "3 projects", note: "$237 / month minimum" },
          "Unlimited projects",
        ),
        monthly: {
          values: {
            free: "1 active project",
            proSmall: { value: "2 projects", note: "$118 / month minimum" },
            proTeam: { value: "3 projects", note: "$285 / month minimum" },
            enterprise: "Unlimited projects",
          },
        },
      },
      row("Extra projects", false, "At the per-project price", "At the per-project price", "Included"),
      row(
        "Volume discount",
        false,
        { value: "15% off projects 6–15", note: "25% off projects 16–30" },
        { value: "15% off projects 6–15", note: "25% off projects 16–30" },
        "Negotiated beyond 30 projects",
      ),
    ],
  },
  {
    title: "Users and AI",
    rows: [
      row(
        "Users",
        "5",
        "Up to 15 per organization",
        { value: "10 per project, pooled", note: "Up to 50 per organization" },
        { value: "150 included", note: "Then 50-user packs at $250 / month" },
      ),
      row(
        "Included AI tokens",
        { value: "5M", note: "Per organization / month" },
        { value: "30M", note: "Per project / month, pooled" },
        { value: "60M", note: "Per project / month, pooled" },
        { value: "600M", note: "Per organization / month, pooled" },
        "Standard tokens, reset monthly",
      ),
      row(
        "What your tokens cover",
        { lines: tokenCoverage.free },
        { lines: tokenCoverage.proSmall },
        { lines: tokenCoverage.proTeam },
        { lines: tokenCoverage.enterprise },
        "Approximate, per month",
      ),
      row(
        "Models",
        "Standard model",
        { value: "Standard model by default", note: "Advanced model for architecture and BOM generation (20×)" },
        { value: "Standard, Advanced and Premium models", note: "Premium admin-enabled (40×)" },
        { value: "All models", note: "Option to bring your own provider key" },
      ),
      row("Token top-ups", false, true, true, "Committed token pool"),
      row("AI rate limit", "10 requests / min per user", "30 requests / min per user", "60 requests / min per user", "Custom"),
    ],
  },
  {
    title: "Storage",
    rows: [
      row("Storage", "5 GB per organization", "50 GB per project, pooled", "100 GB per project, pooled", { value: "2 TB pooled", note: "Plus 100 GB per additional project" }),
      row("Storage overage", "Upgrade required", "$20 per 100 GB / month", "$20 per 100 GB / month", "$150 per TB / month"),
      row("Max file upload", "25 MB", "250 MB", "2 GB", { value: "10 GB", note: "Multipart" }),
    ],
  },
  {
    title: "Included capacity",
    rows: [
      row("Requirements per project", "200", "2,500", "10,000", "100,000"),
      row("BOMs per project", "3", "25", "100", "Unlimited"),
      row(
        "BOM lines per project",
        "500 parts total",
        { value: "25,000 per project", note: "5,000 per BOM" },
        { value: "100,000 per project", note: "20,000 per BOM" },
        "250,000 per project",
      ),
      row("Parts library", "500", "10,000", "50,000", "1M", "Per organization"),
      row("ECOs", "10 / month", "Unlimited", "Unlimited", "Unlimited"),
      row("Integrations", "Limited", "Unlimited", "Unlimited", "Unlimited, plus custom"),
      row("Version history", "30 days", "1 year", "3 years", "Unlimited"),
      row("Audit log retention", "30 days", { value: "1 year", note: "Exportable" }, "3 years", { value: "10 years", note: "Immutable" }),
      row("API rate limit", false, "60 requests / min", "300 requests / min", { value: "1,200 requests / min", note: "Adjustable" }),
    ],
  },
  {
    title: "Security, support and compliance",
    rows: [
      row("Login", "Google / Microsoft", "Google / Microsoft", "Google / Microsoft (OIDC)", "SAML and SCIM"),
      row(
        "Uptime SLA",
        { value: "None", note: "Target 99.5%" },
        { value: "None", note: "Target 99.5%" },
        "99.5%",
        { value: "99.9%", note: "With service credits" },
      ),
      row(
        "Support",
        "Community",
        "Dedicated support",
        { value: "Dedicated support", note: "Response under 3 hours" },
        { value: "P1 in 1 hour (24×7), P2 in 4 hours", note: "Named CSM" },
      ),
      row(
        "Compliance",
        false,
        "Compliance support",
        { value: "Compliance support", note: "ISO 13485 / AS9100 templates", roadmap: true },
        { value: "21 CFR Part 11 e-signatures and audit trail", note: "ISO 13485 and AS9100 on the roadmap. ITAR not offered." },
      ),
    ],
  },
];

/* ---------------- Tokens and top-ups ---------------- */

export const tokenRates: { model: string; detail: string; rate: string }[] = [
  { model: "Standard model", detail: "Everyday AI · 1 token processed", rate: "1×" },
  { model: "Advanced model", detail: "Architecture, BOM generation", rate: "20×" },
  { model: "Premium model", detail: "Admin-enabled", rate: "40×" },
  { model: "Long prompts", detail: "Over 100K tokens on the Standard model", rate: "5×" },
  { model: "Cached input", detail: "Repeated context", rate: "0.1×" },
  { model: "Batch jobs", detail: "Run in the background", rate: "0.5×" },
];

export const tokenEstimates: { plan: string; allowance: string; actions: string }[] = [
  { plan: "Free", allowance: "5M per organization / month", actions: "About 1,000 AI chat answers" },
  { plan: "Starter", allowance: "30M per project / month", actions: "About 6,000 AI chat answers or 750 BOM generations" },
  { plan: "Pro", allowance: "60M per project / month", actions: "About 12,000 AI chat answers or 1,500 BOM generations" },
];

export const topUps: { tokens: string; price: string; note?: string }[] = [
  { tokens: "10M", price: "$15" },
  { tokens: "50M", price: "$65" },
  { tokens: "200M", price: "$220" },
  { tokens: "1B", price: "$900", note: "Enterprise / committed" },
];

export const billing: { title: string; body: string }[] = [
  { title: "Annual billing", body: "Billed up front for committed projects. Additions are prorated and co-termed. Removals take effect at renewal." },
  { title: "Monthly billing", body: "Additions are prorated. Removals take effect at the end of the period." },
  { title: "Payment", body: "Stripe for USD cards, Razorpay for INR (UPI, cards, net banking), and wire transfer for Enterprise." },
  { title: "Free plan", body: "One free organization per verified work email domain. Disposable email domains are blocked." },
];

export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "How is OpenPlan priced?",
    a: "Per active project per month. AI, storage and users are included, so you pay for the projects you run, not for seats.",
  },
  {
    q: "What is a Standard token?",
    a: "One Standard token is one token processed by our Standard AI model. The Advanced model counts as 20× and the Premium model as 40×. Prompts over 100K tokens on the Standard model count as 5×, cached input as 0.1× and batch jobs as 0.5×. Included tokens reset monthly, and the dashboard token counter shows usage by project, user and feature.",
  },
  {
    q: "What happens if we run out of tokens?",
    a: "On Starter and Pro you can buy top-up packs: 10M for $15, 50M for $65 or 200M for $220. Top-up tokens never expire while the account is active. Enterprise plans use a committed token pool.",
  },
  {
    q: "Can we add or remove projects mid-term?",
    a: "Yes. On annual billing, additions are prorated and co-termed, and removals take effect at renewal. On monthly billing, additions are prorated and removals take effect at the end of the period.",
  },
  {
    q: "Is there a discount for many projects?",
    a: "On Starter and Pro, projects 6–15 are 15% off and projects 16–30 are 25% off. Beyond 30 projects, Enterprise pricing is negotiated.",
  },
  {
    q: "Where is our data stored?",
    a: "In India (Mumbai) by default. Enterprise can choose an EU or US cell for $1,000 / month, or a single-tenant deployment for $3,000 / month plus a $5,000 setup fee.",
  },
  {
    q: "How can we pay?",
    a: "By card through Stripe in USD, through Razorpay in INR (UPI, cards and net banking), or by wire transfer on Enterprise.",
  },
  {
    q: "Which compliance standards do you support?",
    a: "Enterprise includes 21 CFR Part 11 e-signatures and audit trail. ISO 13485 and AS9100 templates are on the roadmap. ITAR is not offered.",
  },
];
