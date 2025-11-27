<template>
	<v-data-table-server
		:items="items"
		:headers="headers"
		:items-length="items.length"
		:loading="loading"
        loading-text="Loading... Please Wait"
	></v-data-table-server>
</template>

<script lang="ts" setup>
const props = defineProps<{
	items: Array<Record<string, any>>
	loading: boolean
	headers: Array<{ title: string; key: string }>
}>()
</script>
