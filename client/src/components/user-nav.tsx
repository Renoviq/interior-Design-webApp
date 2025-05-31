import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { User, LogOut, Settings } from "lucide-react";

export function UserNav() {
  const { user, logoutMutation } = useAuth();

  // Helper function to get user initials
  const getUserInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  // Helper function to get full name
  const getFullName = (firstName?: string, lastName?: string) => {
    return `${firstName || ''} ${lastName || ''}`.trim();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={user?.profileImage || user?.avatar} 
              alt={getFullName(user?.firstName, user?.lastName) || user?.username}
            />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {user?.firstName && user?.lastName 
                ? getUserInitials(user.firstName, user.lastName)
                : user?.username?.charAt(0)?.toUpperCase() || 'U'
              }
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <div className="flex items-center space-x-3 p-3">
          <Avatar className="h-12 w-12">
            <AvatarImage 
              src={user?.profileImage || user?.avatar} 
              alt={getFullName(user?.firstName, user?.lastName) || user?.username}
            />
            <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
              {user?.firstName && user?.lastName 
                ? getUserInitials(user.firstName, user.lastName)
                : user?.username?.charAt(0)?.toUpperCase() || 'U'
              }
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 flex-1 min-w-0">
            <p className="text-sm font-semibold leading-none truncate">
              {getFullName(user?.firstName, user?.lastName) || user?.username || 'User'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || `${user?.username}@example.com`}
            </p>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-3 h-4 w-4" />
          <span>Manage Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}