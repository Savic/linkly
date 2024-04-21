import config from "config";
import {DataSource, DataSourceOptions} from "typeorm";
import {UrlMapping} from "../entity/urlMapping";
import {DBConfig} from "../../config/types";

export class AppDataSource {
    private static connection: DataSource;
    static readonly dbConfig: DBConfig = config.get<DBConfig>("DB");

    private static options: DataSourceOptions = {
        type: this.dbConfig.type,
        host: this.dbConfig.host,
        port: this.dbConfig.port,
        username: this.dbConfig.username,
        password: this.dbConfig.password,
        database: this.dbConfig.database,
        synchronize: this.dbConfig.synchronize,
        logging: this.dbConfig.logging,
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

