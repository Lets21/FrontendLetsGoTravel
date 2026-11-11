import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Texto pequeño en mayúsculas sobre el título */
  eyebrow?: string;
  /** Parte final del título en cursiva dorada */
  accent?: string;
  center?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  accent,
  center = false,
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 space-y-3", center && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow && <p className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</p>}
      <h2
        className={cn(
          "font-display text-4xl leading-[1.05] tracking-tight md:text-5xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
        {accent && (
          <>
            {" "}
            <em className={cn("italic", dark ? "text-gold-300" : "text-gold-700")}>{accent}</em>
          </>
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            center && "mx-auto",
            dark ? "text-white/75" : "text-stone-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
