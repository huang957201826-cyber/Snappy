import React, { useState } from 'react';
import { MessageCircle, UserCheck, Users, X } from 'lucide-react';

interface WeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const assetUrl = (name: string) =>
  `${import.meta.env.BASE_URL}${name.replace(/^\/+/, '')}`;

export const WeChatModal: React.FC<WeChatModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'group' | 'author'>('group');

  if (!isOpen) return null;

  const qrSource =
    activeTab === 'group'
      ? assetUrl('assets/wechat-group-qr.png')
      : assetUrl('assets/author-wechat-qr.png');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 text-center text-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="关闭"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-1 flex items-center justify-center gap-2 text-emerald-600">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs font-bold">微信联系</span>
        </div>
        <h3 className="mb-1 text-lg font-black text-slate-900">
          {activeTab === 'group' ? '加入 Snappy 微信内测群' : '直接联系作者'}
        </h3>
        <p className="mb-4 text-xs text-slate-500">
          {activeTab === 'group'
            ? '扫码加入内测群，交流使用体验。'
            : '扫码添加作者，反馈内测意见。'}
        </p>

        <div className="mb-4 flex rounded-xl border border-slate-200 bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('group')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
              activeTab === 'group'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="h-3.5 w-3.5 text-emerald-600" />
            微信内测群
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('author')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
              activeTab === 'author'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5 text-blue-600" />
            反馈意见
          </button>
        </div>

        <div className="mb-3 inline-block rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <img
            src={qrSource}
            alt={activeTab === 'group' ? 'Snappy 微信内测群二维码' : 'Snappy 作者微信二维码'}
            className="h-[170px] w-[170px] rounded-lg object-contain"
          />
        </div>

        <p className="mb-3 text-[11px] text-slate-500">使用微信扫一扫上方二维码</p>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left">
          <span className="block text-xs font-bold text-slate-800">直接联系作者</span>
          <span className="mt-1 block text-[11px] leading-5 text-slate-500">
            反馈问题、改进建议或内测体验。
          </span>
        </div>
      </div>
    </div>
  );
};
