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
  downloadUrl: string;
}

const DOWNLOAD_BASE_URL = 'https://github.com/huang957201826-cyber/Snappy/releases/download/v0.2.2';

export const DOWNLOAD_VERSIONS: DownloadVersion[] = [
  {
    id: 'win-installer',
    name: 'Windows 安装版',
    version: 'v0.2.2',
    fileSize: '4.49 MB',
    format: '.exe（一键快速安装）',
    description: '标准 Windows 安装程序，适合大多数 Windows 10/11 用户；安装后可从桌面快捷方式启动。',
    recommended: true,
    sha256: '3F971EB1EA57D99F1C19963FCD2D04F0A7E0946F5F73958064BF508B592541A5',
    fileName: 'Snappy-0.2.2-Setup.exe',
    downloadUrl: `${DOWNLOAD_BASE_URL}/Snappy-0.2.2-Setup.exe`,
  },
  {
    id: 'win-portable',
    name: '免安装绿色版',
    version: 'v0.2.2',
    fileSize: '6.22 MB',
    format: '.zip（解压即用便携包）',
    description: '无需安装，解压后即可运行；用户数据仍保存在 Snappy 本地数据目录，适合临时体验或受控设备。',
    recommended: false,
    sha256: 'F5BE2E3B181D53EFA5E91441A90822AB7B4A905837F4C1CF59F506F4B45AB804',
    fileName: 'Snappy-0.2.2-Portable.zip',
    downloadUrl: `${DOWNLOAD_BASE_URL}/Snappy-0.2.2-Portable.zip`,
  },
];
