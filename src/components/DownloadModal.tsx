import React, { useState } from 'react';
import {
  X,
  Download,
  ShieldCheck,
  Copy,
  Check,
  Terminal,
  ExternalLink,
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
  const [copiedSha, setCopiedSha] = useState(false);

  if (!isOpen) return null;

  const handleCopySha = () => {
    navigator.clipboard?.writeText?.(version.sha256);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">

      <div
        className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-7 shadow-2xl relative text-slate-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <SnappyLogo size={42} className="rounded-xl shadow-sm" />
          <div>
            <h3 className="text-base font-bold text-slate-900">下载 Snappy v0.2.3</h3>
            <span className="font-mono text-xs text-slate-500">{version.fileName} ({version.fileSize})</span>
          </div>
        </div>

        {/* Download information */}
        <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700">下载文件</span>
            <span className="font-mono text-blue-600">{version.format}</span>
          </div>
          <div className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
            <p className="truncate font-mono text-[11px] font-bold text-slate-800">{version.fileName}</p>
            <p className="mt-1 text-[10px] text-slate-500">文件大小：{version.fileSize}</p>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SHA-256 可校验</span>
            </span>
            <button
              type="button"
              onClick={handleCopySha}
              className="flex cursor-pointer items-center gap-1 font-medium text-slate-400 transition-colors hover:text-slate-900"
            >
              {copiedSha ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSha ? '已复制' : '复制哈希'}</span>
            </button>
          </div>
          <p className="mt-3 break-all font-mono text-[9px] leading-4 text-slate-400">{version.sha256}</p>
        </div>

        {/* Internal beta warning */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 p-3.5">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-amber-900">未签名内测构建</span>
              <span className="block text-[11px] leading-5 text-amber-700">
                Windows 可能提示“未知发布者”或 SmartScreen，请先核对 SHA-256。
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={version.downloadUrl}
          download={version.fileName}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-black"
        >
          <Download className="h-4 w-4" />
          开始下载
        </a>
        <a
          href="https://github.com/huang957201826-cyber/Snappy/releases/tag/v0.2.3"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          查看 GitHub 发布说明
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full cursor-pointer py-2 text-xs font-medium text-slate-400 transition-colors hover:text-slate-700"
        >
          关闭
        </button>

      </div>

    </div>
  );
};
