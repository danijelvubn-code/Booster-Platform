import { cn } from "@/lib/utils";

export type AuthHeroBrandingProps = {
  className?: string;
  /** Narrow screens: center-align copy under centered logo. */
  align?: "start" | "center";
};

/** Marketing headline + subtitle for auth left column (under Booster lockup). */
export function AuthHeroBranding({ className, align = "start" }: AuthHeroBrandingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={cn("flex w-full max-w-[640px] flex-col gap-6", alignClass, className)}>
      <h2 className="text-auth-hero-headline text-primary-foreground">
        <span className="inline-block rounded-md bg-primary px-2 py-1 text-primary-foreground">
          Booster:
        </span>{" "}
        the trusted
        <br />
        inference platform
      </h2>
      <p className="text-auth-hero-subtitle text-primary-foreground">
        Run AI inference you can verify and control —
        <br />
        securely, even outside your own infrastructure.
      </p>
    </div>
  );
}
