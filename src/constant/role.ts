import type { RoleType } from '@/views/role/types'
// 角色状态枚举
export const ROLE_STATUS: Record<RoleType, string> = {
	admin: '管理员',
	user: '用户'
} as const
