import { supabase } from '@/utils/supabase'

export default async function signIn(payload: { email: string, password: string }) {
	const { data, error } = await supabase.auth.signInWithPassword(payload)
	return { data, error }
}
