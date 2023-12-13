<script setup lang="ts">
import '@nordhealth/components/lib/Stack'
import '@nordhealth/components/lib/Card'
import '@nordhealth/components/lib/Input'
import '@nordhealth/components/lib/Button'
import type { AuthSchemaErrorsType, AuthSchemaType } from '@/schemas/auth'
import { AuthSchema } from '@/schemas/auth'
import { useAuthStore } from '@/store/modules/auth'

const props = defineProps({
	signUp: Boolean,
	title: String,
	submitLabel: String,
})

const { supabase } = useAuthStore()
const router = useRouter()
const isLoading = ref(false)

const formErrors = ref<AuthSchemaErrorsType>(null)
const formData = ref<AuthSchemaType>({
	email: '',
	password: '',
})

async function handleSignUp() {
	let authError = null
	formErrors.value = null

	const { data, error } = await supabase.auth.signUp(formData.value)

	// Supabase needs a small hack to check whether user already exists or not.
	// See https://supabase.com/docs/reference/javascript/auth-signup
	const userAlreadyExists = data.user && data.user.identities && data.user.identities.length === 0
	if (userAlreadyExists) {
		authError = {
			name: 'AuthApiError',
			message: 'User already exists',
		}

		formErrors.value = Object.assign({}, formErrors.value);
		(formErrors.value as AuthSchemaErrorsType)!.email = {
			_errors: ['User already exists'],
		}
	} else if (error) {
		authError = {
			name: error.name,
			message: error.message,
		}
	}

	if (authError?.message) {
		throw new Error(authError.message)
	}

	return { data, error: authError }
}

async function handleSignIn() {
	const authError = null
	const { data, error } = await supabase.auth.signInWithPassword(formData.value)

	if (error) {
		throw new Error(error.message)
	}

	return { data, error: authError }
}

async function handleSubmit() {
	isLoading.value = true

	const schemaValidation = AuthSchema.safeParse(formData.value)
	if (!schemaValidation.success) {
		formErrors.value = schemaValidation?.error?.format()
		isLoading.value = false
		return
	}

	try {
		if (props.signUp) {
			await handleSignUp()

			// eslint-disable-next-line no-alert
			alert('Success! Please check your email for a confirmation link to complete your account setup.')
			router.push('/sign-in')
		} else {
			await handleSignIn()
			router.push('/')
		}
	} catch (error) {
		if (error instanceof Error && !formErrors?.value?.email?._errors?.length) {
			// eslint-disable-next-line no-alert
			alert(error.message)
		}
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<main class="n-stack-horizontal h-full flex-1">
		<nord-stack class="stack" direction="vertical" align-items="stretch">
			<nord-card padding="l">
				<div slot="header">
					{{ title }}
				</div>

				<form @submit.prevent="handleSubmit">
					<nord-stack gap="m" direction="vertical" align-items="stretch">
						<nord-input
							v-model="formData.email"
							label="Email"
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
						<div class="relative">
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
							<RouterLink
								to="/forgot-password"
								class="absolute end-0 top-0 text-xs leading-6 no-underline"
							>
								Forgot password?
							</RouterLink>
						</div>
						<nord-button type="submit" expand variant="primary" size="m" :disabled="isLoading">
							{{ isLoading ? 'Loading' : submitLabel }}
						</nord-button>
					</nord-stack>
				</form>
			</nord-card>

			<nord-card class="n-align-center" padding="m">
				<slot name="actions" />
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
