import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor,
  Minus,
  Square,
  X,
  HardDrive,
  Trash2,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  Sun,
  Moon
} from 'lucide-react';

export interface ToolFeature {
  id: string;
  name: string;
  image: string;
  desc: string;
}

const getAssetUrl = (relativePath: string) => {
  const clean = relativePath.replace(/^\/?(public\/)?/, '');
  const base = import.meta.env.BASE_URL || './';
  return `${base.endsWith('/') ? base : base + '/'}${clean}`;
};

const TOOLS: ToolFeature[] = [
  {
    id: 'clipboard',
    name: '智能剪贴板',
    image: getAssetUrl('assets/aistudio/____b667716b.png'),
    desc: '毫秒级呼出历史复制记录，支持文本、富文本、图片与链接分类检索，回车即选即贴。',
  },
  {
    id: 'ai-translate',
    name: 'AI 润色翻译',
    image: getAssetUrl('assets/aistudio/___b891fb7a.png'),
    desc: '屏幕选词即点即译，学术重写、语气润色与代码解析，自主配置模型或离线轻量引擎。',
  },
  {
    id: 'screenshot',
    name: '快捷截图板',
    image: getAssetUrl('assets/aistudio/___89496dc3.png'),
    desc: '高精十字瞄准截屏，支持多区域置顶贴图比对、滚动长图与纯离线高准确度本地 OCR 识别。',
  },
  {
    id: 'quicknotes',
    name: '笔记/待办',
    image: getAssetUrl('assets/aistudio/_____12234f7e.png'),
    desc: '无感悬浮贴心小本，灵感闪念随手记，支持轻量 Markdown 格式与纯本地加密存储永不丢稿。',
  },
];

