import { type ComponentPropsWithoutRef, type FormEventHandler, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuthFlowCardShellProps = {
  beforeCard?: ReactNode;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  showBeforeCard?: boolean;
  showHeader?: boolean;
  showBody?: boolean;
  showFooter?: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  formClassName?: string;
  bodyClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  containerClassName?: string;
  cardClassName?: string;
  formProps?: Omit<ComponentPropsWithoutRef<"form">, "onSubmit" | "className" | "children">;
};

/**
 * Shared auth card shell with optional section visibility toggles.
 */
export function AuthFlowCardShell({
  beforeCard,
  header,
  body,
  footer,
  showBeforeCard = true,
  showHeader = true,
  showBody = true,
  showFooter = true,
  onSubmit,
  formClassName,
  bodyClassName,
  headerClassName,
  footerClassName,
  containerClassName,
  cardClassName,
  formProps,
}: AuthFlowCardShellProps) {
  const formContent = (
    <>
      {showBody ? (
        <div className={cn("flex min-h-0 flex-1 flex-col justify-center space-y-10 overflow-y-auto px-2", bodyClassName)}>
          {body}
        </div>
      ) : null}

      {showFooter ? <div className={cn("mt-auto shrink-0 space-y-6 px-2", footerClassName)}>{footer}</div> : null}
    </>
  );

  return (
    <div
      className={cn("flex min-h-0 w-fit max-w-full shrink-0 flex-col px-10 py-6 md:py-8 lg:ml-auto lg:min-h-0", containerClassName)}
    >
      <div className="flex min-h-0 w-full min-w-0 max-w-modal-auth flex-1 flex-col lg:w-modal-auth lg:min-w-modal-auth lg:shrink-0">
        {showBeforeCard ? beforeCard : null}

        <div
          className={cn(
            "flex min-h-0 w-full flex-1 flex-col rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-2xl md:px-8 md:py-10",
            cardClassName,
          )}
        >
          {showHeader ? (
            <div className={cn("mb-6 flex h-6 shrink-0 items-center justify-center px-2", headerClassName)}>{header}</div>
          ) : null}

          {onSubmit ? (
            <form onSubmit={onSubmit} className={cn("flex min-h-0 flex-1 flex-col gap-10", formClassName)} {...formProps}>
              {formContent}
            </form>
          ) : (
            <div className={cn("flex min-h-0 flex-1 flex-col gap-10", formClassName)}>{formContent}</div>
          )}
        </div>
      </div>
    </div>
  );
}
