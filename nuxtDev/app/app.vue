<template>
	<div>
		<el-upload
			class="upload-demo"
			drag
			action="/api/fileUpload"
			multiple
			:show-file-list="false"
			:on-success="onSuccess"
			:on-progress="onProgress"
		>
			<el-icon class="el-icon-upload"><upload-filled /></el-icon>
			<div class="el-upload__text">拖拽或者<em>点击上传</em></div>
		</el-upload>

		<el-progress
			:percentage="percentage"
			status="success"
		/>
	</div>
</template>

<script setup lang="ts">
import { ElUpload, ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const percentage = ref(0)

// 上传成功回调
const onSuccess = (response: any, file: any, fileList: any) => {
	if (response && response.success) {
		ElMessage({
			message: response.message || 'File uploaded successfully!',
			type: 'success'
		})
		percentage.value = 0 // Reset progress after successful upload
	} else {
		ElMessage({
			message: response.message || 'File upload failed. Please try again.',
			type: 'error'
		})
	}
}

// 上传进度回调

const onProgress = (event: any, file: any, fileList: any) => {
	percentage.value = event.percent.toFixed(2)
}
</script>
