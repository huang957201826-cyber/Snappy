import React from 'react';
import { Download, Users } from 'lucide-react';
import { SnappyLogo } from './SnappyLogo';

interface NavbarProps {
  onOpenDownload: () => void;
  onOpenWeChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload, onOpenWeChat }) => {
  return (
    <header className="w-full z-40 sticky top-0 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shrink-0 transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-10 h-16 flex items-center justify-between gap-3">

        {/* Brand */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <SnappyLogo size={30} className="shadow-sm rounded-xl" />
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-900 font-sans">Snappy</span>
            <span className="hidden text-[11px] font-mono font-medium text-slate-500 sm:inline">
              v0.2.3 内测版
            </span>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onOpenWeChat}
            aria-label="打开微信内测群"
            title="微信内测群"
            className="flex h-10 w-10 items-center justify-center gap-2 rounded-xl bg-slate-100 px-0 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-200/80 hover:text-slate-900 sm:h-auto sm:w-auto sm:px-3.5 sm:py-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline">微信内测群</span>
          </button>

          <button
            type="button"
            onClick={onOpenDownload}
            aria-label="免费下载 Snappy v0.2.3"
            title="免费下载"
            className="flex h-10 w-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-0 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-slate-900/20 active:translate-y-0 sm:h-auto sm:w-auto sm:px-4 sm:py-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">免费下载</span>
          </button>
        </div>

      </div>
    </header>
  );
};
