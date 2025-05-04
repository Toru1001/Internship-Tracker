import { useEffect, useState } from "react";
import {
  Calendar,
  File,
  FileClock,
  LayoutDashboard,
  ListTodo,
  Users,
  ClipboardList,
  Archive,
  UserRoundPen,
} from "lucide-react";
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
import { getUserData } from "@/lib/getData";
import { logoutUser } from "@/lib/authService";
import { User } from "./model/datamodel";

const getItemsByRole = (role: string) => {
  if (role === "Intern") {
    return [
      { title: "Tasks", url: "/tasks", icon: ListTodo },
      { title: "Feedbacks", url: "/feedbacks", icon: FileClock },
      { title: "Incomplete Requirements", url: "/requirements", icon: File },
    ];
  } else if (role === "Supervisor") {
    return [
      { title: "View Logs", url: "/logs", icon: ClipboardList },
      { title: "Interns", url: "/interns", icon: Users },
      { title: "Archives", url: "/archives", icon: Archive },
    ];
  } else if (role === "Admin") {
    return [
      { title: "Assign Intern", url: "/assign", icon: UserRoundPen },
      { title: "Users", url: "/interns", icon: Users },
    ];
  }
  return [];
};

export function AppSidebar() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserData();
        const data = response.data;

        setUser({
          name: data.name,
          profileImage: data.profileImage || "https://i.pravatar.cc/300",
          role: data.role,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleToggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      await logoutUser(); 
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.clear(); 
      window.location.href = "/login";
    }
  };

  const items = getItemsByRole(user?.role || "");

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
        {user && (
          <button
            onClick={handleToggleDropdown}
            className="flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100  cursor-pointer"
          >
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{user.name}</span>
          </button>
        )}

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
