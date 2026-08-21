import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles
} from 'lucide-react';
import { DownloadVersion } from '../types';
import { DOWNLOAD_VERSIONS } from '../data/mockData';
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
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [copiedSha, setCopiedSha] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDownloadProgress(0);
      setDownloadCompleted(false);
      
      const interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloadCompleted(true);
            return 100;
          }
          return prev + 25;
        });
      }, 180);

      return () => clearInterval(interval);
    }
  }, [isOpen, version]);

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
            <h3 className="text-lg font-black text-slate-900">正在下载 Snappy</h3>
            <span className="text-xs text-slate-500 font-mono font-medium">{version.fileName} ({version.fileSize})</span>
          </div>
        </div>

        {/* Download Progress Bar */}
        <div className="mb-6 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-slate-700">
              {downloadCompleted ? '🎉 下载完成，准备启动' : '正在从高速节点下载...'}
            </span>
            <span className="text-blue-600 font-mono">{downloadProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-200"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>0 恶意代码 · 本地离线</span>
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

        {/* User Community / Feedback */}
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">加入 Snappy 内测交流</span>
              <span className="text-[11px] text-slate-600 block">与产品主创直联，每周抢先体验新特性</span>
            </div>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-all shrink-0 shadow-xs cursor-pointer"
          >
            获取邀请
          </a>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.01] active:scale-95"
        >
          完成并开始体验
        </button>

      </div>

    </div>
  );
};
