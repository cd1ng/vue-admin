declare namespace Api {
	type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
	type ApiMap = Record<string, [ApiMethod, string]>
}
