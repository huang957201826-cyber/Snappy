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

const DOWNLOAD_BASE_URL = 'https://github.com/huang957201826-cyber/Snappy/releases/download/v0.2.3';

export const DOWNLOAD_VERSIONS: DownloadVersion[] = [
  {
    id: 'win-installer',
    name: 'Windows 安装版',
    version: 'v0.2.3',
    fileSize: '4.51 MB',
    format: '.exe（一键快速安装）',
    description: '标准 Windows 安装程序，适合大多数 Windows 10/11 用户；安装后可从桌面快捷方式启动。',
    recommended: true,
    sha256: 'EF5B80CAEFDC9CC627BBD3A5D2743517D9663FC1A7DFD58155CE42C69EC60C22',
    fileName: 'Snappy-0.2.3-Setup.exe',
    downloadUrl: `${DOWNLOAD_BASE_URL}/Snappy-0.2.3-Setup.exe`,
  },
  {
    id: 'win-portable',
    name: '免安装绿色版',
    version: 'v0.2.3',
    fileSize: '6.25 MB',
    format: '.zip（解压即用便携包）',
    description: '无需安装，解压后即可运行；用户数据仍保存在 Snappy 本地数据目录，适合临时体验或受控设备。',
    recommended: false,
    sha256: '71710DF2D59A8DFDEA42BEC192CDF40C5BC05941F641B2A38077835122182208',
    fileName: 'Snappy-0.2.3-Portable.zip',
    downloadUrl: `${DOWNLOAD_BASE_URL}/Snappy-0.2.3-Portable.zip`,
  },
];
