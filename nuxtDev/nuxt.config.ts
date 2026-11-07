// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@element-plus/nuxt'],
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	nitro: {
		storage: {
			uploads: {
				driver: 'fs',
				base: './public/uploads' // 文件将保存到 public/uploads，可直接通过 URL 访问
			}
		}
	}
})
