export const GET_LAUNCHES = gql`
	query GetLaunchesQuery {
		launches {
			launch_site {
                site_name_long
			}
			rocket {
				rocket_name
			}
			mission_name
			launch_date_utc
		}
	}
`
