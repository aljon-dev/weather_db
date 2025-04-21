<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Navbar,
		Button,
		NavBrand
	} from 'flowbite-svelte';
	import Chart from './Chart/Chart.svelte';
	import logo from '$lib/SnowFlakeLogo.png';

	let { data } = $props();

	// State for sorting
	let sortDirection = $state<'asc' | 'desc'>('desc');
	let sortedWeatherData = $state(data.WEATHER_DATA ?? []);

	// Function to toggle sort direction
	function toggleSort() {
		sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
		sortData();
	}

	// Function to sort data
	function sortData() {
		sortedWeatherData = [...(data.WEATHER_DATA ?? [])].sort((a, b) => {
			return sortDirection === 'desc'
				? b.TEMPERATURE_REALFEEL_AVG - a.TEMPERATURE_REALFEEL_AVG
				: a.TEMPERATURE_REALFEEL_AVG - b.TEMPERATURE_REALFEEL_AVG;
		});
	}

	// Initial sort
	sortData();

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const month = date.toLocaleString('default', { month: 'long' });
		const day = date.getDate();
		const year = date.getFullYear();
		return `${month} ${day}, ${year}`;
	};

	const formateTemperature = (Temperature: any) => {
		return `${Math.round(((Temperature - 32) * 5) / 9)}°C`;
	};
</script>

<Navbar class="bg-slate-500">
	<NavBrand
		><img src={logo} height="100" width="100" />
		<span class="text-lg font-medium text-white"> Weather Dashboard 2022 Record </span>
	</NavBrand>
</Navbar>

<div class="flex grid w-full grid-cols-1 flex-col justify-center">
	<div class="lg: flex flex-col justify-center gap-4 sm:flex-row sm:gap-8">
		<Chart {data} />
	</div>
	<div class="mt-5 flex w-full justify-center">
		<div class="w-full overflow-x-auto">
			<Table class="min-w-full">
				<TableHead>
					<TableHeadCell>Country Code</TableHeadCell>
					<TableHeadCell>City Name</TableHeadCell>
					<TableHeadCell>Wind</TableHeadCell>
					<TableHeadCell>Visibility</TableHeadCell>
					<TableHeadCell>Date</TableHeadCell>
					<TableHeadCell>
						<div class="flex items-center gap-1">
							<span>Temperature</span>
							<Button size="xs" onclick={toggleSort} class="p-1">
								{#if sortDirection === 'desc'}
									↓ Highest to Lowest
								{:else}
									↑ Lowest to Highest
								{/if}
							</Button>
						</div>
					</TableHeadCell>
				</TableHead>

				<TableBody tableBodyClass="divide-y">
					{#each sortedWeatherData as Weather}
						<TableBodyRow>
							<TableBodyCell>{Weather.COUNTRY_CODE}</TableBodyCell>
							<TableBodyCell>{Weather.CITY_NAME}</TableBodyCell>
							<TableBodyCell>{Weather.WIND_GUST_MIN}</TableBodyCell>
							<TableBodyCell>{Weather.VISIBILITY_MIN}</TableBodyCell>
							<TableBodyCell>{formatDate(Weather.DATE)}</TableBodyCell>
							<TableBodyCell>{formateTemperature(Weather.TEMPERATURE_REALFEEL_AVG)}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	</div>
</div>
