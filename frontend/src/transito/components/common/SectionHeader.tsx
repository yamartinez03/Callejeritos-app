import { ArrowLeft } from "lucide-react"; 
interface SectionHeaderProps { 
    title: string;
    description?: string; 
    action?: React.ReactNode;
    showBackButton?: boolean;
    onBack?: () => void; 
}

export function SectionHeader({ 
    title, 
    description, 
    action,
    showBackButton, 
    onBack
}: SectionHeaderProps) {
    return ( 
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-start gap-3">
        {showBackButton && (
            <button
             type="button" 
            onClick={onBack}
            className="mt-1 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Volver"
             > 
            <ArrowLeft size={20} />
             </button>
             )}
             <div>
            <h1
              className="text-2xl font-bold text-foreground">
                {title}
                </h1>
                {description && ( 
                    <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                    </p>
                 )}
                 </div> 
                 </div>
                 {action && <div>{action}</div>} 
                 </div> ); }