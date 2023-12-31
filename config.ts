const ormconfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'MyN3wP4ssw0rd',
    database: 'skight',
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
}

const serverConfig = {
    defaultPort: 999,
    defaultHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
    }
}

const defaultGameServerParams = {
    allowedPortsFrom: 3000,
    allowedPortsTo: 4000,
    lastRunPort: null
}

export { ormconfig, serverConfig, defaultGameServerParams }
