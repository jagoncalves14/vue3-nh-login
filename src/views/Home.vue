<script setup>
import { ref } from 'vue'
import '@nordhealth/components/lib/Button'

const count = ref(0)
</script>

<template>
	<main class="n-stack-horizontal mx-auto h-full max-w-screen-xl">
		<nord-stack class="stack py-10" direction="vertical" align-items="stretch">
			<nord-card padding="l" class="pa-20">
				<h1>Welcome back! 👋</h1>
				<p class="mt-2 text-base">This is an app experimenting NH components. Click the button below, and the count will increase.</p>
				<nord-button class="mt-8" variant="primary" @click="count++">
					Count is: {{ count }}
				</nord-button>
			</nord-card>
		</nord-stack>
	</main>
</template>
