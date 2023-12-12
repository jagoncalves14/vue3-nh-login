<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth'
import '@nordhealth/components/lib/Button'
import { supabase } from '@/utils/supabase'

const authStore = useAuthStore()
const { session } = storeToRefs(authStore)

const route = useRoute()
const currentRouteName = computed(() => route.name)

const isLoading = ref(false)

// Verify session when app loads
onMounted(async () => {
	isLoading.value = true

	const { data } = await supabase.auth.getSession()
	session.value = data.session as any

	isLoading.value = false

	supabase.auth.onAuthStateChange((_, newSession: any) => {
		session.value = newSession
	})
})

async function handleSignOut() {
	isLoading.value = true
	await authStore.signOut()
	isLoading.value = false
}
</script>

<template>
	<div class="min-h-full flex flex-col">
		<header class="border-gray-200 bg-white px-4 py-2 shadow">
			<div class="mx-auto max-w-screen-xl flex flex-wrap items-center justify-between">
				<div class="flex items-center">
					<RouterLink to="/" class="block hover:opacity-80">
						<img alt="Nordhealth logo" src="@/assets/nordhealth.svg" width="30" height="30">
					</RouterLink>
				</div>

				<div v-if="!isLoading && currentRouteName" class="w-auto flex items-center justify-between">
					<ul class="flex flex-row list-none font-medium space-x-8">
						<template v-if="session">
							<li>
								<RouterLink v-slot="{ isActive }" to="/" class="no-underline">
									<span class="block py-2 text-sm text-gray-600 hover:text-gray-900" :class="{ 'text-green-500 hover:text-green-700': isActive }">Home</span>
								</RouterLink>
							</li>
							<li>
								<RouterLink v-slot="{ isActive }" to="/some-page" class="no-underline">
									<span class="block py-2 text-sm text-gray-600 hover:text-gray-900" :class="{ 'text-green-500 hover:text-green-700': isActive }">Some Page</span>
								</RouterLink>
							</li>
						</template>
						<li>
							<template v-if="!session">
								<RouterLink v-if="currentRouteName === 'signIn'" to="/sign-up" class="cursor-pointer text-inherit no-underline">
									<nord-button>
										Sign up
									</nord-button>
								</RouterLink>
								<RouterLink v-else to="/sign-in" class="cursor-pointer text-inherit no-underline">
									<nord-button>
										Sign in
									</nord-button>
								</RouterLink>
							</template>
							<nord-button v-else @click="handleSignOut">
								Sign out
							</nord-button>
						</li>
					</ul>
				</div>
			</div>
		</header>

		<RouterView />
	</div>
</template>
