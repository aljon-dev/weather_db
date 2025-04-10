<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Navbar
	} from 'flowbite-svelte';
	import Chart from './Chart/Chart.svelte';

	let { data } = $props();

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		const month = date.toLocaleString('default', { month: 'long' });
		const day = date.getDate();
		const year = date.getFullYear();
		return `${month} ${day}, ${year}`;
	}

	const formateTemperature = (Temperature) => {
		return `${Math.round(((Temperature - 32) * 5) / 9)}°C`;
	};
	let numberOfCountries = $state(0);
</script>

<Navbar class="bg-slate-500">
	<span class="text-lg font-medium text-white"> Weather Dashboard 2022 Record </span>
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
					<TableHeadCell>Temperature</TableHeadCell>
				</TableHead>

				<TableBody tableBodyClass="divide-y">
					{#each data.WEATHER_DATA ?? [] as Weather}
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
