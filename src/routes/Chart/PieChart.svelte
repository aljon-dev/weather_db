<script lang="ts">

// @ts-ignore

    import { Chart, Card, A, Button, Dropdown, DropdownItem, Popover } from 'flowbite-svelte';
    import { InfoCircleSolid, ChevronDownOutline, ChevronRightOutline, PenSolid, DownloadSolid, ShareNodesSolid, TrashBinSolid, DotsHorizontalOutline } from 'flowbite-svelte-icons';
  
    let { data } = $props();
    

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color; // Return the color
    };

    const randomColors = data.WEATHER_DATA.map(() => getRandomColor());



    const options = {
      series: data.WEATHER_DATA.map((weather: any) => weather.TEMPERATURE_REALFEEL_AVG),
      colors: randomColors,
      chart: {
        height: 420,
        width: '100%',
        type: 'pie' as const
      },
      stroke: {
        colors: ['white'],
        lineCap: ''
      },
      plotOptions: {
        pie: {
          labels: {
            show: true
          },
          size: '100%',
          dataLabels: {
            offset: -25
          }
        }
      },
      labels: data.WEATHER_DATA.map((weather: any) => weather.CITY_NAME),
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'Inter, sans-serif'
        }
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif'
      },
      yaxis: {
        labels: {
          formatter: function (value:any) {
            return value + '%';
          }
        }
      },
      xaxis: {
        labels: {
          formatter: function (value:any) {
            return value + '%';
          }
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      }
    };
  </script>
  
  <Card>
    <div class="flex justify-between items-start w-full">
      <div class="flex-col items-center">
        <div class="flex items-center mb-1">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Temperatures pie Chart </h5>
          <InfoCircleSolid id="pie1" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" />
          <Popover triggeredBy="#pie1" class="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-10">
            <div class="p-3 space-y-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
              <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
              <h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
              <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
              <A href="/">Read more <ChevronRightOutline class="w-2 h-2 ms-1.5" /></A>
            </div>
          </Popover>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <DotsHorizontalOutline id="dots-menu" class="dots-menu dark:text-white" />
        <Dropdown triggeredBy="#dots-menu" class="w-44" offset={-6}>
          <DropdownItem><PenSolid class="inline w-3 h-3 me-2" /> Edit widget</DropdownItem>
          <DropdownItem><DownloadSolid class="inline w-3 h-3 me-2" />Dropdown data</DropdownItem>
          <DropdownItem><ShareNodesSolid class="inline w-3 h-3 me-2" />Add to repository</DropdownItem>
          <DropdownItem><TrashBinSolid class="inline w-3 h-3 me-2" />Delete widget</DropdownItem>
        </Dropdown>
      </div>
    </div>
  
    <Chart {options} class="py-6" />
  
   
  </Card>