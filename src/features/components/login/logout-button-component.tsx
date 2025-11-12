import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface Props {
    handleLogout: () => void;
}


export default function LogoutButtonComponent({ handleLogout }: Props) {
    return (
        <Button onClick={handleLogout} variant="outline">
            <LogOut />
            <span>Logout</span>
        </Button>
    )
}