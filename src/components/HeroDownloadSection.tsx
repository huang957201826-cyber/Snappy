import React, { useState } from 'react';
import { Download, ShieldCheck, Check, Copy, Laptop, FileArchive, QrCode } from 'lucide-react';
import { SnappyLogo } from './SnappyLogo';
import { DOWNLOAD_VERSIONS } from '../data/releaseData';

export const HeroDownloadSection: React.FC = () => {
  const [copiedShaId, setCopiedShaId] = useState<string | null>(null);

  const handleCopySha = (id: string, sha: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(sha);
    setCopiedShaId(id);
    setTimeout(() => setCopiedShaId(null), 2000);
  };

  const groupQrUrl = `${import.meta.env.BASE_URL}wechat-group-qr.png`;

  return (
    <section id="download" className="pt-10 pb-12 sm:pt-14 sm:pb-16 max-w-5xl mx-auto px-4 sm:px-6">

      {/* Brand Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center mb-5 p-3 bg-white rounded-3xl shadow-md border border-slate-100 transition-transform hover:scale-105 duration-300">
          <SnappyLogo size={72} className="rounded-2xl" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3.5">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            Windows v0.2.0 内测版
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Snappy · Windows 轻量效率工具
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
          轻量、本地优先。快速访问剪贴板历史、AI 润色翻译、截图识字与灵感待办。
        </p>
      </div>

      {/* One-Sentence Privacy Guarantee Pill */}
      <div id="privacy" className="mb-10 p-4 sm:p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-300">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-emerald-900 font-bold mr-1">隐私承诺：</strong>
            剪贴板、截图与笔记默认保存在本地；只有你主动执行 AI 请求时，所选文字才会按配置发送。
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-white border border-emerald-300 text-emerald-800 text-xs font-bold shrink-0">
          本地优先
        </span>
      </div>

      {/* Big Rounded Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {DOWNLOAD_VERSIONS.map((v) => {
          const isRec = v.recommended;
          return (
            <div
              key={v.id}
              className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
                isRec
                  ? 'bg-white border-blue-300 ring-4 ring-blue-500/10 shadow-lg shadow-blue-500/5'
                  : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {v.id === 'win-installer' ? (
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <Laptop className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                        <FileArchive className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{v.name}</h3>
                      <span className="text-xs text-slate-500 font-medium font-mono">{v.fileSize} · {v.version}</span>
                    </div>
                  </div>

                  {isRec ? (
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-xs">
                      官方推荐
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                      绿色免装
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {v.description}
                </p>
              </div>

              <div>
                {/* Big, Rounded, Friendly Download Button */}
                <a
                  href={v.downloadUrl}
                  download={v.fileName}
                  aria-label={`下载 ${v.name}`}
                  className={`w-full py-4 px-6 rounded-full text-sm sm:text-base font-black flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 ${
                    isRec
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/15'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  <span>下载 {v.name}</span>
                </a>

                {/* Hash verification */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono truncate max-w-[170px]" title={v.sha256}>
                    SHA: {v.sha256.slice(0, 12)}...
                  </span>
                  <button
                    onClick={(e) => handleCopySha(v.id, v.sha256, e)}
                    className="text-slate-500 hover:text-blue-600 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    {copiedShaId === v.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedShaId === v.id ? '已复制' : '复制哈希'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* WeChat Group Invite */}
      <div id="wechat-group" className="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center gap-6 sm:gap-8 max-w-3xl mx-auto text-center sm:text-left">
          <div className="mx-auto">
            <img
              src={groupQrUrl}
              alt="Snappy 内测交流群二维码"
              className="w-44 h-44 object-contain rounded-2xl border border-slate-200 bg-white p-2"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-3">
              <QrCode className="w-4 h-4" />
              内测交流群
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-2">扫码加入 Snappy 内测交流群</h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">下载使用中遇到问题、想反馈建议，都可以扫码进群直接留言。</p>
            <p className="text-xs text-slate-400">群二维码有效期为 7 天，请及时扫码加入。</p>
          </div>
        </div>
      </div>

      {/* 3 Simple Rounded Steps */}
      <div className="bg-white/80 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center sm:text-left">
          3 步极速上手
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
            <div>
              <strong className="text-slate-900 block font-bold mb-0.5">下载运行</strong>
              <span className="text-xs text-slate-500">双击安装或解压绿色包到任意目录。</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
            <div>
              <strong className="text-slate-900 block font-bold mb-0.5">托盘待机</strong>
              <span className="text-xs text-slate-500">启动后常驻系统托盘，需要时快速唤出。</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
            <div>
              <strong className="text-slate-900 block font-bold mb-0.5">快捷键呼出</strong>
              <span className="text-xs text-slate-500">按 <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-slate-300 font-mono text-xs font-bold text-slate-800">Alt + Space</kbd> 随时唤出。</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
