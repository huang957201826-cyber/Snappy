import React from 'react';
import { UserCheck, Users } from 'lucide-react';

const assetUrl = (name: string) =>
  `${import.meta.env.BASE_URL}${name.replace(/^\/+/, '')}`;

export const WeChatSection: React.FC = () => {
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
            <span>联系作者，反馈内测意见</span>
          </div>

          <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
            <img
              src={assetUrl('assets/author-wechat-qr.png')}
              alt="Snappy 作者微信二维码"
              className="h-40 w-40 rounded-lg object-contain"
              loading="lazy"
            />
          </div>

          <p className="text-xs leading-5 text-slate-500">
            扫码添加作者，直接反馈内测意见
          </p>
        </div>
      </div>
    </section>
  );
};
