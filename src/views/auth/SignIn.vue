<script setup lang="ts">
useHead({
	title: 'Nordhealth DS — Sign in',
})
</script>

<template>
	<AuthForm
		title="Sign in to Nord"
		submit-label="Sign in"
	>
		<template #actions>
			New to Nord? <RouterLink to="/sign-up" class="plain-link">Create an account</RouterLink>.
		</template>
	</AuthForm>
</template>

<style scoped lang="scss">
.stack {
	inline-size: 90%;
	max-inline-size: 340px;
	margin: var(--n-space-xl) auto;
}
</style>
