import fs from 'fs'
import path from 'path'

export default async function getFilePaths(dir) {
  const files = await fs.promises.readdir(dir)
  const filePaths = []
  for (const file of files) {
    const filePath = path.join(dir, file)
    const fileStat = await fs.promises.lstat(filePath)
    if (fileStat.isDirectory()) {
      const subFiles = await getFilePaths(filePath)
      filePaths.push(...subFiles)
    } else {
      filePaths.push(filePath)
    }
  }
  return filePaths
}
