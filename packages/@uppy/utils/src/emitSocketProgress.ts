import throttle from 'lodash/throttle.js'
import type { UppyFile } from './UppyFile.js'
import type { FileProgress } from './FileProgress.js'

function emitSocketProgress(
  uploader: any,
  progressData: {
    progress: string // pre-formatted percentage
    bytesTotal: number
    bytesUploaded: number
  },
  file: UppyFile<any, any>,
): void {
  const { progress, bytesUploaded, bytesTotal } = progressData
  if (progress) {
    uploader.uppy.log(`Upload progress: ${progress}`)
    uploader.uppy.emit('upload-progress', file, {
      uploadStarted: file.progress.uploadStarted ?? 0,
      bytesUploaded,
      bytesTotal,
    } satisfies FileProgress)
  }
}

export default throttle(emitSocketProgress, 300, {
  leading: true,
  trailing: true,
})
