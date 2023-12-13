<script lang="ts" setup>
import type { ResetPasswordSchemaErrorsType, ResetPasswordSchemaType } from '@/schemas/auth'
import { ResetPasswordSchema } from '@/schemas/auth'
import resetPassword from '@/api/auth/auth.reset-password'
import getAccessToken from '@/utils/getAccessToken'

const router = useRouter()

const isLoading = ref(false)
const formErrors = ref<ResetPasswordSchemaErrorsType>(null)
const formData = ref<ResetPasswordSchemaType>({
	password: '',
})

async function handleSubmit() {
	isLoading.value = true

	const schemaValidation = ResetPasswordSchema.safeParse(formData.value)
	if (!schemaValidation.success) {
		formErrors.value = schemaValidation?.error?.format()
		isLoading.value = false
		return
	}

	const accessToken = getAccessToken()
	const { error } = await resetPassword(accessToken)

	if (error) {
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
