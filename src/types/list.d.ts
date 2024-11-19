type Status = 'Pending' | 'InProgress' | 'Done'
type TagType = 'warning' | 'primary' | 'success'

const statusMap: Record<Status, [TagType, string]> = {
	Pending: ['warning','待处理'],
	InProgress: ['primary', '进行中'],
	Done: ['success', '已完成']
}

interface TableItem {
	id: string
	name: string
	status: string
	url:string
	date: string
	address: string
	email:string
}
