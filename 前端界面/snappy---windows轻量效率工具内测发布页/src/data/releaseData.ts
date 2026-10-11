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

const DOWNLOAD_BASE_URL = 'https://github.com/huang957201826-cyber/Snappy/releases/download/v0.2.1';

export const DOWNLOAD_VERSIONS: DownloadVersion[] = [
  {
    id: 'win-installer',
    name: 'Windows 安装版',
    version: 'v0.2.1',
    fileSize: '4.48 MB',
    format: '.exe（一键快速安装）',
    description: '标准 Windows 安装程序，适合大多数 Windows 10/11 用户；安装后可从桌面快捷方式启动。',
    recommended: true,
    sha256: 'D6ADAE9C08240A6A5D635A6D48E5EFE151D725A9D933EFB7C80712EA972AAE6B',
    fileName: 'Snappy-0.2.1-Setup.exe',
    downloadUrl: `${DOWNLOAD_BASE_URL}/Snappy-0.2.1-Setup.exe`,
  },
  {
    id: 'win-portable',
    name: '免安装绿色版',
    version: 'v0.2.1',
    fileSize: '6.21 MB',
    format: '.zip（解压即用便携包）',
    description: '无需安装，解压后即可运行；用户数据仍保存在 Snappy 本地数据目录，适合临时体验或受控设备。',
    recommended: false,
    sha256: '34A90FA01FBD93EF7D20F813A62D09C5516D7E11DC7A2DBCD739DA4BA3D231BF',
    fileName: 'Snappy-0.2.1-Portable.zip',
    downloadUrl: `${DOWNLOAD_BASE_URL}/Snappy-0.2.1-Portable.zip`,
  },
];
