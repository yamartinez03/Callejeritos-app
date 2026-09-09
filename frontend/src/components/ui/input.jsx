import { forwardRef } from 'react'
import { clsx } from 'clsx'

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      className={clsx(
        'flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
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

Input.displayName = 'Input'

export { Input }