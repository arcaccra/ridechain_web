interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    path: string;
    isActive?: boolean;
}

export default function SidebarItem({ icon, label, path, isActive = false }: SidebarItemProps) {
    return (
      <li>
        <a
          href={path}
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
            isActive ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          {icon}
          <span>{label}</span>
        </a>
      </li>
    )
  }