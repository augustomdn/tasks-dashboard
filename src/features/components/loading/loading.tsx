import { Loader2 } from "lucide-react";

export default function LoadingSpinnerPageComponent() {
    return (
        <div className="flex items-center justify-center h-screen bg-linear-to-b from-green-300 to-white">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
    )
}