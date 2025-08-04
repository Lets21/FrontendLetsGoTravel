import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  center = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-2 mb-10",
        center && "text-center",
        className
      )}
    >
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold tracking-tight",
          center && "mx-auto"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground max-w-2xl mx-auto",
            center && "text-center"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
