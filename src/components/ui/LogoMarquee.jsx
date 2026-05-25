const MARQUEE_LOGOS = [
  'Licensed MDs',
  'HIPAA Secure',
  'US Pharmacies',
  'SSL Encrypted',
  'Private Care',
  '4.9 Rated',
]

function LogoPill({ label }) {
  return (
    <div className="mx-1.5 flex h-9 min-w-max items-center gap-2 rounded-full border border-ivory/10 bg-ivory/7 px-3.5 text-ivory/72 shadow-inner backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-copper-light shadow-[0_0_14px_rgb(216_150_114/0.65)]" />
      <span className="font-sans text-[9px] font-semibold tracking-[0.14em] uppercase">
        {label}
      </span>
    </div>
  )
}

export function LogoMarquee() {
  const logos = [...MARQUEE_LOGOS, ...MARQUEE_LOGOS]

  return (
    <section
      className="logo-marquee-fade relative overflow-hidden rounded-[var(--radius-xl)] border border-ivory/10 bg-[linear-gradient(135deg,rgb(10_24_18/0.92),rgb(26_61_48/0.72),rgb(10_24_18/0.92))] py-2.5"
      aria-label="Verdan trust standards"
    >
      <div className="logo-marquee-track flex w-max items-center">
        {logos.map((label, index) => (
          <LogoPill key={`${label}-${index}`} label={label} />
        ))}
      </div>
    </section>
  )
}
