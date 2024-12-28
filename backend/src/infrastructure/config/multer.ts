import multer from 'fastify-multer'
import fs from 'fs'
import path from 'path'
import { FastifyRequest } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    uploadedFile?: {
      filename?: string
    }
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../uploads')
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`

    if (!req.uploadedFile) {
      req.uploadedFile = {}
    }
    req.uploadedFile.filename = fileName
    cb(null, fileName)
  }
})

export const upload = multer({ storage })
