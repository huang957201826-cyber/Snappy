export interface DownloadVersion {
  id: string;
  name: string;
  version: string;
  fileSize: string;
  format: string;
  description: string;
  recommended: boolean;
  sha256: string;
  fileName: string;
}

export const DOWNLOAD_VERSIONS: DownloadVersion[] = [
  {
    id: 'win-installer',
    name: 'Windows 安装版',
    version: 'v0.8.2-beta',
    fileSize: '18.2 MB',
    format: '.exe (一键快速安装)',
    description: '标准 Windows 安装程序，自动注册全局快捷键与开机启动，适合绝大多数个人 Windows 10/11 用户。',
    recommended: true,
    sha256: '9f83c2e17a5b6d4e8c1f0a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    fileName: 'Snappy-Setup-v0.8.2-x64.exe'
  },
  {
    id: 'win-portable',
    name: '免安装绿色版',
    version: 'v0.8.2-beta',
    fileSize: '16.5 MB',
    format: '.zip (解压即用便携包)',
    description: '无需管理员权限与安装过程，解压即可运行，配置与历史记录保存在同级目录，适合企业管控电脑或 U 盘随身携带。',
    recommended: false,
    sha256: '3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    fileName: 'Snappy-Portable-v0.8.2-x64.zip'
  }
];
