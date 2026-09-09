import { useCallback, useState } from "react"
import { CircleCheck, CircleAlert, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { ToastContext } from "@/components/use-toast"

const ICONS = { success: CircleCheck, warning: CircleAlert, info: Info }
const STYLES = {
  success: "bg-emerald-600 text-white",
  warning: "bg-amber-600 text-white",
  info: "bg-foreground text-background",
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, variant = "success") => {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, message, variant }])
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map(({ id, message, variant }) => {
          const Icon = ICONS[variant]
          return (
            <div
              key={id}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium shadow-lg animate-in fade-in-0 slide-in-from-bottom-2",
                STYLES[variant]
              )}
            >
              <Icon className="size-4 shrink-0" />
              {message}
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
