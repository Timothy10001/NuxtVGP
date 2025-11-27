<template>
	<v-data-table-server
		:items="formattedLaunchData"
		:items-length="formattedLaunchData.length"
		:headers="headers"
		:loading="isLoading"
		loading-text="Loading... Please Wait"
	></v-data-table-server>
</template>
<script lang="ts" setup>
const launchStore = useLaunchStore()
const { formattedLaunchData, isLoading, error } = storeToRefs(launchStore)

const headers = [
	{ title: 'Mission Name', key: 'mission_name' },
	{ title: 'Launch Date', key: 'launch_date_utc' },
	{ title: 'Rocket Name', key: 'rocket.rocket_name' },
	{ title: 'Launch Site', key: 'launch_site.site_name_long' },
]

launchStore.fetchLaunchData()
</script>
