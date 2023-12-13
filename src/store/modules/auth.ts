import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase'

interface AuthState {
	supabase: typeof supabase
	session: Session | null
}

export const useAuthStore = defineStore('auth', {
	state: (): AuthState => {
		return {
			supabase,
			session: null,
		}
	},
})
