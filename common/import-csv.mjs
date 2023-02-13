import fs from 'fs'
import csv from 'csv-parser'

const import_csv = async function ({ file_path, chunk_size, save }) {
  return new Promise((resolve, reject) => {
    let chunk = []
    fs.createReadStream(file_path)
      .pipe(csv())
      .on('data', async (data) => {
        chunk.push(data)
        if (chunk.length === chunk_size) {
          await save(chunk)
          chunk = []
        }
      })
      .on('error', (error) => reject(error))
      .on('end', async () => {
        if (chunk.length) {
          await save(chunk)
          chunk = null
          resolve()
        } else {
          resolve()
        }
      })
  })
}

export default import_csv
