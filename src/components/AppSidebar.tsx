
import { 
  Sidebar,
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader
} from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/SidebarNav";
import { UserNav } from "@/components/UserNav";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center p-4">
          <div className="text-white font-bold text-2xl flex gap-2 items-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-8 h-8 bg-primary/50 rounded-full animate-pulse-ring"></div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs">GV</span>
              </div>
            </div>
            <span>GymVision</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <UserNav />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
