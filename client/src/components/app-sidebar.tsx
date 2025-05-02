import { useState } from "react";
import { Calendar, FileClock, LayoutDashboard, ListTodo } from "lucide-react";
import Logo from "@/assets/LogoWithoutBg.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: ListTodo,
  },
  {
    title: "View Logs",
    url: "/logs",
    icon: FileClock,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
];

// Dummy user data (replace later with real user context or props)
const user = {
  email: "user@example.com",
  profileImage: "https://i.pravatar.cc/300", // you can use real image here
};

export function AppSidebar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: Insert real logout logic here
  };

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <div className="flex justify-center w-full border-b-1">
              <img
                src={Logo}
                alt="Login Logo"
                className="w-30 h-30 object-contain"
              />
            </div>
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with Profile */}
      <SidebarFooter className="relative mx-2 border-t-1">
        <button
          onClick={handleToggleDropdown}
          className="flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100  cursor-pointer"
        >
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">{user.email}</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute bottom-14 left-2 right-2 bg-white rounded shadow-lg py-2 z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
