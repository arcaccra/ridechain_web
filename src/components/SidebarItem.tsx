import React from 'react';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    path: string;
    isActive?: boolean;
}

export default function SidebarItem({ icon, label, path, isActive = false }: SidebarItemProps) {
    // If icon is a valid React element, clone it and inject className for consistent sizing & color
    const coloredIcon = React.isValidElement(icon)
      ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
          className: `h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-violet-300'}`,
        })
      : icon;

    return (
      <li>
        <a
          href={path}
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
            isActive ? "bg-violet-600 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          {coloredIcon}
          <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-200'}`}>{label}</span>
        </a>
      </li>
    )
  }
