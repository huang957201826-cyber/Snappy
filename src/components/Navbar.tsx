import React from 'react';
import { Download, ShieldCheck } from 'lucide-react';
import { SnappyLogo } from './SnappyLogo';

interface NavbarProps {
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 text-slate-800 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <SnappyLogo size={36} className="transition-transform group-hover:scale-105 duration-200" />
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-900">Snappy</span>
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              v0.2.0 内测版
            </span>
          </div>
        </a>

        {/* Quick Nav Links & Big Rounded CTA */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-semibold text-slate-600">
          <a href="#download" className="hover:text-blue-600 transition-colors hidden sm:block">
            下载中心
          </a>
          <a href="#features" className="hover:text-blue-600 transition-colors hidden sm:block">
            功能展示
          </a>
          <a href="#privacy" className="hidden md:inline-flex items-center gap-1.5 hover:text-emerald-700 transition-colors">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>纯本地隐私</span>
          </a>

          <button
            onClick={onOpenDownload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>免费下载</span>
          </button>
        </div>

      </div>
    </header>
  );
};
