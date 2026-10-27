<template>
  <div class="box">
    <iframe class="iframe" src="http://192.168.2.200:18080/#/live" @load="iframeFn"></iframe>
    <!-- <iframe class="iframe" src="http://192.168.2.108:9000/#/login" @load="iframeFn"></iframe> -->
    <!-- <iframe class="iframe" src="http://192.168.2.100:9000/#/login" @load="iframeFn"></iframe> -->
    <!-- <iframe
      src="http://192.168.2.200:18080/#/play/share?type=0&url=ws%3A%2F%2F192.168.2.200%3A9080%2F1%2F1.live.flv%3ForiginTypeStr%3Dpull%26audioCodec%3DG711A%26videoCodec%3DH264"
    ></iframe> -->
    <!-- <button @click="iframeFn">点击</button> -->
  </div>
</template>

<script setup>
import axios from 'axios'
import crypto from 'crypto-js'

const hashedPassword = crypto.MD5('admin').toString()
const accessToken = ''

let key =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlNzk2NDZjNGRiYzQwODM4M2E5ZWVkMDlmMmI4NWFlIn0.eyJqdGkiOiI2ejZZR1FEa2ItOENLX0E0YjhOMHlRIiwiaWF0IjoxNzg4OTE5NDAxLCJleHAiOjE3ODk1MjQyMDEsIm5iZiI6MTc4ODkxOTQwMSwic3ViIjoibG9naW4iLCJhdWQiOiJBdWRpZW5jZSIsInVzZXJOYW1lIjoiYWRtaW4ifQ.FSfMfnPfc4JeGWVqi4I3V4gs4JQwVxoutH1-b2iSbMAzxtLGQ3-c4P0EWd3ulr1wb63SmVu5VWPx6thFSFMUog4LrX9o992pLl_bNFMeXQbS2CrZFhQN6gW0Sd6j9kb0YLLjzF8ykYsQ7CK8740bjUSq3W3SK9Y2SYmAL7QSKaVcD2Nt5xMJKJlwCcMHoUxMi5gV9jcROjII461oOzg5XkDUzM-gYeTZ7Xg8l_47Wt3CLrHmNPpUxxaBd1_tjy45bBM6B_8TYKGKOMYlYJeFCiP26zfT2Ebg_Qdi-ABFOXzl3chy5nKo8e4lGmlVr0_w_waTmTSMmZkEkVT8YrusIK-CpsGwmyOV1fXC_hFIls51MU4RKmZXFNZ82UWCqzKnJvMh2o4krlXCwqClng54TrQoZ7A5Ed2lR4EivUwY229TPEPUojIaDW2RFNMuHh5RhgytY-JEhbbJjXSB5IT8E7Et2MuIZvuePF8hDZKG6dKTsR3GTIKjv_jddXOKEzu24aA64StQaJAJifcnpO7N15WXWSh1Ymsim4Ih54jL8KGENWGFOEy0LpMIv6FZk-Nygxu0AgxmuldIq3m7uvEkaa9sZAC3RoswdxKkrhM-nmWA8_Sm8GB5n8K9OeIrEfzGZuCLDqshdaPbMfURQly_mleaTBkPrHMzOy590wMqask'
const iframeFn = () => {
  // localStorage.setItem(
  //   'access-token',
  //   'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlNzk2NDZjNGRiYzQwODM4M2E5ZWVkMDlmMmI4NWFlIn0.eyJqdGkiOiJ5WmNDVl9paTQxcy1pbkhieFMtUFdRIiwiaWF0IjoxNzg4ODU5NzQ5LCJleHAiOjE3ODk0NjQ1NDksIm5iZiI6MTc4ODg1OTc0OSwic3ViIjoibG9naW4iLCJhdWQiOiJBdWRpZW5jZSIsInVzZXJOYW1lIjoiYWRtaW4ifQ.NHtE7fkN0ntFQzxR9uydMUlECSt4sohbOOYc09cSTNEg0K8azfQuWOQY3o10jkT-L9lVvaT204bmmhIzdMLfZNCwd9ghmmf6k26OD31XZngKLpsOOwRW632CQCTJ-hqczUewAdTmXOnRNmmlISc-3qg7zc5I4H1JNXp8Z2JuvBa31glXCVsCIiUB17Rh-CwA2kQkVKZ5VxMFFpllppJP9danDAKEQOAuhOlQSEQ8l56tz6Abl73EbJY6aRmkAO5pTscItLQWlV2GzfQeJJJnMuB-8fjQ2F5Bp-ROZbFjSlN00WUZr6WdWxakc_SQJbiLZnxiosn-N1uvcP9MdYcyvph1hSEI5_lDWi2BzQ6QBRiql3kSJ-0ZL86azGLermnIun6fbRyC--WCBGR-6uU4uoUuMQj-eSkvcL1BwgqVz3i44JrwSJRowxkaNCR3f0Dm9TljXjFL4seZ8zcIdZODkaSxTyIwcouD00f2oaxGzENmFshK_2AZC_kvoBaqAoQB3WRy2PgSq3Ysh9V5h-f9eKgP5K9aSXSFSe9AwaEIYlLsl4Bz9cyrQg1KDBTmQ_GeOYlwhjCm-ssqWft4AsyUhh352KeUem4nTlBOGZzAU6VE4tEoK0GCZmwdTP0NfVJ92jTkch-CKW-efanHiOIuabs58PaPO_79wIlTU8d36bA'
  // )
  // location.href = 'http://192.168.2.200:18080/#/device'
  const iframe = document.querySelector('.iframe')
  // console.log('🚀 ~ iframeFn ~ iframe:', iframe)
  if (iframe) {
    // iframe.onload = () => {
    console.log('🚀 ~ iframeFn ~ iframe:', accessToken)
    axios.get('api/user/login', { params: { username: 'admin', password: hashedPassword } }).then(({ data }) => {
      console.log('data', data)
      if (data.code === 0) {
        console.log('Login successful')
        iframe.contentWindow.postMessage(
          { type: 'iframe-login', token: data.data.accessToken, name: 'admin', serveerId: '1' },
          '*'
        )
        // sessionStorage.setItem('videoAccessToken', data.accessToken)
        // accessToken = data.accessToken
        // iframeFn()
      } else {
        console.log("🚀 ~ console.log('Login failed'):", console.log('Login failed'))
      }
    })

    // }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 50vw;
  height: 70vh;
  margin: 10vh auto;
  background: #eee;
}
.iframe {
  width: 100%;
  height: 100%;
}
</style>
