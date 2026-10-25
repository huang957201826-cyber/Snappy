import React, { useState } from 'react';
import { Archive, Check, Copy, Monitor, ShieldCheck } from 'lucide-react';
import { DOWNLOAD_VERSIONS } from '../data/mockData';

export const DownloadInfo: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const installer = DOWNLOAD_VERSIONS[0];
  const portable = DOWNLOAD_VERSIONS[1];

  const copySha = async (id: string, sha256: string) => {
    await navigator.clipboard?.writeText(sha256);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section
      id="download-info"
      className="mt-10 w-full max-w-4xl scroll-mt-24 text-left sm:mt-14"
      aria-labelledby="download-info-title"
    >
      <div className="mb-5 flex items-end justify-between gap-4 px-1">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-600">下载说明</p>
          <h2 id="download-info-title" className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            安装前请确认版本
          </h2>
        </div>
        <span className="hidden text-xs text-slate-400 sm:block">Windows 10 / 11</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <Monitor className="mb-3 h-4 w-4 text-blue-600" />
          <p className="text-sm font-bold text-slate-900">安装版</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            运行 Setup，创建开始菜单和桌面快捷方式。
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <Archive className="mb-3 h-4 w-4 text-emerald-600" />
          <p className="text-sm font-bold text-slate-900">便携版</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            解压 ZIP 后直接运行，无需安装。
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <ShieldCheck className="mb-3 h-4 w-4 text-amber-500" />
          <p className="text-sm font-bold text-slate-900">本地优先</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            剪贴板、截图和笔记默认保存在本机。
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
        当前为未签名的内测版本。Windows 可能显示“未知发布者”或 SmartScreen 提示，请先核对文件哈希。
      </div>

      <details className="group mt-3 rounded-2xl border border-slate-200 bg-white">
        <summary className="cursor-pointer list-none px-4 py-3 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-900">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            查看 SHA-256 校验值
          </span>
        </summary>
        <div className="space-y-3 border-t border-slate-100 px-4 py-4">
          {[installer, portable].map((version) => (
            <div key={version.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-700">{version.fileName}</p>
                <code className="mt-1 block break-all text-[10px] leading-4 text-slate-400">
                  {version.sha256}
                </code>
              </div>
              <button
                type="button"
                onClick={() => void copySha(version.id, version.sha256)}
                className="flex shrink-0 cursor-pointer items-center gap-1 self-start rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 sm:self-auto"
              >
                {copiedId === version.id ? (
                  <Check className="h-3 w-3 text-emerald-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                {copiedId === version.id ? '已复制' : '复制'}
              </button>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
};
