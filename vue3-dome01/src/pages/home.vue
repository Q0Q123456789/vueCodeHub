<template>
  <div>home page</div>
  <ScreenRecorderVue preview @recording-end="onEnd" start-btn-text="开始录制" end-btn-text="结束录制" />
</template>

<script setup>
import ScreenRecorderVue from 'screen-recorder-vue'
const onEnd = (blobUrl, blob) => {
  // 在这里处理录制好的视频 Blob，例如上传或下载
  console.log('录制完成', blob)
  console.log('录制完成', blobUrl)
  // 创建临时下载链接
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url

  // 设置下载的文件名（注意：screen-recorder-vue 通常录制为 webm 格式）
  a.download = `屏幕录制_${new Date().getTime()}.mp4`

  // 触发点击下载
  document.body.appendChild(a)
  a.click()

  // 清理资源
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
</script>

<style lang="scss" scoped></style>
