import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroDownloadSection } from './components/HeroDownloadSection';
import { RealAppShowcase } from './components/RealAppShowcase';
import { DownloadModal } from './components/DownloadModal';
import { Footer } from './components/Footer';
import { DownloadVersion } from './types';
import { DOWNLOAD_VERSIONS } from './data/mockData';

export default function App() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedDownloadVersion, setSelectedDownloadVersion] = useState<DownloadVersion | null>(null);

  const handleOpenDownload = (version?: DownloadVersion) => {
    setSelectedDownloadVersion(version || DOWNLOAD_VERSIONS[0]);
    setIsDownloadModalOpen(true);
  };

  const handleCloseDownload = () => {
    setIsDownloadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased">
      
      {/* 顶部导航栏 */}
      <Navbar onOpenDownload={() => handleOpenDownload()} />

      {/* 核心内测页面内容区 */}
      <main className="flex-1">
        {/* 1. 下载中心（仅保留安装版与免安装绿色版） + 一句话隐私说明 + 首次启动 3 步指南 */}
        <HeroDownloadSection onTriggerDownload={handleOpenDownload} />

        {/* 2. 真实 APP 4 大界面实机交互展示（脱敏处理 + Fluent 2.0 原生质感 + 灰度规划标注） */}
        <RealAppShowcase />
      </main>

      {/* 下载交互弹窗 */}
      <DownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={handleCloseDownload} 
        selectedVersion={selectedDownloadVersion}
      />

      {/* 极简页脚 */}
      <Footer onOpenDownload={() => handleOpenDownload()} />

    </div>
  );
}