export const WindowsDesktopSimulator: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeToolId, setActiveToolId] = useState<string>('clipboard');
  const [isDimmed, setIsDimmed] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeTool = TOOLS.find(t => t.id === activeToolId) || TOOLS[0];

  // 触发 3 秒无操作自动淡显计时器
  const resetDimTimer = () => {
    setIsDimmed(false);
    setSecondsRemaining(3);

    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    // 倒计时每秒更新
    countdownIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 3 秒后自动淡显 (降低透明度)
    timerRef.current = setTimeout(() => {
      setIsDimmed(true);
      triggerNotice('3秒无操作 · 软件已自动淡显 (保持半透明)');
    }, 3000);
  };

  useEffect(() => {
    resetDimTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [activeToolId, isOpen]);

  // 只在模拟器获得焦点时响应快捷键，避免拦截整个网页的 Alt + Space。
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;

      // 监听 Alt + Space
      if (e.altKey && (e.code === 'Space' || e.key === ' ')) {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          triggerNotice(next ? '通过 Alt + 空格 呼出软件' : '通过 Alt + 空格 收起软件');
          return next;
        });
        resetDimTimer();
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerNotice('按 Esc 已快速收起软件');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const triggerNotice = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => {
      setToastNotice(null);
    }, 2200);
  };

  const handleSelectTool = (tool: ToolFeature) => {
    setActiveToolId(tool.id);
    if (!isOpen) setIsOpen(true);
    resetDimTimer();
    triggerNotice(`切换至「${tool.name}」`);
  };

  const handleManualWake = () => {
    resetDimTimer();
    triggerNotice('鼠标交互 · 已重新点亮至 100% 不透明');
  };

  const handleToggleDimManual = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDimmed) {
      resetDimTimer();
      triggerNotice('已手动激活高亮');
    } else {
      setIsDimmed(true);
      setSecondsRemaining(0);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      triggerNotice('已手动触发淡显 (半透明状态)');
    }
  };

  const handleToggleOpen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsOpen(!isOpen);
    resetDimTimer();
    triggerNotice(!isOpen ? '已唤出 Snappy' : '已收起 Snappy');
  };

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      onMouseDown={() => sectionRef.current?.focus()}
      className="w-full my-8 sm:my-14 text-left outline-none"
      aria-label="Snappy Windows 桌面交互模拟器"
    >

      {/* 模块顶部极简标题与指引 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 px-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider">
            <Monitor className="w-3.5 h-3.5" />
            <span>Windows 11 经典桌面模拟</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            真实 Windows 桌面工作环境
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            体验屏幕右侧原生比例；聚焦模拟器后按 <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-xs border border-slate-200">Alt + 空格</kbd> 呼出，并查看 3 秒无操作自动淡显。
          </p>
        </div>

        {/* 顶部轻量快捷控制条 */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* 壁纸明暗切换 */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? '切换为浅色经典 Bloom 壁纸' : '切换为深色经典 Bloom 壁纸'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs cursor-pointer transition-colors"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
            <span className="hidden sm:inline">{isDarkMode ? '深色壁纸' : '浅色壁纸'}</span>
          </button>

          {/* 模拟弹出/收起 */}
          <button
            onClick={handleToggleOpen}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isOpen
                ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs'
                : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-sm'
            }`}
          >
            {isOpen ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                <span>收起软件</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Alt + 空格 弹出</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ================= 模拟真实 Windows 11 桌面视窗容器 ================= */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-slate-300/80 bg-slate-900 shadow-2xl overflow-hidden transition-all duration-300 select-none">

        {/* Windows 11 顶部窗口标题栏 (经典 Mica 材质与标准控件) */}
        <div className="w-full h-10 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 flex items-center justify-between z-20 relative">

          <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
            <svg className="w-3.5 h-3.5 fill-sky-400" viewBox="0 0 88 88">
              <path d="M0 12.402l35.689-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.016 45.719zm4.326-39.027L87.914 0v41.527l-47.918.376zm47.918 43.46v41.636l-47.918-6.736-.021-35.25z" />
            </svg>
            <span>Windows 11 Pro · 工作区模拟</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">按 Alt + 空格 随时弹出或收起</span>
          </div>

          {/* 右侧：标准最小化/最大化/关闭 */}
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(false)}
              title="最小化"
              className="w-8 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              title="最大化"
              className="w-8 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              <Square className="w-2.5 h-2.5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              title="关闭"
              className="w-8 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-600 rounded transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 桌面核心主屏幕 (载入真实 Windows 11 Bloom 壁纸) */}
        <div className="relative flex h-[560px] w-full cursor-default overflow-hidden bg-slate-900 sm:h-[650px] lg:h-[720px]">
          <img
            src={getAssetUrl(
              isDarkMode ? 'assets/windows11_bloom_dark.jpg' : 'assets/windows11_bloom.jpg',
            )}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* 桌面暗度微调层，确保文字与截图对比度舒适 */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isDarkMode ? 'bg-black/20' : 'bg-slate-900/10'}`} />

          {/* ================= 桌面左上角：仅保留 2 个真实经典的 Windows 图标 ================= */}
          <div className="absolute top-5 left-5 flex flex-col gap-4 text-white pointer-events-none select-none z-10">
            {/* 1. 此电脑 */}
            <div className="flex flex-col items-center gap-1 w-18 p-2 rounded-lg bg-black/5 hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-md">
                <HardDrive className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] font-medium text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                此电脑
              </span>
            </div>

            {/* 2. 回收站 */}
            <div className="flex flex-col items-center gap-1 w-18 p-2 rounded-lg bg-black/5 hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-md">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] font-medium text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                回收站
              </span>
            </div>
          </div>

          {/* ================= 右侧伴侣工作区：包含上方的横向小按钮与下方的原生截图 ================= */}
          <div className="absolute top-3 bottom-14 right-3 sm:right-6 z-30 flex flex-col items-end max-w-full">

            {/*
              4 个功能的转换按钮：
              - 移到 4 个截图的上方
              - 做小一点
              - 横向排列 (flex-row)
              - 删除了内部快捷键标签 (Alt+V/S等)
            */}
            <div className="mb-2 bg-slate-900/85 backdrop-blur-xl border border-white/15 p-1.5 rounded-2xl shadow-xl flex items-center gap-1 max-w-full overflow-x-auto">
              {TOOLS.map((tool) => {
                const isSelected = activeToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm ring-1 ring-white/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{tool.name}</span>
                  </button>
                );
              })}

              {/* 淡显状态指示与手动演练微按钮 */}
              <div className="hidden sm:flex items-center pl-2 ml-1 border-l border-white/15">
                <button
                  onClick={handleToggleDimManual}
                  title="点击手动演练淡显 (给图片半透明度)"
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
                    isDimmed
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isDimmed ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
                  <span>{isDimmed ? '已淡显 (30%透明度)' : `活跃中 (${secondsRemaining}s后淡显)`}</span>
                </button>
              </div>
            </div>

            {/*
              下方原生客户端截图窗口：
              - 严格保留 459×1049 原生尺寸比例
              - 3秒无操作自动淡显：通过平滑降低透明度 (isDimmed ? 'opacity-30' : 'opacity-100')
              - 鼠标移入/点击立即点亮恢复
            */}
            <div
              onMouseEnter={handleManualWake}
              onClick={handleManualWake}
              className={`relative flex-1 min-h-0 aspect-[459/1049] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-slate-700/80 bg-slate-900/90 overflow-hidden transition-all duration-700 ease-out cursor-pointer group ${
                !isOpen
                  ? 'opacity-0 translate-x-12 scale-95 pointer-events-none'
                  : isDimmed
                    ? 'opacity-30 hover:opacity-100 scale-[0.99] hover:scale-100'
                    : 'opacity-100 scale-100'
              }`}
            >
              {/* 原生真实截图 */}
              <img
                src={activeTool.image}
                alt={activeTool.name}
                className="w-full h-full object-contain select-none"
                draggable={false}
              />

              {/* 淡显时的半透明温和提示遮罩 */}
              {isDimmed && isOpen && (
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0.5px] flex items-center justify-center transition-opacity group-hover:opacity-0 pointer-events-none">
                  <div className="bg-slate-900/90 text-white text-[11px] font-medium px-3 py-1.5 rounded-xl border border-white/10 shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    <span>3秒无操作 · 已自动淡显 (悬停即唤醒)</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 收起状态下的快捷唤出引导 */}
          {!isOpen && (
            <div
              onClick={() => {
                setIsOpen(true);
                resetDimTimer();
              }}
              className="absolute top-1/2 right-8 -translate-y-1/2 z-20 cursor-pointer bg-slate-900/90 hover:bg-slate-900 text-white p-5 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center gap-2 text-center transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600/30 text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                <Eye className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold">软件已收起隐藏</div>
              <div className="text-[11px] text-slate-400">
                按 <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 font-mono">Alt + 空格</kbd> 或点击此处立即弹出
              </div>
            </div>
          )}

          {/* 实时操作 Toast */}
          {toastNotice && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-4 py-2 rounded-xl border border-white/10 shadow-2xl text-xs font-medium flex items-center gap-2 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-150">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{toastNotice}</span>
            </div>
          )}

          {/* ================= Windows 11 底部任务栏 ================= */}
          <div className="absolute bottom-0 left-0 right-0 h-11 bg-slate-900/85 backdrop-blur-xl border-t border-white/10 px-4 flex items-center justify-between z-30 select-none">

            {/* 左侧微标 */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
              <span>🌤️</span>
              <span className="text-[11px] text-slate-400">24°C 晴</span>
            </div>

            {/* 居中的 Windows 11 任务栏图标 */}
            <div className="flex items-center gap-1.5 mx-auto">
              <button
                title="Windows 开始"
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-300"
              >
                <svg className="w-4 h-4 fill-sky-400" viewBox="0 0 88 88">
                  <path d="M0 12.402l35.689-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.016 45.719zm4.326-39.027L87.914 0v41.527l-47.918.376zm47.918 43.46v41.636l-47.918-6.736-.021-35.25z" />
                </svg>
              </button>

              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800/80 text-xs text-slate-400 border border-white/10 w-28">
                <span>🔍</span>
                <span className="text-[11px]">搜索...</span>
              </div>

              <div className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-300 text-sm">📁</div>
              <div className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-300 text-sm">🌐</div>

              {/* Snappy 任务栏常驻图标 */}
              <button
                onClick={handleToggleOpen}
                title="Snappy 运行指示器 (按 Alt+空格 或点击弹出)"
                className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  isOpen
                    ? 'bg-blue-600/30 text-blue-400 ring-1 ring-blue-500/50'
                    : 'hover:bg-white/10 text-slate-400'
                }`}
              >
                <span className="text-sm font-black">S</span>
                <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${isOpen ? 'bg-blue-400' : 'bg-slate-500'}`} />
              </button>
            </div>

            {/* 右侧系统托盘 */}
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="hidden sm:inline text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                主进程约 28MB
              </span>
              <div className="flex flex-col items-end text-[11px] leading-tight text-slate-300">
                <span>16:20</span>
                <span className="text-[9px] text-slate-500">2026/10/24</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ================= 底部 3 大核心诉求解析 (快捷键聚焦 Alt + 空格) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 px-1">

        {/* 1. 真实尺寸 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
            01
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
            <span>屏幕伴侣尺寸</span>
            <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
              459 × 1049 原生比
            </span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            紧贴 Windows 屏幕右侧伴侣位，仅占屏幕边缘黄金区域。桌面主视野、浏览器与代码窗口一览无余，工作流全面零遮挡。
          </p>
        </div>

        {/* 2. 如何使用 (Alt + 空格) */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
            02
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
            <span>Alt + 空格 全局弹出</span>
            <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono">
              Alt + Space
            </span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            无论当前在运行任何软件，随手按下 Alt + 空格 即可瞬间呼出 Snappy，完成操作再次按下即可收起，丝滑流畅。
          </p>
        </div>

        {/* 3. 3秒无操作自动淡显 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mb-3">
            03
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
            <span>3秒无操作自动淡显</span>
            <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-mono">
              自动降低透明度
            </span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            呼出后 3 秒内若未继续操作，窗口平滑进入半透明淡显状态，避免干扰工作视线；鼠标移入或点击即刻满血点亮恢复。
          </p>
        </div>

      </div>

    </section>
  );
};
