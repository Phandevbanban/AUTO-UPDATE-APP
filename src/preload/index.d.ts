import { ElectronAPI as BaseElectronAPI } from '@electron-toolkit/preload'

export interface ElectronAPI extends BaseElectronAPI {
  onUpdateAvailable: (callback: () => void) => void
  onUpdateDownloaded: (callback: () => void) => void
  installUpdate: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}
