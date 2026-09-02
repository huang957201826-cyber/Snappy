import React from 'react';
import { Download, ShieldCheck, Github } from 'lucide-react';
import { SnappyLogo } from './SnappyLogo';

interface FooterProps {
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload }) => {
  return (
    <footer className="bg-white border-t border-slate-100 text-slate-600 text-xs mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-100">

          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <SnappyLogo size={36} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900">Snappy</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                  v0.2.0 内测版
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Windows 轻量效率工具 · 本地优先 · 默认不上传本地内容
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下载 v0.2.0</span>
            </button>
            <a
              href="https://github.com/huang957201826-cyber/Snappy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright & privacy statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-400 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>隐私保障：剪贴板、截图与笔记默认存储于本地；AI 请求按你的设置发送所选文本</span>
          </div>
          <div>
            © 2026 Snappy Studio · v0.2.0 内测版
          </div>
        </div>

      </div>
    </footer>
  );
};
