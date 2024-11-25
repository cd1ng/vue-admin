import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// 加载envDir中的.env 文件
	const env = loadEnv(mode, process.cwd())
	return {
		// 指定静态资源目录
		publicDir: 'public',
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		},
		plugins: [
			VueDevTools(),
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
			outDir: 'dist',
			terserOptions: {
				compress: {
					// 生产环境时移除console
					drop_console: true,
					// 生产环境时移除debugger
					drop_debugger: true
				},
				format: {
					// 移除注释
					comments: false
				}
			},
			// 关闭 sorcemap 报错不会映射到源码
			sourcemap: false,
			// 打包大小超出 2000kb 提示警告
			chunkSizeWarningLimit: 2000,
			rollupOptions: {
				// 打包入口文件
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
		server: {
			host:'0.0.0.0',
			port: Number(env.VITE_APP_PORT),
			proxy: {
				[env.VITE_APP_BASE_API]: {
					target: env.VITE_APP_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
		}
	}
})
