import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChildProfile } from "@/types/dashboard";
import { User } from "lucide-react";

interface ChildSelectorProps {
    children: ChildProfile[];
    selectedChild: string;
    onSelectChild: (childId: string) => void;
}

const ChildSelector = ({ children, selectedChild, onSelectChild }: ChildSelectorProps) => {
    const selected = children.find(c => c.id === selectedChild);

    return (
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src={selected?.avatar} />
                <AvatarFallback>
                    <User className="h-6 w-6" />
                </AvatarFallback>
            </Avatar>

            <Select value={selectedChild} onValueChange={onSelectChild}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                            {child.name} ({child.age} anos)
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default ChildSelector;

