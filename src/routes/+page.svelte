<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import Chart from './Chart/Chart.svelte';
	import PieChart from './Chart/PieChart.svelte';


    let {data} = $props();

    let numberOfCountries = $state(0);


</script> 


<div class="flex flex-col grid grid-cols-1  w-full justify-center">
    <div class="flex flex-col lg: gap-4 sm:flex-row sm:gap-8 justify-center">
        <Chart {data} />
        <PieChart {data} />
      </div>
    <div class="flex w-full justify-center mt-5">
        <div class="overflow-x-auto w-full">
            <Table class="min-w-full">
                <TableHead>
                    <TableHeadCell>Country Code</TableHeadCell>
                    <TableHeadCell>City Name</TableHeadCell>
                    <TableHeadCell>Wind</TableHeadCell>
                    <TableHeadCell>Visibility</TableHeadCell>
                    <TableHeadCell>Temperature</TableHeadCell>
                </TableHead>

                <TableBody tableBodyClass="divide-y">
                    {#each data.WEATHER_DATA ?? [] as Weather}
                        <TableBodyRow>
                            <TableBodyCell>{Weather.COUNTRY_CODE}</TableBodyCell>
                            <TableBodyCell>{Weather.CITY_NAME}</TableBodyCell>
                            <TableBodyCell>{Weather.WIND_GUST_MIN}</TableBodyCell>
                            <TableBodyCell>{Weather.VISIBILITY_MIN}</TableBodyCell>
                            <TableBodyCell>{Weather.TEMPERATURE_REALFEEL_AVG}</TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
</div>
   
</div>
</div>

