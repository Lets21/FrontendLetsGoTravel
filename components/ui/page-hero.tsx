import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  accent?: string;
  subtitle?: string;
  eyebrow?: string;
  image: string;
  className?: string;
}

/** Cabecera de las páginas internas: imagen con zoom lento y título en serif. */
export function PageHero({ title, accent, subtitle, eyebrow, image, className }: PageHeroProps) {
  return (
    <section className={cn("relative flex min-h-[380px] items-end overflow-hidden bg-ink text-white md:min-h-[460px]", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-ken-burns object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
      <div className="container relative z-10 mx-auto px-4 pb-14 pt-24">
        {eyebrow && <p className="eyebrow-dark mb-4 animate-fade-up">{eyebrow}</p>}
        <h1 className="max-w-4xl animate-fade-up font-display text-5xl leading-[1.02] [animation-delay:120ms] md:text-7xl">
          {title}
          {accent && (
            <>
              {" "}
              <em className="italic text-gold-300">{accent}</em>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl animate-fade-up text-lg text-white/85 [animation-delay:240ms] md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
