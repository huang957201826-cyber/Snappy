import React, { useState } from 'react';
import { Check, Copy, MessageCircle, UserCheck, Users, X } from 'lucide-react';

interface WeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

const assetUrl = (name: string) =>
  `${import.meta.env.BASE_URL}${name.replace(/^\/+/, '')}`;

export const WeChatModal: React.FC<WeChatModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'group' | 'author'>('group');
  const [copied, setCopied] = useState(false);
  const wechatId = 'Snappy_Dev';

  if (!isOpen) return null;

  const qrSource =
    activeTab === 'group'
      ? assetUrl('assets/wechat-group-qr.png')
      : assetUrl('assets/author-wechat-qr.png');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wechatId);
      setCopied(true);
      onShowToast(`微信号 "${wechatId}" 已复制`);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast('复制失败，请手动选择微信号');
    }
  };

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
          {activeTab === 'group' ? '加入 Snappy 微信内测群' : '添加作者微信'}
        </h3>
        <p className="mb-4 text-xs text-slate-500">扫码交流，或复制微信号手动添加。</p>

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
            作者微信
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

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs">
          <div className="text-left">
            <span className="block text-[10px] text-slate-400">微信号:</span>
            <span className="font-mono font-bold text-slate-800">{wechatId}</span>
          </div>
          <button
            type="button"
            onClick={() => void handleCopy()}
            className="flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-black"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? '已复制' : '复制微信'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
