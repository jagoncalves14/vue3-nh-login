import { supabase } from '@/utils/supabase'

export default async function signUp(payload: { email: string, password: string }) {
	const { data, error } = await supabase.auth.signUp(payload)

	// Supabase needs a small hack to check whether user already exists or not.
	// Enforcing an error message if user already exists.
	// See https://supabase.com/docs/reference/javascript/auth-signup
	let customError = null
	const userAlreadyExists = data.user && data.user.identities && data.user.identities.length === 0
	if (userAlreadyExists) {
		customError = {
			name: 'AuthApiError',
			message: 'User already exists',
		} as typeof error
	} else if (error) {
		customError = error
	}

	return { data, error: customError }
}
