import { Pool } from "pg"

const db = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'postgres',
    password: 'hassanhayat',
    port: 5432,
})

export default db;