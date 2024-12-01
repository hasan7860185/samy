import { Link } from "react-router-dom";
import { LayoutDashboard, Users, Building2, FolderKanban, CheckSquare } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "لوحة التحكم", path: "/" },
    { icon: Users, label: "العملاء", path: "/clients" },
    { icon: Building2, label: "العقارات", path: "/properties" },
    { icon: FolderKanban, label: "المشاريع", path: "/projects" },
    { icon: CheckSquare, label: "المهام", path: "/tasks" },
  ];

  return (
    <aside className="w-64 bg-white border-l">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">نظام العقارات</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <item.icon className="w-5 h-5 ml-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;