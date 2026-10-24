import React, { useState } from 'react';
import { Check, Copy, UserCheck, Users } from 'lucide-react';

interface WeChatSectionProps {
  onShowToast: (message: string) => void;
  onOpenDownload?: () => void;
}

const assetUrl = (name: string) =>
  `${import.meta.env.BASE_URL}${name.replace(/^\/+/, '')}`;

export const WeChatSection: React.FC<WeChatSectionProps> = ({ onShowToast }) => {
  const [copiedAuthor, setCopiedAuthor] = useState(false);
  const authorWechatId = 'Snappy_Dev';

  const handleCopyAuthor = async () => {
    try {
      await navigator.clipboard.writeText(authorWechatId);
      setCopiedAuthor(true);
      onShowToast(`已复制作者微信号: ${authorWechatId}`);
      window.setTimeout(() => setCopiedAuthor(false), 2000);
    } catch {
      onShowToast('复制失败，请手动选择微信号');
    }
  };

  return (
    <section
      id="community"
      className="relative w-full border-t border-slate-200/60 bg-slate-50/70 px-5 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          真正属于您的个人效率助手
        </h2>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          剪贴板、截图与笔记等本地功能无需联网即可使用；AI 功能按你的配置运行。
        </p>
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <div className="flex flex-col items-center rounded-3xl border border-slate-200/90 bg-white p-7 text-center shadow-[0_12px_30px_-8px_rgba(0,0,0,0.06)] sm:p-8">
          <div className="mb-5 flex items-center gap-2 text-base font-bold text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-200/80 bg-emerald-50 text-emerald-600">
              <Users className="h-4 w-4" />
            </div>
            <span>微信内测群</span>
          </div>

          <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
            <img
              src={assetUrl('assets/wechat-group-qr.png')}
              alt="Snappy 微信内测群二维码"
              className="h-40 w-40 rounded-lg object-contain"
              loading="lazy"
            />
          </div>

          <p className="text-xs text-slate-500">微信扫码直接入群交流</p>
        </div>

        <div className="flex flex-col items-center rounded-3xl border border-slate-200/90 bg-white p-7 text-center shadow-[0_12px_30px_-8px_rgba(0,0,0,0.06)] sm:p-8">
          <div className="mb-5 flex items-center gap-2 text-base font-bold text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-200/80 bg-blue-50 text-blue-600">
              <UserCheck className="h-4 w-4" />
            </div>
            <span>作者个人微信</span>
          </div>

          <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
            <img
              src={assetUrl('assets/author-wechat-qr.png')}
              alt="Snappy 作者微信二维码"
              className="h-40 w-40 rounded-lg object-contain"
              loading="lazy"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-600">
              微信号: <span className="font-bold text-slate-900">{authorWechatId}</span>
            </span>
            <button
              type="button"
              onClick={() => void handleCopyAuthor()}
              className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-800 transition-all hover:bg-slate-200"
            >
              {copiedAuthor ? (
                <Check className="h-3 w-3 text-emerald-600" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              <span>{copiedAuthor ? '已复制' : '复制'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
