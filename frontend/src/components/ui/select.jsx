import { clsx } from 'clsx'

const Select = ({ className, children, ...props }) => (
  <div className="relative">
    <select
      className={clsx(
        'flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
        '--tw-ring-color': 'var(--ring)',
      }}
      {...props}
    >
      {children}
    </select>
  </div>
)

export { Select }