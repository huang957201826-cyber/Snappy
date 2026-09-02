import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { DownloadVersion } from '../types';
import { DOWNLOAD_VERSIONS } from '../data/releaseData';
import { SnappyLogo } from './SnappyLogo';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVersion?: DownloadVersion | null;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  selectedVersion = null
}) => {
  const version = selectedVersion || DOWNLOAD_VERSIONS[0];
  const [copiedSha, setCopiedSha] = useState(false);

  if (!isOpen) return null;

  const handleCopySha = () => {
    navigator.clipboard?.writeText?.(version.sha256);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">

      <div
        className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-slate-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <SnappyLogo size={44} className="rounded-2xl shadow-xs" />
          <div>
            <h3 className="text-lg font-black text-slate-900">下载 Snappy</h3>
            <span className="text-xs text-slate-500 font-mono font-medium">{version.fileName} ({version.fileSize})</span>
          </div>
        </div>

        {/* Download information */}
        <div className="mb-6 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <div className="flex justify-between text-xs font-bold mb-3">
            <span className="text-slate-700">点击下方按钮开始下载</span>
            <span className="text-blue-600 font-mono">Windows x64</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            点击下载按钮后将由 GitHub Releases 提供安装文件，浏览器会显示真实下载状态。
          </p>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>GitHub Release · SHA-256 可校验</span>
            </span>
            <button
              onClick={handleCopySha}
              className="hover:text-blue-700 transition-colors flex items-center gap-1 text-slate-500 font-medium cursor-pointer"
            >
              {copiedSha ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSha ? '已复制' : '复制哈希'}</span>
            </button>
          </div>
        </div>

        {/* Release notes / feedback */}
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">下载前请确认版本</span>
              <span className="text-[11px] text-slate-600 block">当前为 Windows x64 v0.2.0 内测版</span>
            </div>
          </div>
          <a
            href="https://github.com/huang957201826-cyber/Snappy/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-all shrink-0 shadow-xs cursor-pointer"
          >
            查看发布说明
          </a>
        </div>

        {/* Action Button */}
        <a
          href={version.downloadUrl}
          download={version.fileName}
          className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.01] active:scale-95"
        >
          下载 {version.name}
        </a>

      </div>

    </div>
  );
};
