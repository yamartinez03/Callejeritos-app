import { forwardRef } from 'react'
import { clsx } from 'clsx'

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={clsx(
        'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
        placeholderColor: 'var(--muted-foreground)',
        '--tw-ring-color': 'var(--ring)',
      }}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }