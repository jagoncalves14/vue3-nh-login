/**
 * Is it a development environment?
 */
export function isDev(): boolean {
	return import.meta.env.DEV
}

/**
 * Is it a production environment?
 */
export function isProd(): boolean {
	return import.meta.env.PROD
}
