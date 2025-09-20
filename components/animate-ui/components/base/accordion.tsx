import * as React from "react";
import { ChevronDownIcon, PlusIcon, MinusIcon } from "lucide-react";

import {
  Accordion as AccordionPrimitive,
  AccordionItem as AccordionItemPrimitive,
  AccordionHeader as AccordionHeaderPrimitive,
  AccordionTrigger as AccordionTriggerPrimitive,
  AccordionPanel as AccordionPanelPrimitive,
  type AccordionProps as AccordionPrimitiveProps,
  type AccordionItemProps as AccordionItemPrimitiveProps,
  type AccordionTriggerProps as AccordionTriggerPrimitiveProps,
  type AccordionPanelProps as AccordionPanelPrimitiveProps,
} from "@/components/animate-ui/primitives/base/accordion";
import { cn } from "@/lib/utils";

type AccordionProps = AccordionPrimitiveProps;

function Accordion(props: AccordionProps) {
  return <AccordionPrimitive {...props} />;
}

type AccordionItemProps = AccordionItemPrimitiveProps;

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionItemPrimitive
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

type AccordionTriggerProps = AccordionTriggerPrimitiveProps & {
  showArrow?: boolean;
};

function AccordionTrigger({
  className,
  children,
  showArrow = true,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionHeaderPrimitive className="flex">
      <AccordionTriggerPrimitive
        className={cn(
          "group focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <span className="relative flex h-4 w-4 shrink-0">
            {/* Plus (visible when closed) */}
            <PlusIcon
              aria-hidden
              className={cn(
                "absolute inset-0 m-auto size-4 transition-all duration-200 ease-in-out",
                "group-data-[state=open]:opacity-0 group-data-[state=open]:scale-75 group-data-[state=open]:-translate-y-0.5",
                "group-data-[panel-open]:opacity-0 group-data-[panel-open]:scale-75 group-data-[panel-open]:-translate-y-0.5"
              )}
            />

            {/* Minus (visible when open) */}
            <MinusIcon
              aria-hidden
              className={cn(
                "absolute inset-0 m-auto size-4 opacity-0 scale-75 transition-all duration-200 ease-in-out",
                "group-data-[state=open]:opacity-100 group-data-[state=open]:scale-100 group-data-[state=open]:translate-y-0",
                "group-data-[panel-open]:opacity-100 group-data-[panel-open]:scale-100 group-data-[panel-open]:translate-y-0"
              )}
            />
          </span>
        )}
      </AccordionTriggerPrimitive>
    </AccordionHeaderPrimitive>
  );
}

type AccordionPanelProps = AccordionPanelPrimitiveProps & {
  children: React.ReactNode;
};

function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPanelProps) {
  return (
    <AccordionPanelPrimitive {...props}>
      <div className={cn("text-sm pt-0 pb-4", className)}>{children}</div>
    </AccordionPanelPrimitive>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionPanelProps,
};
