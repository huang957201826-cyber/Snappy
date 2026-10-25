import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BreathingDotCanvas } from './components/BreathingDotCanvas';
import { WindowsDesktopSimulator } from './components/WindowsDesktopSimulator';
import { WeChatSection } from './components/WeChatSection';
import { WeChatModal } from './components/WeChatModal';
import { DOWNLOAD_VERSIONS } from './data/mockData';
import { Download, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);

  const installer = DOWNLOAD_VERSIONS[0];
  const portable = DOWNLOAD_VERSIONS[1];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden relative">

      {/* 动态呼吸点阵 + 几何工程微网格 + 柔光景深背景 */}
      <BreathingDotCanvas />

      {/* 顶部通透导航栏 */}
      <Navbar
        downloadUrl={installer.downloadUrl}
        downloadFileName={installer.fileName}
        onOpenWeChat={() => setIsWeChatModalOpen(true)}
      />

      {/* ================= 软件官方下载主视觉 (顶级留白、大气、直击核心) ================= */}
      <main className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-10 pt-14 sm:pt-24 pb-16 flex flex-col items-center text-center">

        {/* 顶部微标签 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-slate-700 text-xs font-semibold mb-8 border border-slate-200/90 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Snappy v0.2.3 · Windows 轻量效率工具</span>
        </div>

        {/* 主标题：大字号、通透、高视觉冲击力 */}
        <h1 className="mb-6 max-w-4xl text-[2rem] font-black leading-[1.15] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          <span className="block whitespace-nowrap">轻量、本地、极速</span>
          <span className="block whitespace-nowrap text-blue-600">新一代个人效率助手</span>
        </h1>

        {/* 极简副标题 */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed font-normal">
          剪贴板、截图、笔记与 AI 润色四合一。主进程私有内存约 28MB，
          WebView2 运行时另计；本地功能离线可用，Alt + 空格一键唤出。
        </p>

        {/* 软件下载核心行动区：增加留白与呼吸感，仅保留纯粹的双下载入口 */}
        <div id="download" className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 my-4 sm:my-6 mb-12 sm:mb-16 w-full sm:w-auto scroll-mt-24">

          {/* 主下载按钮：更大、更有厚重感与尊贵感 */}
          <a
            href={installer.downloadUrl}
            download={installer.fileName}
            className="group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl bg-slate-900 px-5 py-5 font-bold text-white shadow-xl shadow-slate-900/15 transition-all duration-200 hover:-translate-y-1 hover:bg-black hover:shadow-2xl hover:shadow-slate-900/25 active:translate-y-0 sm:w-auto sm:gap-4 sm:px-12"
          >
            <svg className="w-6 h-6 fill-current shrink-0 text-white" viewBox="0 0 88 88">
              <path d="M0 12.402l35.689-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.016 45.719zm4.326-39.027L87.914 0v41.527l-47.918.376zm47.918 43.46v41.636l-47.918-6.736-.021-35.25z" />
            </svg>
            <div className="min-w-0 text-left">
              <div className="text-base sm:text-lg font-bold leading-tight">下载 Windows 安装包</div>
              <div className="mt-0.5 max-w-[220px] truncate font-mono text-[11px] font-normal text-slate-300 sm:max-w-none sm:text-xs">
                {installer.fileName} · {installer.fileSize}
              </div>
            </div>
          </a>

          {/* 免安装便携版：增大尺寸与内边距，保持同高度 */}
          <a
            href={portable.downloadUrl}
            download={portable.fileName}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-slate-200/90 bg-white px-5 py-5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md active:translate-y-0 sm:w-auto sm:px-10 sm:text-base"
          >
            <Download className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="text-left">
              <div className="font-bold leading-tight">免安装便携版</div>
              <div className="text-xs font-normal text-slate-500 font-mono mt-0.5">.zip 绿色压缩包</div>
            </div>
          </a>

        </div>

        {/* 关键特性轻量条 */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 mb-14 sm:mb-20 font-medium">
          <span className="flex items-center gap-1.5 text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Win 10 / 11 兼容
          </span>
          <span className="text-slate-300">·</span>
          <span>纯本地零上传</span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            主进程约 28MB
          </span>
          <span className="text-slate-300">·</span>
          <span>即开即用</span>
        </div>

        {/* ================= 模拟真实 Windows 桌面工作区交互 ================= */}
        <WindowsDesktopSimulator />

      </main>

      {/* ================= 微信二维码区域（真正属于您的个人效率助手） ================= */}
      <WeChatSection />

      {/* ================= 页面收尾 ================= */}
      <footer className="relative z-10 w-full shrink-0 bg-slate-900 text-white">
        <div className="mx-auto flex min-h-16 max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-4 text-center sm:min-h-20 sm:flex-row sm:px-10 sm:text-left">
          <p className="text-[11px] leading-5 text-slate-400">
            Snappy v0.2.3 · Windows 轻量效率工具 · 本地优先
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-slate-300">
            <a
              href={installer.downloadUrl}
              download={installer.fileName}
              className="transition-colors hover:text-white"
            >
              下载安装包
            </a>
            <button
              type="button"
              onClick={() => setIsWeChatModalOpen(true)}
              className="cursor-pointer transition-colors hover:text-white"
            >
              反馈意见
            </button>
            <a href="#download" className="transition-colors hover:text-white">返回顶部</a>
          </nav>
        </div>
      </footer>

      {/* 微信二维码弹窗 */}
      <WeChatModal
        isOpen={isWeChatModalOpen}
        onClose={() => setIsWeChatModalOpen(false)}
      />

    </div>
  );
}
