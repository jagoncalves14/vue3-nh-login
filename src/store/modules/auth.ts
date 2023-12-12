import { supabase } from '@/utils/supabase'

export const useAuthStore = defineStore('auth', {
	state: () => {
		return {
			supabase,
			session: null,
		}
	},

	actions: {
		async signOut() {
			try {
				const { error } = await supabase.auth.signOut()
				this.session = null

				if (error) {
					throw error
				}
			} catch (error) {
				if (error instanceof Error) {
					// eslint-disable-next-line no-alert
					alert(error.message)
				}
			}
		},
	},
})
