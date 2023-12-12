<script lang="ts" setup>
import type { ForgotPasswordSchemaErrorsType, ForgotPasswordSchemaType } from '@/schemas/auth'
import { ForgotPasswordSchema } from '@/schemas/auth'
import { useAuthStore } from '@/store/modules/auth'

const { supabase } = useAuthStore()

const formErrors = ref<ForgotPasswordSchemaErrorsType>(null)
const formData = ref<ForgotPasswordSchemaType>({
	email: '',
})
const isLoading = ref(false)

async function handleSubmit() {
	isLoading.value = true

	const schemaValidation = ForgotPasswordSchema.safeParse(formData.value)
	if (!schemaValidation.success) {
		formErrors.value = schemaValidation?.error?.format()
		isLoading.value = false
		return
	}

	const { data, error } = await supabase.auth.resetPasswordForEmail(
		formData.value.email,
		{
			redirectTo: `${window.location.origin}/reset-password`,
		},
	)

	if (data) {
		// eslint-disable-next-line no-alert
		alert(`
      Password reset link has been sent to your e-mail.
      Please check your inbox.
      If you don't see it, please also check your spam folder.
    `)
	} else if (error) {
		// eslint-disable-next-line no-alert
		alert(error.message)
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
							v-model="formData.email"
							label="E-mail"
							expand
							required
							hide-required
							name="email"
							autocomplete="email"
							type="email"
							placeholder="user@example.com"
							size="m"
							:error="formErrors?.email?._errors"
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
