/**
 * Represents the configuration for a database connection.
 *
 * @interface DBConfig
 */
export interface DBConfig {
    host: string;
    username: string;
    password: string;
    type: "postgres";
    port: number;
    database: string;
    synchronize: boolean;
    logging: boolean;
}

/**
 * Configuration for Mailtrap.
 *
 * @interface MailtrapConfig
 */
export interface MailtrapConfig {
    api: {
        token: string;
    },
    mail: {
        sender: string;
    }
}

/**
 * Configuration interface for the application.
 */
export interface Config {
    DB: DBConfig;
    Mailtrap: MailtrapConfig;
}
