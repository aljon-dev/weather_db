<script lang="ts">
	// @ts-ignore
	import { Chart, Button } from 'flowbite-svelte';

	let { data } = $props();

	// Pagination state
	let currentPage = $state(1);
	const itemsPerPage = 5;
	const totalPages = Math.ceil((data.WEATHER_DATA?.length || 0) / itemsPerPage);

	// Sort data from highest to lowest temperature
	const sortedData = [...(data.WEATHER_DATA || [])].sort(
		(a, b) => b.TEMPERATURE_REALFEEL_AVG - a.TEMPERATURE_REALFEEL_AVG
	);

	// Get paginated data
	let paginatedData = $derived(
		sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	let celsiusTemps = $derived(
		paginatedData.map((weather) => Math.round(((weather.TEMPERATURE_REALFEEL_AVG - 32) * 5) / 9))
	);

	let countryCodes = $derived(paginatedData.map((weather) => weather.COUNTRY_CODE));
	console.log('Country codes:', countryCodes);

	// Chart options - reactive to data changes
	let options = $derived({
		chart: {
			height: '350px',
			type: 'bar',
			toolbar: { show: false }
		},
		plotOptions: {
			bar: {
				horizontal: true,
				borderRadius: 4
			}
		},
		dataLabels: {
			enabled: true,
			formatter: (val: number) => `${val}°C`,
			style: { colors: ['#fff'] },
			offsetX: 10
		},
		series: [
			{
				name: 'Temperature (°C)',
				data: celsiusTemps,
				color: '#e81313'
			}
		],
		xaxis: {
			labels: { formatter: (val: number) => `${val}°C` },
			axisBorder: { show: false },
			axisTicks: { show: false }
		},
		yaxis: {
			labels: { formatter: (val: number) => `${countryCodes[val - 1]}` }
		},
		fill: {
			colors: ['#e81313'],
			type: 'gradient',
			gradient: {
				shade: 'dark',
				gradientToColors: ['#f87171'],
				opacityFrom: 1,
				opacityTo: 0.8
			}
		},
		tooltip: {
			enabled: true,
			y: {
				formatter: (val: number) => `${val}°C`,
				title: { formatter: (seriesName: any) => seriesName }
			}
		}
	});

	// Pagination functions
	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}
</script>

<div class="w-full rounded-lg bg-white p-6 shadow dark:bg-gray-800">
	<div class="mb-4 flex items-center justify-between">
		<div>
			<h5 class="text-xl font-bold text-gray-900 dark:text-white">
				Temperatures (Page {currentPage}/{totalPages})
			</h5>
		</div>

		<div class="flex items-center gap-2">
			<Button color="light" size="sm" on:click={prevPage} disabled={currentPage === 1}>
				Previous
			</Button>

			<Button color="light" size="sm" on:click={nextPage} disabled={currentPage === totalPages}>
				Next
			</Button>
		</div>
	</div>

	<!-- Chart -->
	<div class="w-full">
		<Chart {options} />
	</div>
</div>
