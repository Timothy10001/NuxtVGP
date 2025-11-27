import { GET_LAUNCHES } from '~/graphql/queries/getLaunches'

export const useLaunchStore = defineStore('launch-list', () => {
	//types
	type Launch = {
		mission_name: string | null
		rocket: {
			rocket_name: string | null
			isFavorite: boolean
		}
		launch_site: {
			site_name_long: string | null
		}
		launch_date_utc: Date | null
	}
	type LaunchData = {
		launches: Launch[]
	}
	type Rocket = {
		rocket_name: string | null
		isFavorite: boolean
		description: string | null
	}
	//states
	const favoriteRockets = ref(new Set<Rocket>())
	const launchData = ref<LaunchData>({ launches: [] })
	const isLoading = ref(false)
	const error = ref(null)
	//actions
	async function fetchLaunchData() {
		isLoading.value = true
		error.value = null
		try {
			const { client } = useApolloClient()
			const { data, errors } = await client.query<LaunchData>({
				query: GET_LAUNCHES,
			})
			if (errors && errors.length > 0) {
				throw new Error(errors.map((e) => e.message).join(', '))
			}
			const extendedData: LaunchData = JSON.parse(JSON.stringify(data))
			extendedData.launches.forEach((launch) => {
				if (launch.rocket) {
					launch.rocket.isFavorite = false
				}
			})

			launchData.value = extendedData
			console.log(launchData.value)
		} catch (err: any) {
			error.value = err.message || 'An error occurred while fetching launches.'
		} finally {
			isLoading.value = false
		}
	}

	const formattedLaunchData = computed(() => {
		const data = launchData.value.launches

		if (!data) return []
		const formattedData = data.map((launch) => {
			const site_name = launch.launch_site?.site_name_long ?? 'Unknown Site'
			const rocket_name = launch.rocket?.rocket_name ?? 'Unknown Rocket'
			const mission_name = launch.mission_name ?? 'Unknown Mission'
			const launch_date = launch.launch_date_utc ? new Date(launch.launch_date_utc) : new Date()
			const options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}
			return {
				...launch,
				launch_site: { site_name_long: site_name },
				rocket: { rocket_name: rocket_name, isFavorite: launch.rocket?.isFavorite ?? false },
				mission_name: mission_name,
				launch_date_utc: launch_date.toLocaleDateString(
					'en-US',
					options as Intl.DateTimeFormatOptions,
				),
			}
		})
		return formattedData
	})

	return { fetchLaunchData, formattedLaunchData, isLoading, error }
})
