import React, { useState } from 'react';
import {
  ClipboardList,
  Languages,
  Crop,
  CheckSquare,
  Maximize2,
  X,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Layers,
  Check,
  Eye
} from 'lucide-react';
import { SnappyLogo } from './SnappyLogo';

interface FeatureCardData {
  id: string;
  name: string;
      shortcut: string;
  tagline: string;
  badge: string;
  imageSrc: string;
  color: string;
  accentBg: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
  description: string;
}

export const RealAppShowcase: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string>('clipboard');
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string; shortcut: string } | null>(null);

  const features: FeatureCardData[] = [
    {
      id: 'clipboard',
      name: '智能剪贴板',
      shortcut: 'Alt + Space',
      tagline: '毫秒唤出历史，拼音快搜与置顶',
      badge: '本地历史',
      imageSrc: '/screenshots/clipboard.png',
      color: 'border-blue-400 ring-blue-500/15',
      accentBg: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: ClipboardList,
      highlights: ['本地历史记录', '拼音模糊速搜', '常用信息置顶'],
      description: '后台无感记录复制内容，支持文本、链接与截图，秒开秒贴。'
    },
    {
      id: 'translate',
      name: 'AI 润色与翻译',
      shortcut: '应用内',
      tagline: '多语言互译、公文润色与学术改写',
      badge: '智能助手',
      imageSrc: '/screenshots/translate.png',
      color: 'border-indigo-400 ring-indigo-500/15',
      accentBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Languages,
      highlights: ['多语言即时互译', '商务公文润色', '光标一键回填'],
      description: '多模式智能辅助，快速读取选中文本，AI 一键精修润色。'
    },
    {
      id: 'screenshot',
      name: '快捷截图板',
      shortcut: 'F4',
      tagline: '区域截屏、图库归档与离线 OCR',
      badge: '离线 OCR',
      imageSrc: '/screenshots/screenshot.png',
      color: 'border-emerald-400 ring-emerald-500/15',
      accentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Crop,
      highlights: ['像素级选区截图', '离线 OCR 识字', '尺寸智能归类'],
      description: '随手截屏自动归档至图库，可在本机识别文字并搜索、复制 OCR 结果。'
    },
    {
      id: 'notes',
      name: '闪念笔记 / 待办',
      shortcut: '应用内',
      tagline: '随手灵感速记、任务清单与彩色分类',
      badge: '轻量待办',
      imageSrc: '/screenshots/notes.png',
      color: 'border-amber-400 ring-amber-500/15',
      accentBg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: CheckSquare,
      highlights: ['快速记录', '任务打勾完成', '彩色便签管理'],
      description: '轻量灵感便签，随手记录突发奇想与当日任务，清晰直观。'
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">

      {/* 标题说明 */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-2xs">
          <Layers className="w-3.5 h-3.5" />
          <span>实机界面截图展示</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
          4 大核心功能，鼠标悬停即刻放大
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
          面向 Windows 10 / 11 设计，一排直观浏览，鼠标移到哪个功能即可查看实机细节。
        </p>
      </div>

      {/* 4 张实际截图卡片放成一排，鼠标悬浮放大 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 items-stretch">
        {features.map((f) => {
          const isHovered = hoveredId === f.id;
          const IconComponent = f.icon;

          return (
            <div
              key={f.id}
              onMouseEnter={() => setHoveredId(f.id)}
              onClick={() => setZoomImage({ src: f.imageSrc, title: f.name, shortcut: f.shortcut })}
              className={`group bg-white rounded-3xl p-4 sm:p-5 border transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between relative ${
                isHovered
                  ? `scale-[1.04] -translate-y-2 shadow-2xl ring-4 ${f.color} z-20`
                  : 'border-slate-200 hover:border-slate-300 shadow-sm opacity-95 hover:opacity-100 z-10'
              }`}
            >
              {/* 卡片头部信息 */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl ${f.accentBg} flex items-center justify-center font-bold shadow-2xs`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-black text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                      {f.name}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold transition-colors ${
                    isHovered ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {f.shortcut}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium line-clamp-1 mb-2">
                  {f.tagline}
                </p>

                {/* 3 个亮点胶囊 */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {f.highlights.map((h, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-medium">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* 真实的实际截图展示区域 */}
              <div className="relative rounded-2xl overflow-hidden bg-[#1a1d24] border border-slate-800 shadow-inner flex-1 flex flex-col items-center justify-start p-1.5 group/img">

                {/* 截图图片 (使用用户提供的真实软件截图) */}
                <img
                  src={f.imageSrc}
                  alt={f.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[380px] object-top object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />

                {/* 悬停放大与点击查看原图提示 */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none rounded-xl">
                  <span className="px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-bold backdrop-blur-md border border-slate-700/80 flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>点击查看高清大图</span>
                  </span>
                </div>

                {/* 右上角放大按钮 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomImage({ src: f.imageSrc, title: f.name, shortcut: f.shortcut });
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-slate-700/80 shadow-md transition-transform hover:scale-110 cursor-pointer"
                  title="放大查看原图"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 底部极简说明 */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>实机真实截图</span>
                <span className="text-emerald-600 font-bold">本地优先</span>
              </div>

            </div>
          );
        })}
      </div>

      {/* 极简底部隐私保障条 */}
      <div className="p-5 bg-white border border-slate-200 rounded-3xl shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">真正属于您的个人效率助手</h4>
            <p className="text-xs text-slate-500">剪贴板、截图与笔记等本地功能无需联网即可使用；AI 功能按你的配置运行。</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>已支持 Windows 10 / 11 64位</span>
        </div>
      </div>

      {/* 高清原图全屏灯箱 Modal (Lightbox) */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="bg-[#14161b] border border-slate-700 rounded-3xl max-w-md w-full p-4 sm:p-5 shadow-2xl text-slate-100 relative max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <SnappyLogo size={24} className="rounded-md" />
                <span className="font-bold text-sm text-slate-200">
                  Snappy · {zoomImage.title} ({zoomImage.shortcut})
                </span>
              </div>

              <button
                onClick={() => setZoomImage(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Actual Screenshot in Modal */}
            <div className="w-full flex-1 overflow-y-auto flex items-center justify-center p-1 bg-[#1a1d24] rounded-2xl border border-slate-800">
              <img
                src={zoomImage.src}
                alt={zoomImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="w-full pt-3 mt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>分辨率: 382 × 964 (Fluent 侧栏)</span>
              <span className="text-emerald-400">本地优先</span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
