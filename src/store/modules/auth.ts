import { supabase } from '@/utils/supabase'

export const useAuthStore = defineStore('auth', {
	state: () => {
		return {
			supabase,
			session: null,
		}
	},
})
