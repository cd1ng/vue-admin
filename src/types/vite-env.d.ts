/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

// 添加环境变量
interface ImportMetaEnv {
	 /** 应用端口 */
	VITE_APP_PORT:number
	/** 代理前缀 */
	VITE_APP_BASE_API: string
	/** 接口地址 */
	VITE_APP_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}