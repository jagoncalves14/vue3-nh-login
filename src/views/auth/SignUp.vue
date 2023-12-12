<script setup lang="ts">
import '@nordhealth/components/lib/Stack'
import '@nordhealth/components/lib/Card'
import '@nordhealth/components/lib/Input'
import '@nordhealth/components/lib/Button'
import type { AuthSchemaErrorsType, AuthSchemaType } from '@/schemas/auth'
import { AuthSchema } from '@/schemas/auth'

const formErrors = ref<AuthSchemaErrorsType>(null)
const formData = ref<AuthSchemaType>({
	email: '',
	password: '',
})

async function onSubmit() {
	const schemaValidation = AuthSchema.safeParse(formData.value)

	if (!schemaValidation.success) {
		formErrors.value = schemaValidation?.error?.format()
	} else {
		formErrors.value = null
	}
}
</script>

<template>
	<main class="n-stack-horizontal">
		<nord-stack class="stack" direction="vertical" align-items="stretch">
			<nord-card>
				<div slot="header">
					Sign up to Nord
				</div>
				<form action="#" @submit.prevent="onSubmit">
					<nord-stack gap="m" direction="vertical" align-items="stretch">
						<nord-input v-model="formData.email" label="Username" expand required hide-required name="email" autocomplete="email" type="email" placeholder="user@example.com" size="m" :error="formErrors?.email?._errors" />
						<nord-input v-model="formData.password" label="Password" expand required hide-required name="password" autocomplete="password" type="password" placeholder="user@example.com" size="m" :error="formErrors?.password?._errors" />
						<nord-button label="Password" expand variant="primary" type="submit" size="m">
							Sign up
						</nord-button>
					</nord-stack>
				</form>
			</nord-card>

			<nord-card class="n-align-center" padding="m">
				Already have an account? <RouterLink to="/sign-in">Sign in</RouterLink>.
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
