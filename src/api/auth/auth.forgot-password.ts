import { supabase } from '@/utils/supabase'

export default async function forgotPassword(email: string) {
	const { data, error } = await supabase.auth.resetPasswordForEmail(
		email,
		{
			redirectTo: `${window.location.origin}/reset-password`,
		},
	)

	return { data, error }
}
