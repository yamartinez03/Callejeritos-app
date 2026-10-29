<<<<<<< HEAD
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props} />
  );
}

function CardHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props} />
  );
}

function CardTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props} />
  );
}

function CardDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props} />
  );
}

function CardAction({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props} />
  );
}

function CardContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props} />
  );
}

function CardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
=======
import { clsx } from 'clsx'

const Card = ({ className, ...props }) => (
  <div
    className={clsx('rounded-lg border shadow-sm', className)}
    style={{
      backgroundColor: 'var(--card)',
      borderColor: 'var(--border)',
    }}
    {...props}
  />
)

const CardHeader = ({ className, ...props }) => (
  <div
    className={clsx('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
)

const CardTitle = ({ className, ...props }) => (
  <h3
    className={clsx('text-2xl font-semibold leading-none tracking-tight', className)}
    style={{ color: 'var(--card-foreground)' }}
    {...props}
  />
)

const CardDescription = ({ className, ...props }) => (
  <p
    className={clsx('text-sm text-gray-500', className)}
    {...props}
  />
)

const CardContent = ({ className, ...props }) => (
  <div className={clsx('p-6 pt-0', className)} {...props} />
)

const CardFooter = ({ className, ...props }) => (
  <div
    className={clsx('flex items-center p-6 pt-0', className)}
    {...props}
  />
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
>>>>>>> 165dc3381200eae942727afcb95416482fa93424
