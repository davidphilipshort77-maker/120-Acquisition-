// Design: Obsidian Vault — Dark Premium Dashboard
// Full-height layout with fixed sidebar and scrollable main content

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area — offset by sidebar on desktop */}
      <div className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0D1B2A] sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/60 hover:text-white p-1"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center">
              <span className="text-[#C9A84C] font-bold text-xs" style={{ fontFamily: 'Cormorant Garamond, serif' }}>120</span>
            </div>
            <span className="text-white text-sm font-semibold">120% TOOLKIT</span>
          </div>
          <div className="w-8" />
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
