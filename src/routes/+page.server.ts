import type { PageServerLoad } from "./$types";
import { executeQuery } from "$lib/snowflake";

export const load: PageServerLoad = async () => {



    const WEATHER_DATA = await executeQuery('SELECT * FROM WEATHER_DATA');

    console.log('WEATHER_DATA', WEATHER_DATA);


    return {
        WEATHER_DATA,
    }


}




