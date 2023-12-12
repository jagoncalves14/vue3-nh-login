<script lang="ts" setup>
import type { UserAttributes } from '@supabase/supabase-js'
import type { ResetPasswordSchemaErrorsType, ResetPasswordSchemaType } from '@/schemas/auth'
import { ResetPasswordSchema } from '@/schemas/auth'
import { useAuthStore } from '@/store/modules/auth'

const router = useRouter()
const route = useRoute()
const { supabase } = useAuthStore()

// Parse the route hash into a dictionary so we can pick out the access_token provided
function getResetToken(): UserAttributes {
	const hashDictionary = {} as Record<string, string | UserAttributes>

	// First remove the actual '#' character
	const hash = route.hash.replace('#', '')

	// Split hash into key-value pairs
	hash.split('&').forEach((item) => {
		// Split 'key=value' into [key, value]
		const [key, value] = item.split('=')
		// Add to results
		Object.assign(hashDictionary, { [key]: value })
	})

	return hashDictionary?.access_token as UserAttributes
}

const formErrors = ref<ResetPasswordSchemaErrorsType>(null)
const formData = ref<ResetPasswordSchemaType>({
	password: '',
})
const isLoading = ref(false)

async function handleSubmit() {
	isLoading.value = true

	const schemaValidation = ResetPasswordSchema.safeParse(formData.value)
	if (!schemaValidation.success) {
		formErrors.value = schemaValidation?.error?.format()
		isLoading.value = false
		return
	}

	const resetToken = getResetToken()
	const { error } = await supabase.auth.updateUser(resetToken)

	if (error) {
		// eslint-disable-next-line no-alert
		alert(error.message)
	} else {
		router.push('/')
	}

	isLoading.value = false
}
</script>

<template>
	<main class="n-stack-horizontal h-full flex-1">
		<nord-stack class="stack" direction="vertical" align-items="stretch">
			<nord-card padding="l">
				<div slot="header">
					Lost your password?
				</div>

				<form @submit.prevent="handleSubmit">
					<nord-stack gap="m" direction="vertical" align-items="stretch">
						<nord-input
							v-model="formData.password"
							label="Password"
							expand
							required
							hide-required
							name="password"
							autocomplete="password"
							type="password"
							placeholder="••••••••"
							size="m"
							:error="formErrors?.password?._errors"
						/>
						<nord-button
							label="Password"
							expand
							variant="primary"
							type="submit"
							size="m"
							:disabled="isLoading"
						>
							{{ isLoading ? 'Loading' : 'Submit' }}
						</nord-button>
					</nord-stack>
				</form>
			</nord-card>
		</nord-stack>
	</main>
</template>

<style scoped lang="scss">
.stack {
	inline-size: 90%;
	max-inline-size: 340px;
	margin: var(--n-space-xl) auto;
}
</style>
