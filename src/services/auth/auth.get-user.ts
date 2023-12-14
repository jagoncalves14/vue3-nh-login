import { supabase } from '@/utils/supabase'

export default async function getUser() {
	const { data, error } = await supabase.auth.getUser()
	return { data, error }
}
