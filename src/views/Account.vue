<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth'
import '@nordhealth/components/lib/Divider'

const router = useRouter()
const authStore = useAuthStore()
const { session } = storeToRefs(authStore)

const isLoading = ref(false)
const userEmail = ref(session?.value?.user?.email)

async function handleDeleteClick() {
	const confirmedDeletion = confirm('Are you sure you want to delete your account?')
	if (!confirmedDeletion) {
		return
	}

	handleDeleteUser()
}

async function handleDeleteUser() {
	isLoading.value = true

	try {
		const userId = session?.value?.user?.id
		if (!(typeof userId === 'string')) {
			return router.push('/sign-in')
		}

		const response = await fetch('/api/delete-user', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId }),
		})

		if (!response?.ok) {
			throw response
		}

		alert('Your account has been deleted.')
		router.push('/sign-in')
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message)
		}
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<main class="n-stack-horizontal mx-auto h-full max-w-screen-xl">
		<nord-card class="my-10" padding="l">
			<nord-stack class="stack" direction="vertical" align-items="stretch">
				<div class="px-10 py-5">
					<h1>Hi - This is your account! 🙋</h1>
				</div>
				<nord-card padding="l" class="px-10 pb-10">
					<div slot="header">Account</div>
					<p class="n-color-text-weaker">Check your account settings here.</p>

					<nord-stack gap="m" direction="vertical" align-items="stretch">
						<nord-input
							:value="userEmail"
							readonly
							label="Email"
							expand
							name="email"
							autocomplete="email"
							type="email"
							size="m"
						/>

						<div class="py-5">
							<nord-divider />
						</div>
						<nord-stack class="stack" direction="vertical" align-items="stretch">
							<h3 slot="header">Delete your account</h3>
							<p class="n-color-text-weaker">If you want to permanently delete this account and all of its data, you can do that do that below.</p>
							<nord-button variant="danger" type="submit" size="m" @click="handleDeleteClick">Delete workspace</nord-button>
						</nord-stack>
					</nord-stack>
				</nord-card>
			</nord-stack>
		</nord-card>
	</main>
</template>
