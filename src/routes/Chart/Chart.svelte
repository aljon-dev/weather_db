<script lang="ts">
	import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronRightOutline, ChevronDownOutline } from 'flowbite-svelte-icons';

	let { data } = $props();

	let options = {
		chart: {
			height: '400px',
			maxWidth: '100%',
			type: 'area' as const,
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.95,
				opacityTo: 0,
				shade: '#E81313',
				gradientToColors: ['#E81313']
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 6
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0
			}
		},
		series: [
			{
				name: 'Temperatures',
				data: data.WEATHER_DATA.map(
					(weather: any) => Math.round((weather.TEMPERATURE_REALFEEL_AVG - 32) * 5) / 9
				),
				color: '#e81313'
			}
		],
		xaxis: {
			categories: data.WEATHER_DATA.map((weather: any) => weather.COUNTRY_CODE),
			labels: {
				show: false
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		yaxis: {
			show: false
		}
	};

	const Temperatures = data.WEATHER_DATA.map((weather: any) => weather.TEMPERATURE_REALFEEL_AVG);
	const highestTemp = Math.max(...Temperatures);
</script>

<div class="w-full rounded-lg bg-white p-6 shadow dark:bg-gray-800">
	<div class="flex justify-between">
		<div>
			<h5 class="pb-2 text-3xl leading-none font-bold text-gray-900 dark:text-white">
				{Math.round(((highestTemp - 32) * 5) / 9)}°C
			</h5>
			<p class="text-base font-normal text-gray-500 dark:text-gray-400">Highest Temp</p>
		</div>
		<div
			class="flex items-center px-2.5 py-0.5 text-center text-base font-semibold text-green-500 dark:text-green-500"
		></div>
	</div>

	<!-- Make sure Chart container is full width -->
	<div class="w-full">
		<Chart {options} />
	</div>

	<div
		class="grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700"
	>
		<div class="flex items-center justify-between pt-5">
			<A
				href="/"
				class="hover:text-primary-700 dark:hover:text-primary-500 rounded-lg px-3 py-2 text-sm font-semibold uppercase hover:bg-gray-100 hover:no-underline dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
			></A>
		</div>
	</div>
</div>
