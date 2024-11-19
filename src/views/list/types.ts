export type Status = 'Pending' | 'InProgress' | 'Done'
export type TagType = 'warning' | 'primary' | 'success'

export interface TableItem {
	id: string
	name: string
	status: string
	url: string
	date: string
	address: string
	email: string
}
