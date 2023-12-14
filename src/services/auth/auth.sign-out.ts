import { supabase } from '@/utils/supabase'

export default async function signOut() {
	const { error } = await supabase.auth.signOut()
	return { error }
}
