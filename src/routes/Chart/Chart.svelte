<script  lang="ts">
    import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { ChevronRightOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
    
    let {data} = $props();


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
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: '#1C64F2',
          gradientToColors: ['#1C64F2']
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
          data: data.WEATHER_DATA.map((weather: any) => weather.TEMPERATURE_REALFEEL_AVG),
          color: '#1A56DB'
        }
      ],
      xaxis: {
        categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
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

    const Temperatures = data.WEATHER_DATA.map((weather: any) => weather.TEMPERATURE_REALFEEL_AVG)
    const highestTemp = Math.max(...Temperatures);


  </script>
  
  <Card>
    <div class="flex justify-between">
      <div>
        <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">{highestTemp}</h5>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Highest Temp</p>
      </div>
      <div class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
        12%
        <ChevronRightOutline class="w-6 h-6 ms-1" />
      </div>
    </div>
    <Chart {options} />
    <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
      <div class="flex justify-between items-center pt-5">
        <Button class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0">Last 7 days<ChevronDownOutline class="w-2.5 m-2.5 ms-1.5" /></Button>
       
        <A href="/" class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline">
          Users Report
          <ChevronRightOutline class="w-2.5 h-2.5 ms-1.5" />
        </A>
      </div>
    </div>
  </Card>