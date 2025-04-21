import snowflake from 'snowflake-sdk';

let isConnected: boolean = false;
const account = import.meta.env.VITE_SNOWFLAKE_ACCOUNT;
const username = import.meta.env.VITE_SNOWFLAKE_USERNAME;
const password = import.meta.env.VITE_SNOWFLAKE_PASSWORD;
const schema = import.meta.env.VITE_SNOWFLAKE_SCHEMA;
const role = import.meta.env.VITE_SNOWFLAKE_ROLE;
const database = import.meta.env.VITE_SNOWFLAKE_DB;


export const connection = snowflake.createConnection({
    account: account,
    username: username,
    password: password,
    role: role,
    database: database,
    schema: schema,
    warehouse: 'COMPUTE_WH',
});

export const connect = async () => {
    if (isConnected) {
        console.log('Already Connected to Snowflake');
        return connection;
    }

    return new Promise((resolve, reject) => {
        connection.connect((err: any, conn: any) => {
            if (err) {
                console.log('Connection failed:', err);
                reject(new Error('Unable to connect to Snowflake: ' + err.message));
            } else {
                console.log('Connected to Snowflake');
                isConnected = true;
                resolve(conn);
            }
        });
    });
};

export const executeQuery = async (query: string) => {
    // Ensure connection is established before executing the query
    if (!isConnected) {
        await connect(); // Establish the connection if not already connected
    }

    return new Promise<any>((resolve, reject) => {
        connection.execute({
            sqlText: query,
            complete: (err, stmt, rows) => {
                if (err) {
                    console.log('Error executing query:', err);
                    reject(new Error('Error executing query: ' + err.message));
                } else {
                    resolve(rows);
                }
            }
        });
    });
};
