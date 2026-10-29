const VARIANTS = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border border-border bg-background text-foreground hover:bg-muted dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10",
  "outline-brand":
    "border border-primary/60 bg-transparent text-primary hover:bg-primary/10 dark:border-primary/70 dark:text-primary dark:hover:bg-primary/15",
  ghost: "text-foreground hover:bg-muted",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}