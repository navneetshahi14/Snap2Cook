import {ENV} from './src/config/env.ts';

export default {
    schema : "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {url: ENV.DATABASE_URL}
}