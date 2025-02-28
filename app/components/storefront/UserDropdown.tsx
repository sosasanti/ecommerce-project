import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function UserDropdown(){
    return (
        <DropdownMenu>
           <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 ">
                        <AvatarFallback>JAN</AvatarFallback>
                    </Avatar> 
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">JM</p>
                    <p className="text-sm leading-none text-muted-foreground">ss@gmail.com</p>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}