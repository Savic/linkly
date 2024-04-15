// src/data-source.ts
import {DataSource, ConnectionOptions} from "typeorm";
import {UrlMapping} from "./../entity/urlMapping";

export class AppDataSource {
    private static connection: DataSource;

    private static options: ConnectionOptions = {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "",
        database: "linkly",
        synchronize: true,
        logging: false,
        entities: [
            UrlMapping
        ],
        subscribers: [],
        migrations: [],
    }

    private constructor() {
    }

    public static getConnection(): DataSource {
        if (!this.connection) {
            this.connection = new DataSource(this.options);
        }

        return this.connection;
    }
}

