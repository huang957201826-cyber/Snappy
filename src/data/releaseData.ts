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

const DOWNLOAD_BASE_URL = 'https://github.com/huang957201826-cyber/Snappy/releases/download/v0.2.0';

export const DOWNLOAD_VERSIONS: DownloadVersion[] = [
  {
    id: 'win-installer',
    name: 'Windows 安装版',
    version: 'v0.2.0',
    fileSize: '4.5 MB',
    format: '.exe（一键快速安装）',
    description: '标准 Windows 安装程序，适合大多数 Windows 10/11 用户；安装后可从桌面快捷方式启动。',
    recommended: true,
    sha256: '4EEA1F5C896D2E51A9023CFF98CC7301E7290B6710E509660BBFE56349FDD411',
    fileName: 'Snappy-0.2.0-Setup.exe',
    downloadUrl: `${DOWNLOAD_BASE_URL}/Snappy-0.2.0-Setup.exe`,
  },
  {
    id: 'win-portable',
    name: '免安装绿色版',
    version: 'v0.2.0',
    fileSize: '6.0 MB',
    format: '.zip（解压即用便携包）',
    description: '无需安装，解压后即可运行；用户数据仍保存在 Snappy 本地数据目录，适合临时体验或受控设备。',
    recommended: false,
    sha256: '75A88E0C58A931A8E56513B4AB708DA93B1AA281A40D59102F472DC0585ECAEC',
    fileName: 'Snappy-0.2.0-Portable.zip',
    downloadUrl: `${DOWNLOAD_BASE_URL}/Snappy-0.2.0-Portable.zip`,
  },
];
