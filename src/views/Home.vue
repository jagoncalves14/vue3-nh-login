<script setup>
import { ref } from 'vue'
import '@nordhealth/components/lib/Button'

const count = ref(0)
</script>

<template>
	<nord-button variant="primary" @click="count++">
		Count is: {{ count }}
	</nord-button>
</template>
