<template>
  <div>
    <el-button @click="start" :disabled="recorder">开始录屏</el-button>
    <el-button @click="stop" :disabled="!recorder">停止录制</el-button>

    <h3>实时预览</h3>
    <video
      ref="preview"
      autoplay
      muted
      playsinline
      width="720"
    ></video>

    <h3>录制结果</h3>
    <video ref="playback" controls width="720"></video>

    <br /><br />
    <el-button @click="download" :disabled="!blob">下载 webm</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        displayStream: null,
        recorder: null,
        recorderMimeType: '',
        chunks: [],
        blob: null,
        blobUrl: null
      }
    },

    beforeDestroy() {
      this.stop()
    },

    methods: {
      // 选一个浏览器支持的 mimeType
      pickMimeType() {
        const list = [
          'video/webm;codecs=vp9,opus',
          'video/webm;codecs=vp8,opus',
          'video/webm'
        ]
        return list.find(t => MediaRecorder.isTypeSupported(t)) || 'video/webm'
      },

      async start() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          alert('必须是 localhost 或 https，当前环境不支持屏幕录制')
          return
        }

        let stream
        try {
          stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
              frameRate: { ideal: 30 },
              cursor: 'always'
            },
            audio: true // 可在弹窗里勾选"共享音频"
          })
        } catch (err) {
          if (err.name === 'NotAllowedError') {
            alert('用户取消了屏幕共享')
          } else {
            alert('获取屏幕流失败：' + err.name)
          }
          return
        }

        this.displayStream = stream
        this.$refs.preview.srcObject = stream

        // "停止共享"按钮点击时触发
        stream.getVideoTracks()[0].addEventListener('ended', () => {
          this.stop()
        })

        // 准备录制
        this.chunks = []
        const mimeType = this.pickMimeType()

        this.recorder = new MediaRecorder(stream, {
          mimeType,
          videoBitsPerSecond: 2500000
        })

        this.recorderMimeType = mimeType

        this.recorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) {
            this.chunks.push(e.data)
          }
        }

        this.recorder.onstop = () => {
          const type = this.recorderMimeType || 'video/webm'

          this.blob = new Blob(this.chunks, { type })

          if (this.blobUrl) {
            URL.revokeObjectURL(this.blobUrl)
          }

          this.blobUrl = URL.createObjectURL(this.blob)
          this.$refs.playback.src = this.blobUrl
        }

        this.recorder.start(1000)
      },

      stop() {
        // 停 MediaRecorder会异步触发 onstop
        if (this.recorder && this.recorder.state !== 'inactive') {
          this.recorder.stop()
        }

        // 停止所有媒体轨道
        if (this.displayStream) {
          this.displayStream.getTracks().forEach(t => t.stop())
        }

        // 清除预览
        if (this.$refs.preview) {
          this.$refs.preview.srcObject = null
        }

        this.recorder = null
        this.displayStream = null
      },

      download() {
        if (!this.blob) return
        const a = document.createElement('a')
        a.href = this.blobUrl
        a.download = `screen-${Date.now()}.webm`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    }
  }
</script>
