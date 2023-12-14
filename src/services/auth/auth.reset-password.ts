import type { UserAttributes } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase'

export default async function resetPassword(accessToken: UserAttributes) {
	const { data, error } = await supabase.auth.updateUser(accessToken)
	return { data, error }
}
