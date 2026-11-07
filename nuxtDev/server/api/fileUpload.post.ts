import { extname } from 'path'

export default defineEventHandler(async (event) => {
	const files = await readMultipartFormData(event)

	if (!files || files.length === 0) {
		return {
			message: 'No files uploaded',
			error: true
		}
	}

	// 获取配置好的存储桶
	const storage = useStorage('uploads')

	// 遍历上传的文件并保存到存储桶中
	files.forEach(async (file) => {
		// 获取文件扩展名并生成唯一文件名
		const ext = extname(file.filename || '')
		const uniqueName = `${Date.now()}-${file.filename || `file.${ext}`}`

		// 写入二进制数据
		await storage.setItemRaw(uniqueName, file.data)
	})

	return {
		message: 'File uploaded successfully',
		success: true
	}
})
