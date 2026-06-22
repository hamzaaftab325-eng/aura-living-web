import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  variant?: "light" | "dark";
  align?: "left" | "center";
}

export function PageHeader({
  overline,
  title,
  description,
  breadcrumbs,
  variant = "light",
  align = "left",
}: PageHeaderProps) {
  const isDark = variant === "dark";
  return (
    <section
      className={cn(
        "section-y-sm",
        isDark ? "surface-dark grain" : "surface-cream border-b border-[#F0EBDC]"
      )}
    >
      <div className="container-page">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-caption flex-wrap">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className={cn(
                        "hover:text-[#C9A84C] transition-colors",
                        isDark ? "text-cream/60" : "text-[#5A5A5A]"
                      )}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isDark ? "text-cream" : "text-[#0A0A0A]"}>
                      {crumb.label}
                    </span>
                  )}
                  {idx < breadcrumbs.length - 1 && (
                    <ChevronRight className={cn("w-3 h-3", isDark ? "text-cream/30" : "text-[#8A8275]")} />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={cn(align === "center" && "text-center max-w-2xl mx-auto")}>
          {overline && (
            <p className={cn("text-overline mb-3", isDark ? "text-[#C9A84C]" : "text-gold")}>
              {overline}
            </p>
          )}
          <h1 className={cn("text-h1 text-balance", isDark ? "text-white" : "text-[#0A0A0A]")}>
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "text-body-lg mt-4 text-pretty",
                isDark ? "text-cream/80" : "text-[#5A5A5A]"
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
