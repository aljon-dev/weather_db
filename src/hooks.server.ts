import type { Handle } from '@sveltejs/kit';
import {connection,connect} from '$lib/snowflake';


export const handle : Handle = async ({event,resolve}) =>{

    await connect();
    return resolve(event);

}