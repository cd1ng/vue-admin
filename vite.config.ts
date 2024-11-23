import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import Inspect from 'vite-plugin-inspect'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// 开启ElementPlus自动引入CSS
		ElementPlus({}),
		// 自动引入组件
		AutoImport({
			// global imports to register
			imports: ['vue', 'vue-router', 'pinia'],
			resolvers: [
				ElementPlusResolver(),
				// 自动导入图标组件
				IconsResolver({
					prefix: 'Icon'
				})
			],
			dts: './src/types/auto-imports.d.ts',
			eslintrc: {
				enabled: true
			},
			// 添加以下配置
			include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
			// 添加默认导入
			defaultExportByFilename: false,
			vueTemplate: true
		}),
		// 自动注册组件
		Components({
			resolvers: [
				// 自动注册图标组件
				IconsResolver({
					enabledCollections: ['ep']
				}),
				ElementPlusResolver()
			],
			dts: './src/types/components.d.ts',
			// 指定组件目录自动引入
			dirs: ['src/components']
		}),
		// 自动安装Icon
		Icons({
			autoInstall: true
		}),
		Inspect({
			build: true,
			outputDir: '.vite-inspect'
		}),
		// 打包分析
		visualizer({
			// 是否显示 gzip 压缩大小
			gzipSize: true,
			// 是否显示 brotli 压缩大小
			brotliSize: true,
			// 是否生成文件
			emitFile: true,
			// 生成的文件名
			filename: 'stats.html',
			// 以默认服务器代码打开文件
			open: true
		})
	],
	// 打包配置
	build: {
		// 关闭 sorcemap 报错不会映射到源码
		sourcemap: false,
		// 打包大小超出 400kb 提示警告
		chunkSizeWarningLimit: 400,
		rollupOptions: {
			// 打包入口文件 根目录下的 index.html
			// 也就是项目从哪个文件开始打包
			input: {
				index: fileURLToPath(new URL('./index.html', import.meta.url))
			},
			// 静态资源分类打包
			output: {
				format: 'esm',
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
			}
		}
	},
	// 消除控制台sass警告
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		}
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:4523/m1/5508641-5184887-default',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
})
