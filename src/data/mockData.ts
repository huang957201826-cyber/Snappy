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

const RELEASE_BASE_URL = 'https://github.com/huang957201826-cyber/Snappy/releases/download/v0.1.1';

export const DOWNLOAD_VERSIONS: DownloadVersion[] = [
  {
    id: 'win-installer',
    name: 'Windows 安装版',
    version: 'v0.1.1',
    fileSize: '4.0 MB',
    format: '.exe（一键快速安装）',
    description: '标准 Windows 安装程序，适合大多数 Windows 10/11 用户。',
    recommended: true,
    sha256: '6068DC7ADA218D3E8F409E1EF26CDEA3E9E37F80E1B6002EF843D3807B5482EB',
    fileName: 'Snappy-0.1.1-Setup.exe',
    downloadUrl: `${RELEASE_BASE_URL}/Snappy-0.1.1-Setup.exe`,
  },
  {
    id: 'win-portable',
    name: '免安装便携版',
    version: 'v0.1.1',
    fileSize: '5.3 MB',
    format: '.zip（解压即用）',
    description: '无需安装，解压后即可运行，适合临时体验或受控设备。',
    recommended: false,
    sha256: '0779B3B2D3D97283486D6FBEB739163B49652E067C927A6F61D627602A1F9B67',
    fileName: 'Snappy-0.1.1-Portable.zip',
    downloadUrl: `${RELEASE_BASE_URL}/Snappy-0.1.1-Portable.zip`,
  },
];
