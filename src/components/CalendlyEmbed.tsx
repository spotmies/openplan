import React, { useState } from "react";

interface CalendlyEmbedProps {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
  };
  className?: string;
}

/**
 * Calendly inline scheduler as a plain iframe. It doesn't depend on Calendly's widget.js
 * (which could fail to initialise or leave a blank box), so it renders every time.
 */
const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ url, prefill, className }) => {
  const [loaded, setLoaded] = useState(false);

  const params = new URLSearchParams({
    embed_type: "Inline",
    hide_gdpr_banner: "1",
  });
  if (typeof window !== "undefined") params.set("embed_domain", window.location.hostname);
  if (prefill?.name) params.set("name", prefill.name);
  if (prefill?.email) params.set("email", prefill.email);

  return (
    <div className={`relative mx-auto w-full max-w-[640px] ${className ?? ""}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-white/[0.04] text-sm text-muted-foreground">
          Loading calendar…
        </div>
      )}
      <iframe
        src={`${url}?${params.toString()}`}
        title="Schedule a meeting"
        loading="eager"
        onLoad={() => setLoaded(true)}
        className="block h-[560px] w-full rounded-md border-0 bg-white sm:h-[600px]"
      />
      <a href={url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-muted-foreground underline">
        Open in a new tab
      </a>
    </div>
  );
};

export default CalendlyEmbed;
